import { getCollection } from "@/actions/collection";
import { getScribeEntry } from "@/actions/scribe";
import React from "react";
import DeleteCollection from "../_components/deleteCollection";
import Entries from "../_components/Entries";

const CollectionPage = async ({ params }) => {
  const { collectionId } = await params;

  const entries = await getScribeEntry({ collectionId });
  const collection = await getCollection(collectionId);

  const isUnorganized = collectionId === "unorganized";
  const collectionName = isUnorganized ? "Unorganized Entry" : collection?.data?.name || "Collection";
  const collectionDescription = collection?.data?.description;
  const entriesList = entries?.data?.entries || [];

  return (
    <div className="space-y-6 mt-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="font-bold gradient-color text-4xl">{collectionName}</h1>
          {collection?.data && <DeleteCollection collection={collection.data} entriesCount={entriesList.length} />}
        </div>
        {collectionDescription && <h2 className="pl-1 font-extralight">{collectionDescription}</h2>}
      </div>
      <Entries entries={entriesList} />
    </div>
  );
};

export default CollectionPage;
