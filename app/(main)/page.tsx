"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const getFiles = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your files</h1>
        <Button
          onClick={() => {
            if (!orgId) return;

            createFile({
              name: "First file",
              orgId,
            });
          }}
        >
          Upload File
        </Button>
      </div>

      {getFiles?.map((file, index) => {
        return <div key={index}>{file.name}</div>;
      })}
    </>
  );
}
