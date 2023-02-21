import { NextApiRequest, NextApiResponse } from "next";
import redis from "@/utils/redis";
import { Ratelimit } from "@upstash/ratelimit";
import requestIp from "request-ip";

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(3, "60 s"),
    })
  : undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = requestIp.getClientIp(req);
    const result = await ratelimit.limit(identifier!);
    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.success) {
      res
        .status(429)
        .json(
          "Too many uploads in 1 minute. Please try again in a few minutes."
        );
      return;
    }
  }

  const startResponse = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/stable-diffussion/versions
        version:
          "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",

        // This is the text prompt that will be submitted by a form on the frontend
        input: { prompt: req.body.prompt },
      }),
    }
  );

  let jsonStartResponse = await startResponse.json();
  let endpointUrl = jsonStartResponse.urls.get;

  let predictedImage: string | null = null;
  while (!predictedImage) {
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      predictedImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res
    .status(200)
    .json(predictedImage ? predictedImage : "Failed to restore image");
}
