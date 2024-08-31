/** @format */

"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button type="button"
        onClick={() => onChange("")}
        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        ><X className="h-4 w-4" /></button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // example [{
        //     "name": "Screenshot 2024-08-04 162527.png",
        //     "size": 4095537,
        //     "key": "7a452634-4d37-4056-a3a4-3826e8940263-xz23vb.png",
        //     "serverData": null,
        //     "url": "https://utfs.io/f/7a452634-4d37-4056-a3a4-3826e8940263-xz23vb.png",
        //     "customId": null,
        //     "type": "image/png"
        // }]
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => console.log(error)}
    />
  );
};
