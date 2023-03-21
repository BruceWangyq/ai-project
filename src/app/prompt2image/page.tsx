"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import LoadingDots from "@/components/ui/LoadingDots";
import { Textarea } from "@/components/ui/Textarea";

import Image from "next/image";

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
    <>
      <div className="m-auto  max-w-3xl p-8">
        <h1 className="mb-4 max-w-2xl text-center text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-6xl">
          Dream something with Stable-Diffusion
        </h1>

        <div className="mt-10 mb-4 flex items-center justify-center space-x-3">
          <p className="text-left  font-medium text-slate-900 dark:text-slate-100">
            Input your text below and we&apos;ll correct it for you.
          </p>
        </div>

        <form
          className="mb-8 flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="prompt"
            placeholder=" e.g. An astronaut riding a octopus on moon artstation, hd, dramatic
            lighting, detailed"
            className="mr-4"
          />
          {loading ? (
            <Button disabled type="submit">
              <span className="pt-4 mx-auto">
                <LoadingDots color="white" style="large" />
              </span>
            </Button>
          ) : (
            <Button type="submit">Go!</Button>
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
    </>
  );
}
