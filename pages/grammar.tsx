import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Layout from "../components/layout";

import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [generatedTexts, setGeneratedTexts] = useState<string>("");

  const prompt = `Correct this to standard English: ${input}`;

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
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
          Correct your grammar in seconds
        </h1>

        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3 justify-center">
            <p className="text-left  font-medium text-slate-900 dark:text-slate-100">
              Input your text below and we&apos;ll correct it for you.
            </p>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 p-2 bg-white"
            placeholder={
              "e.g. This is a sentence have a lot of grammar mistake."
            }
          />

          {!loading && (
            <div className="flex justify-center">
              <button
                className="bg-black rounded-xl text-white dark:bg-white dark:text-black font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-1/3 mx-2"
                onClick={(e) => generate(e)}
              >
                Correct Grammar
              </button>
            </div>
          )}
          {loading && (
            <button
              className="bg-black dark:bg-white rounded-xl text-white dark:text-black font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedTexts && (
                <>
                  <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 dark:text-slate-100 mx-auto text-center">
                    Here&apos;s your corrected text.
                  </h2>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    <div
                      className="bg-white dark:bg-black rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
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
    </Layout>
  );
};

export default Home;
