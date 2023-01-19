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

  return <div>restore</div>;
}

export default restore;
