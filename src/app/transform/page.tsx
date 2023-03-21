"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { uploader, options } from "@/utils/uploader";
import { CompareSlider } from "@/components/CompareSlider";

import LoadingDots from "@/components/common/LoadingDots";

import Toggle from "@/components/common/Toggle";
import appendNewToName from "@/utils/appendNewToName";
import downloadPhoto from "@/utils/downloadPhoto";
import Layout from "@/components/layout";
import ResizablePanel from "@/components/common/ResizablePanel";

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transformedLoaded, setTransformedLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          console.log("file", file);
          setPhotoName(file[0].originalFile.originalFileName);
          console.log("photoName", photoName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          console.log("originalPhoto", originalPhoto);
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);
    const res = await fetch("/api/transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPhoto = await res.json();
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      setTransformedImage(newPhoto);
      console.log("transformedImage", transformedImage);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <h1 className="font-display mx-auto mt-20 mb-5 max-w-4xl text-4xl font-bold tracking-normal text-slate-900 dark:text-slate-200 sm:text-6xl">
        See your age progression
      </h1>

      <ResizablePanel>
        <AnimatePresence exitBeforeEnter>
          <motion.div className="mt-4 flex w-full flex-col items-center justify-between">
            <Toggle
              className={`${transformedLoaded ? "visible" : "invisible"} mb-6`}
              sideBySide={sideBySide}
              setSideBySide={(newVal: any) => setSideBySide(newVal)}
            />
            {transformedLoaded && sideBySide && (
              <CompareSlider
                original={originalPhoto!}
                restored={transformedImage!}
              />
            )}
            {!originalPhoto && <UploadDropZone />}
            {originalPhoto && !transformedImage && (
              <Image
                alt="original photo"
                src={originalPhoto}
                className="rounded-2xl"
                width={475}
                height={475}
              />
            )}
            {transformedImage && originalPhoto && !sideBySide && (
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div>
                  <h2 className="mb-1 text-lg font-medium">Original Photo</h2>
                  <Image
                    alt="original photo"
                    src={originalPhoto}
                    className="relative rounded-2xl"
                    width={475}
                    height={475}
                  />
                </div>
                <div className="mt-8 sm:mt-0">
                  <h2 className="mb-1 text-lg font-medium">
                    Transformed Photo
                  </h2>
                  <a href={transformedImage} target="_blank" rel="noreferrer">
                    <Image
                      alt="transformed photo"
                      src={transformedImage}
                      className="relative mt-2 cursor-zoom-in rounded-2xl sm:mt-0"
                      width={475}
                      height={475}
                      onLoadingComplete={() => setTransformedLoaded(true)}
                    />
                  </a>
                </div>
              </div>
            )}
            {loading && (
              <button
                disabled
                className="mt-8 w-40 rounded-full bg-black px-4 pt-2 pb-3 font-medium text-white hover:bg-black/80"
              >
                <span className="pt-4">
                  <LoadingDots color="white" style="large" />
                </span>
              </button>
            )}
            {error && (
              <div
                className="mt-8 rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="flex justify-center space-x-2">
              {originalPhoto && !loading && (
                <button
                  onClick={() => {
                    setOriginalPhoto(null);
                    setTransformedImage(null);
                    setTransformedLoaded(false);
                    setError(null);
                  }}
                  className="mt-8 rounded-full bg-black px-4 py-2 font-medium text-white transition hover:bg-black/80"
                >
                  Upload New Photo
                </button>
              )}
              {transformedLoaded && (
                <button
                  onClick={() => {
                    downloadPhoto(
                      transformedImage!,
                      appendNewToName(photoName!)
                    );
                  }}
                  className="mt-8 rounded-full border bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-100"
                >
                  Download Transformed Photo
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
    </Layout>
  );
};

export default Home;
