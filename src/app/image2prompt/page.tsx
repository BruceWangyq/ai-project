"use client";

import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import Layout from "@/components/layout";
import { options, uploader } from "@/utils/uploader";

export default function Page() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          console.log("file", file);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          console.log("originalPhoto", originalPhoto);
          generatePrompt(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePrompt(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);
    const res = await fetch("/api/img2prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPrompt = await res.json();
    console.log("newPrompt", newPrompt);
    if (res.status !== 200) {
      console.log("error", newPrompt);
    } else {
      setPrompt(newPrompt);
      console.log("prompt", prompt);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <h1 className="font-display mx-auto mb-5 max-w-4xl text-center text-4xl font-bold tracking-normal text-slate-900 dark:text-slate-200 sm:text-6xl">
        Turn your photo into a prompt
      </h1>
      {!originalPhoto && <UploadDropZone />}
      {originalPhoto && (
        <div>
          <Image
            src={originalPhoto}
            alt="originalPhoto"
            className="relative rounded-2xl"
            width={475}
            height={475}
          />
          <button
            className="bordered-full mt-8 w-40 bg-black px-4 pt-2 pb-3 font-medium text-white hover:bg-black/80"
            onClick={() => {
              setOriginalPhoto(null), setPrompt(null);
            }}
          >
            Upload new photo
          </button>
        </div>
      )}
      {prompt && (
        <div>
          <p>{prompt}</p>
        </div>
      )}
    </Layout>
  );
}
