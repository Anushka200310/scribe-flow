"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collectionSchema } from "@/lib/Schema";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";

const CollectionForm = ({ open, setOpen, loading, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    onSuccess(data);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        {loading && <BarLoader color="blue" width={"100%"} />}
        <form onSubmit={onSubmit}>
          <div className="mt-6">
            <label className="text-sm font-medium mb-2 text-gray-700">
              Collection Name
            </label>
            <Input
              disabled={loading}
              {...register("name")}
              placeholder="Enter your collection name"
              className={`${errors.name ? "border-red-500" : ""} `}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium mb-2 text-gray-700">
              Description
            </label>
            <Textarea
              disabled={loading}
              {...register("description")}
              placeholder="Describe your collection..."
              className={`${errors.description ? "border-red-500" : ""} `}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit">Create collection</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionForm;
