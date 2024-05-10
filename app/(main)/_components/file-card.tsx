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

import { EllipsisVertical, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";

const FileCardActions = ({ file }: { file: Doc<"files"> }) => {
  // API
  const deleteFile = useMutation(api.files.deleteFile);

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
              account and remove your data from our servers.
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

export const FileCard = ({ file }: { file: Doc<"files"> }) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{file.name}</CardTitle>
        <div className="absolute top-1 right-1">
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button variant="default">Download</Button>
      </CardFooter>
    </Card>
  );
};
