import React, { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import Layout from "@/components/layout";
import LoadingDots from "@/components/common/LoadingDots";

const Home: NextPage = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });

    let prediction = await res.json();
    if (res.status !== 200) {
      setError(prediction);
    } else {
      setPrediction(prediction);
      console.log("predictionImage", prediction);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="p-8  max-w-3xl m-auto">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 dark:text-slate-100 text-center mb-4">
          Dream something with Stable-Diffusion
        </h1>

        <div className="flex mt-10 items-center space-x-3 justify-center mb-4">
          <p className="text-left  font-medium text-slate-900 dark:text-slate-100">
            Input your text below and we&apos;ll correct it for you.
          </p>
        </div>

        <form className="flex mb-8" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="prompt"
            placeholder=" e.g. An astronaut riding a octopus on moon artstation, hd, dramatic
            lighting, detailed"
            className="w-full p-2 border-2 border-gray-300 rounded-md mr-4 shadow-sm focus:border-black focus:ring-black bg-white"
          />
          {loading ? (
            <button
              disabled
              type="submit"
              className="p-4 border-none rounded-md box-border cursor-pointer text-lg bg-gray-300 hover:bg-gray-400"
            >
              <span className="pt-4">
                <LoadingDots color="white" style="large" />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              className="p-4 border-none rounded-md box-border cursor-pointer text-lg bg-gray-300 hover:bg-gray-400"
            >
              Go!
            </button>
          )}
        </form>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {prediction && (
          <div
            className="flex flex-col items-center sm:font-medium text-lg
           "
          >
            <h2 className="mb-1 font-medium text-lg">Predicted Photo</h2>
            <Image
              alt="predicted photo"
              src={prediction[0]}
              className="rounded-2xl relative"
              width={475}
              height={475}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
