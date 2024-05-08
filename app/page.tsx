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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {getFiles?.map((file, index) => {
        return <div key={index}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          if (!orgId) return;

          createFile({
            name: "First file",
            orgId,
          });
        }}
      >
        create file
      </Button>
    </main>
  );
}
