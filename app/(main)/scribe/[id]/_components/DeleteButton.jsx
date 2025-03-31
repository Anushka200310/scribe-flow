"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { deleteEntry } from "@/actions/scribe";

const DeleteDialogBtn = ({ entryId }) => {
  const router = useRouter();
  const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);

  const {
    data: deletedEntry,
    loading: isDeleting,
    fetchData: deleteEntryFn,
  } = useFetch(deleteEntry);


  useEffect(() => {
    if (deletedEntry && !isDeleting) {
      setDeleteDialogOpen(false);
      toast.error('Entry deleted');
      router.push(`/collection/${deletedEntry.collectionId ? deletedEntry.collectionId : "unorganized"}`);
    }
  }, [deletedEntry, isDeleting]);

  const handleDelete = () => {
    deleteEntryFn(entryId);
  };

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>This action can not be undone.This will permanently delete your Scribe entry</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
             {isDeleting ? (
              <>
                <Trash2 className="w-4 h-4 animate-spin" /> Deleting...
              </>
            ) : (
              "Delete Entry"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialogBtn;