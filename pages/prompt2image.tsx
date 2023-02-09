import React, { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import Layout from "../components/layout";

interface Prediction {
  id: string;
  status: string;
  output: string[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Home: NextPage = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
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
            className="w-full p-2 border-2 border-gray-300 rounded-md text-lg mr-4 shadow-sm focus:border-black focus:ring-black"
          />
          <button
            type="submit"
            className="p-4 border-none rounded-md box-border cursor-pointer text-lg bg-gray-300 hover:bg-gray-400"
          >
            Go!
          </button>
        </form>

        {error && <div>{error}</div>}

        {prediction && (
          <div>
            {prediction.output && (
              <div className="w-full aspect-square relative">
                <Image
                  fill
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                  sizes="100vw"
                />
              </div>
            )}
            <p>status: {prediction.status}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
