"use client";

import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import LoadingDots from "@/components/common/LoadingDots";

export default function Page() {
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
      <div className="m-auto  max-w-3xl p-8">
        <h1 className="mb-4 max-w-2xl text-center text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-6xl">
          Dream something with Stable-Diffusion
        </h1>

        <div className="mt-10 mb-4 flex items-center justify-center space-x-3">
          <p className="text-left  font-medium text-slate-900 dark:text-slate-100">
            Input your text below and we&apos;ll correct it for you.
          </p>
        </div>

        <form className="mb-8 flex" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="prompt"
            placeholder=" e.g. An astronaut riding a octopus on moon artstation, hd, dramatic
            lighting, detailed"
            className="mr-4 h-24 w-full rounded-md border-2 border-gray-300 bg-white p-2 shadow-sm focus:border-black focus:ring-black"
          />
          {loading ? (
            <button
              disabled
              type="submit"
              className="box-border cursor-pointer rounded-md border-none bg-gray-300 p-4 text-lg hover:bg-gray-400"
            >
              <span className="pt-4">
                <LoadingDots color="white" style="large" />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              className="box-border cursor-pointer rounded-md border-none bg-gray-300 p-4 text-lg hover:bg-gray-400"
            >
              Go!
            </button>
          )}
        </form>

        {error && (
          <div
            className="mt-8 rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {prediction && (
          <div
            className="flex flex-col items-center text-lg sm:font-medium
           "
          >
            <h2 className="mb-1 text-lg font-medium">Predicted Photo</h2>
            <Image
              alt="predicted photo"
              src={prediction[0]}
              className="relative rounded-2xl"
              width={475}
              height={475}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
