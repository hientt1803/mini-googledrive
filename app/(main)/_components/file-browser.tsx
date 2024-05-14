"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./search-bar";
import { FileUploadDialog } from "./file-upload-dialog";
import { PlaceHolder } from "./place-holder";
import { FileCard } from "./file-card";

export default function FilesBrowser({
  title,
  favorite,
}: {
  title: string;
  favorite?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();

  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorite } : "skip"
  );

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const isLoading = files === undefined;

  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading your file...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between items-center flex-wrap mb-4">
            <h1 className="text-4xl font-bold">{title}</h1>

            <SearchBar query={query} setQuery={setQuery} />

            {/* Upload Button */}
            <FileUploadDialog orgId={orgId} />
          </div>

          {files?.length === 0 && <>{orgId && <PlaceHolder orgId={orgId} />}</>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files?.map((file, index) => {
              return (
                <FileCard key={index} favorites={favorites ?? []} file={file} />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
