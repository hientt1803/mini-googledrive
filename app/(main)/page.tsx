"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FileUploadDialog } from "./_components/FileUploadDialog";
import { FileCard } from "./_components/file-card";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const getFiles = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Your files</h1>

        {/* Upload Button */}
        <FileUploadDialog orgId={orgId} />
      </div>

      {/* Show list of file  */}
      <div className="grid grid-cols-4 gap-4">
        {getFiles?.map((file, index) => {
          return <FileCard key={index} file={file} />;
        })}
      </div>
    </>
  );
}
