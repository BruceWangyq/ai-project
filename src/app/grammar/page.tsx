"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import LoadingDots from "@/components/ui/LoadingDots";
import ResizablePanel from "@/components/ui/ResizablePanel";
import { Textarea } from "@/components/ui/Textarea";

import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [generatedTexts, setGeneratedTexts] = useState<string>("");

  const prompt = `Correct this to standard, professional English: ${input}`;

  const generate = async (e: any) => {
    e.preventDefault();
    setGeneratedTexts("");
    setLoading(true);
    const response = await fetch("/api/grammar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    console.log("data: ", data);
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log("chunkValue: ", chunkValue);
      setGeneratedTexts((prev) => prev + chunkValue);
      console.log("generatedBios: ", generatedTexts);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="max-w-2xl text-center text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-6xl">
          Correct your grammar in seconds
        </h1>

        <div className="w-full max-w-xl">
          <div className="mt-10 flex items-center justify-center space-x-3">
            <p className="text-left  font-medium text-slate-900 dark:text-slate-100">
              Input your text below and we&apos;ll correct it for you.
            </p>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="mt-4"
            placeholder={
              "e.g. This is a sentence have a lot of grammar mistake."
            }
          />

          <div className="flex justify-center mt-8">
            {!loading ? (
              <Button
                // className="mx-2 mt-8 w-1/3 rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black sm:mt-10"
                onClick={(e) => generate(e)}
              >
                Correct Grammar
              </Button>
            ) : (
              <Button
                // className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black sm:mt-10"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </Button>
            )}
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="my-10 space-y-10">
              {generatedTexts && (
                <>
                  <h2 className="mx-auto text-center text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
                    Here&apos;s your corrected text.
                  </h2>
                  <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
                    <div
                      className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100 dark:bg-black"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedTexts);
                        toast("Bio copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p className="text-black dark:text-white">
                        {generatedTexts}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </>
  );
}
