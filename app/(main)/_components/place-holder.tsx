import Image from "next/image";
import { FileUploadDialog } from "./file-upload-dialog";

export const PlaceHolder = ({ orgId }: { orgId: string }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <h2 className="font-semibold text-center mt-36">
        You have no files, go ahead and upload one now!
      </h2>
      <Image
        alt="An images of a picture and directory icon"
        width="200"
        height="300"
        src="/empty.svg"
      />
      <FileUploadDialog orgId={orgId} />
    </div>
  );
};
