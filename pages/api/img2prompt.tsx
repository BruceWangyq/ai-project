import { NextApiRequest, NextApiResponse } from "next";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const imageUrl = req.body.imageUrl;
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/stable-diffussion/versions
      version:
        "50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
      input: { image: imageUrl },
    }),
  });
  let jsonStartResponse = await startResponse.json();
  let endpointUrl = jsonStartResponse.urls.get;

  let prompt: string | null = null;
  while (!prompt) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
    });
    let jsonFinalResponse = await finalResponse.json();
    console.log("jsonFinalResponse", jsonFinalResponse);

    if (jsonFinalResponse.status === "succeeded") {
      prompt = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res.status(200).json(prompt ? prompt : "Failed to generate prompt");
}
