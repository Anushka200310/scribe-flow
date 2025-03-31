"use client";
import React, { useEffect, useState } from "react";
import PreviewCollection from "./PreviewCollection";
import CollectionForm from "@/components/CollectionForm";
import { CreateCollection } from "@/actions/collection";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

const Collections = ({ collections = [], entriesByCollection = {} }) => {
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);

  const {
    data: createCollection,
    loading: createCollectionLoading,
    fetchData: createCollectionFn,
  } = useFetch(CreateCollection);

  useEffect(() => {
    if(createCollection){
      setCollectionDialogOpen(false);
      toast.success(`collection ${createCollection?.name} created`)
    }
  
  }, [createCollection])

  const handleCreateCollection = async(data) => {
    createCollectionFn(data);
  };

  if (collections.length === 0 && !entriesByCollection.unorganized?.length) return <></>;

  return (
    <div className="space-y-6" id="collections">
      <h1 className="gradient-color text-3xl font-bold mb-4">Collections</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <PreviewCollection
        isCreateNew={true}
        onCreateNew={() => setCollectionDialogOpen(true)}
      />

      {entriesByCollection?.unorganized?.length > 0 && (
        <PreviewCollection
          name="Unorganized"
          entries={entriesByCollection.unorganized}
          isUnorganized={true}
        />
      )}

      {Array.isArray(collections) &&
      collections?.map((collection) => (
        <PreviewCollection
          key={collection.id}
          id={collection.id}
          name={collection.name}
          entries={entriesByCollection[collection.id] || []}
        />
      ))}

      <CollectionForm
        loading={createCollectionLoading}
        onSuccess={handleCreateCollection}
        open={collectionDialogOpen}
        setOpen={setCollectionDialogOpen}
      />
      </div>
    </div>
  );
};

export default Collections;
