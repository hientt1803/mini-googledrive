"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, ListStartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SideNav = () => {
  const path = usePathname();

  return (
    <div className="w-40 flex flex-col gap-2">
      <Link href="/dashboard/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "font-bold underline uppercase": path.includes("/dashboard/files"),
          })}
        >
          <FileIcon /> All Files
        </Button>
      </Link>
      <Link href="/dashboard/favorites">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "font-bold underline uppercase": path.includes("/dashboard/favorites"),
          })}
        >
          <ListStartIcon /> Favorites
        </Button>
      </Link>
    </div>
  );
};
