"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const getFiles = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {getFiles?.map((file, index) => {
        return <div key={index}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          createFile({
            name: "First file",
          });
        }}
      >
        create file
      </Button>
    </main>
  );
}
