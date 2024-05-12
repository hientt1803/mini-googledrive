import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc, Id } from "@/convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  EllipsisVertical,
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  ImagesIcon,
  ListStartIcon,
  TrashIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const FileCardActions = ({ file }: { file: Doc<"files"> }) => {
  // API
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  // State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File have been delete",
                  description: "Now everyone can view your file",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id });
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <ListStartIcon className="w-4 h-4" /> Favorites
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="flex gap-1 text-red-600 items-center cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

// const getFileUrl = (fileId: Id<"_storage">): string => {
//   const getImageUrl = new URL(`${process.env.NEXT_PUBLIC_CONVEX_URL}/getImage`);
//   getImageUrl.searchParams.set("storageId", fileId);
//   https://grandiose-spaniel-545.convex.cloud/api/storage/dae30895-d1cc-4439-9ebd-8340da4a7e26
//   console.log(getImageUrl.href);

//   return getImageUrl.href;
// };

export const FileCard = ({ file }: { file: Doc<"files"> }) => {
  const typeIcons = {
    image: <ImagesIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-1">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-1 right-1">
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-200 flex justify-center items-center">
        {file.type === "image" && (
          <Image width="200" height="100" src={"/empty.svg"} alt={file.name} />
        )}

        {file.type === "csv" && (
          <GanttChartIcon className="w-[200px] h-[200px]" />
        )}
        {file.type === "pdf" && (
          <FileTextIcon className="w-[200px] h-[200px]" />
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="default"
          onClick={() => {
            // window.open(getFileUrl(file.fileId), "_blank");
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};
