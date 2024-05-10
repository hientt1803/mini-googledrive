"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FileUploadDialog } from "./_components/FileUploadDialog";
import { FileCard } from "./_components/file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const isLoading = files === undefined;

  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading...</div>
        </div>
      )}

      {!isLoading && files?.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Your files</h1>

          {/* Upload Button */}
          <FileUploadDialog orgId={orgId} />
        </div>
      )}

      {/* Show list of file  */}
      {!isLoading && files?.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center">
          <h2 className="font-semibold text-center mt-36">
            You do not have any file, Go ahead and upload one now!
          </h2>
          <Image
            alt="An images of a picture and directory icon"
            width="200"
            height="300"
            src="/empty.svg"
          />
          <FileUploadDialog orgId={orgId} />
        </div>
      )}

      {!isLoading && files?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files?.map((file, index) => {
            return <FileCard key={index} file={file} />;
          })}
        </div>
      )}
    </>
  );
}
