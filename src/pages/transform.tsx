import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { uploader, options } from "../utils/uploader";
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
      <h1 className="mx-auto mt-20 max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 dark:text-slate-200 sm:text-6xl mb-5">
        See your age progression
      </h1>

      <ResizablePanel>
        <AnimatePresence exitBeforeEnter>
          <motion.div className="flex justify-between items-center w-full flex-col mt-4">
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
              <div className="flex sm:space-x-4 sm:flex-row flex-col">
                <div>
                  <h2 className="mb-1 font-medium text-lg">Original Photo</h2>
                  <Image
                    alt="original photo"
                    src={originalPhoto}
                    className="rounded-2xl relative"
                    width={475}
                    height={475}
                  />
                </div>
                <div className="sm:mt-0 mt-8">
                  <h2 className="mb-1 font-medium text-lg">
                    Transformed Photo
                  </h2>
                  <a href={transformedImage} target="_blank" rel="noreferrer">
                    <Image
                      alt="transformed photo"
                      src={transformedImage}
                      className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in"
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
                className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
              >
                <span className="pt-4">
                  <LoadingDots color="white" style="large" />
                </span>
              </button>
            )}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="flex space-x-2 justify-center">
              {originalPhoto && !loading && (
                <button
                  onClick={() => {
                    setOriginalPhoto(null);
                    setTransformedImage(null);
                    setTransformedLoaded(false);
                    setError(null);
                  }}
                  className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
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
                  className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
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
