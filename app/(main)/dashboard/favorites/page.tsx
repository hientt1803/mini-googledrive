"use client";

import { api } from "@/convex/_generated/api";
import FilesBrowser from "../../_components/file-browser";
import { useQuery } from "convex/react";

const Favorites = () => {
  return <FilesBrowser title="Your Favorites" favorite />;
};

export default Favorites;
