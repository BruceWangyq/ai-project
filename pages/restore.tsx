import { setDefaultResultOrder } from "dns";
import { NextPage } from "next";
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

function restore({}: Props) {
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

  return <div>restore</div>;
}

export default restore;
