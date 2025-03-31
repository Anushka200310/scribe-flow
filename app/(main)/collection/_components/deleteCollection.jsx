"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCollection } from "@/actions/collection";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

const DeleteCollection = ({ collection, entriesCount = 0 }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    data: deletedCollection,
    loading: isDeleting,
    fetchData: deleteCollectionFn,
  } = useFetch(deleteCollection);

  useEffect(() => {
    if (deletedCollection && !isDeleting) {
      setOpen(false);
      toast.error(`collection ${collection.name} and all its entries deleted`);
      router.push("/dashboard");
    }
  }, [deletedCollection, isDeleting, collection.name]);

  const handleDelete = async () => {
    try {
      await deleteCollectionFn(collection.id);
    } catch (error) {
      toast.error("Failed to delete collection. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{collection.name}&quot;?
          </AlertDialogTitle>
          <div className=" text-muted-foreground">
            <p>This will permanently delete the collection &quot;{collection.name}&quot;</p>
              <small className="flex gap-2">
                ({entriesCount} {entriesCount === 1 ? "entry" : "entries"})
              </small>
            <p className="font-semibold text-red-600 mt-2">
              This action can't be undone
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete collection"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollection;
