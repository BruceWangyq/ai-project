import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { options, uploader } from "../utils/uploader";

const Home: NextPage = () => {
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
    <div>
      <Head>
        <title>Image2Prompt</title>
      </Head>
      <main>
        <h1>Image2Prompt</h1>
        {!originalPhoto && <UploadDropZone />}
        {originalPhoto && (
          <div>
            <Image
              src={originalPhoto}
              alt="originalPhoto"
              className="rounded-2xl relative"
              width={475}
              height={475}
            />
            <button
              className="bordered-full bg-black text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
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
      </main>
    </div>
  );
};

export default Home;
