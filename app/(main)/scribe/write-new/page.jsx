"use client";
import { scribeSchema } from "@/lib/Schema";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { BarLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTypesById, ProjectActivityTypes } from "@/lib/projectActivityTypes";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createScribeEntry,
  getDraft,
  getEntry,
  saveDraft,
  updateEntry,
} from "@/actions/scribe";
import { toast } from "sonner";
import { CreateCollection, GetCollections } from "@/actions/collection";
import CollectionForm from "@/components/CollectionForm";
import { Loader } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Scribepage = () => {
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: existingEntry,
    loading: entryLoading,
    fetchData: fetchEntry,
  } = useFetch(getEntry);

  const {
    data: draftData,
    loading: draftLoading,
    fetchData: fetchDraft,
  } = useFetch(getDraft);

  const {
    loading: savingDraft,
    data: savedDraft,
    fetchData: saveDraftFn,
  } = useFetch(saveDraft);

  const {
    data: actionResult,
    loading: actionLoading,
    fetchData: actionFn,
  } = useFetch(isEditMode ? updateEntry : createScribeEntry);

  const {
    data: createCollection,
    loading: createCollectionLoading,
    fetchData: createCollectionFn,
  } = useFetch(CreateCollection);

  const {
    data: collections,
    loading: collectionsLoading,
    fetchData: fetchCollections,
  } = useFetch(GetCollections);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(scribeSchema),
    defaultValues: {
      title: "",
      content: "",
      activityType: "",
      collectionId: "",
    },
  });

  useEffect(() => {
    console.log("Edit ID:", editId);
    fetchCollections();

    if (editId) {
      setIsEditMode(true);
      fetchEntry(editId);
    } else {
      setIsEditMode(false);
      fetchDraft();
    }
  }, [editId]);
  

  useEffect(() => {
   // console.log("Existing Entry:", existingEntry); 
   // console.log("Draft Data:", draftData); 
    if (isEditMode && existingEntry) {
      reset({
        title: existingEntry.title || "",
        content: existingEntry.content || "",
        activityType: existingEntry.activityType || "",
        collectionId: existingEntry.collectionId || "",
      });
    } else if (draftData?.success && draftData?.data) {
      reset({
        title: draftData.data.title || "",
        content: draftData.data.content || "",
        activityType: draftData.data.activityType || "",
        collectionId: "",
      });
    } else {
      reset({
        title: "",
        content: "",
        activityType: "",
        collectionId: "",
      });
    }
  }, [isEditMode, draftData, existingEntry]);

  //console.log(collections,"collections");

  useEffect(() => {
    if (actionResult && !actionLoading) {
      if (!isEditMode) {
        saveDraftFn({
          title: "",
          content: "",
          activityType: "",
        });
      }

      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );
      toast.success(`Entry ${isEditMode ? "Updated" : "Created"} successfully`);
    }
  }, [actionResult, actionLoading]);

  const selectedActivityType = watch("activityType");

  const onSubmit = handleSubmit(async (data) => {
    const activityType = getTypesById(data.activityType);
    actionFn({
      ...data,
      activityTypeScore: activityType.score,
      activityTypeQuery: activityType.pixabayQuery,
      ...(isEditMode && { id: editId }),
    });
  });

  useEffect(() => {
    if (createCollection) {
      setCollectionDialogOpen(false);
      fetchCollections();
      setValue("collectionId", createCollection.id);
      toast.success(`collection ${createCollection.name} created`);
    }
  }, [createCollection]);

  const handleCreateCollection = async (data) => {
    createCollectionFn(data);
  };

  const formData = watch();

  const handleSaveDraft = async () => {
    if (!isDirty) {
      toast.error("No changes to save");
      return;
    }
    //console.log("Saving draft with data:", formData);
    await saveDraftFn(formData);

     }

    useEffect(() => {
      if (savedDraft?.success && !savingDraft) {
        toast.success("Draft saved successfully");
      }
    }, [savedDraft, savingDraft]);

    const isLoading =
      actionLoading ||
      collectionsLoading ||
      entryLoading ||
      draftLoading ||
      savingDraft;

    return (
      <div className="py-8">
        <form className="mx-auto" onSubmit={onSubmit}>
          <h1 className="gradient-color text-5xl md:text-6xl">
            {isEditMode ? "Edit Entry" : "What's on your mind ?"}
          </h1>
          {isLoading && <BarLoader color="blue" width={"100%"} />}

          <div className="mt-6">
            <label className="text-sm font-medium mb-2 text-gray-700">
              Title
            </label>
            <Input
              disabled={isLoading}
              {...register("title")}
              placeholder="Enter your project title"
              className={`py-5 md:text-md ${
                errors.title ? "border-red-500" : ""
              } `}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              What project work you&apos;re doing today
            </label>
            <Controller
              name="activityType"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger
                      className={errors.activityType ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select your today's project activity" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ProjectActivityTypes).map(
                        (activityType) => {
                          return (
                            <SelectItem
                              key={activityType.id}
                              value={activityType.id}
                            >
                              <span className="flex items-center gap-2">
                                {activityType.emoji} {activityType.label}
                              </span>
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.activityType && (
              <p className="text-sm text-red-500">
                {errors.activityType.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              {getTypesById(selectedActivityType)?.prompt ??
                "write your thoughts..."}
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  readOnly={isLoading}
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["blockquote", "code-block"],
                      ["link"],
                      ["clean"],
                    ],
                  }}
                />
              )}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              Add to collection (optional)
            </label>
            <Controller
              name="collectionId"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    onValueChange={(value) => {
                      if (value === "new") {
                        setCollectionDialogOpen(true);
                      } else {
                        field.onChange(value);
                      }
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a collection..." />
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(collections) ? collections : [])?.map((collection) => {
                        return (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        );
                      })}
                      <SelectItem value="new">
                        <span className="text-blue-600">
                          + Create New Collections
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.collectionId && (
              <p className="text-sm text-red-500">
                {errors.collectionId.message}
              </p>
            )}
          </div>

          <div className=" mt-4 gap-2 flex items-center">
            {!isEditMode && (
              <Button
                onClick={handleSaveDraft}
                type="button"
                variant="outline"
                disabled={savingDraft || !isDirty}
              >
                {savingDraft && <Loader className="h-4 w-4 animate-spin" />}
                Save as Draft
              </Button>
            )}

            <Button type="submit" disabled={actionLoading || !isDirty}>
              {isEditMode ? "Update" : "Publish"}
            </Button>

            {isEditMode && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/scribe/${existingEntry.id}`);
                }}
                variant="destructive"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={collectionDialogOpen}
          setOpen={setCollectionDialogOpen}
        />
      </div>
    );
  };


export default Scribepage;
