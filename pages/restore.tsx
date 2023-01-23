import { setDefaultResultOrder } from "dns";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";

type Props = {};

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});
const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: { colors: { primary: "#000" } },
};

const Home: NextPage<Props> = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [PhotoName, setPhotoName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const UploadDropZone = () => {
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpload={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width={300}
      height={300}
    />;
  };

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(true);
    const res = await fetch("/api/generate", {
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
      setPhotoName(newPhoto);
    }
    setLoading(false);
  }

  return (
    <div className="flex">
      <Head>
        <title>Restore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mx-auto max-w-4xl font-bold text-4xl tracking-normal text-slate-900 sm:text-6xl mb-5 ">
        Restore any face photo
      </h1>
      <ResizeablePanel></ResizeablePanel>
    </div>
  );
};

export default Home;
