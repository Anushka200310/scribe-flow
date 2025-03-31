"use client"
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { getTypesById } from "@/lib/projectActivityTypes";

const colorSchemes = {
  unorganized: {
    tag: "bg-gradient-to-r from-amber-200 to-amber-100 hover:from-amber-200 hover:to-amber-100",
    tab: "bg-amber-200 group-hover:bg-amber-300",
  },
  collection: {
    tag: "bg-gradient-to-r from-blue-200 to-blue-100 hover:from-blue-200 hover:to-blue-100",
    tab: "bg-blue-200 group-hover:bg-blue-300",
  },
  createCollection: {
    tag: "bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100",
    tab: "bg-gradient-to-r from-gray-200 to-gray-100 group-hover:from-gray-300 group-hover:to-gray-200",
  },
};

const FolderTab = ({ colorClass }) => {
  return (
    <div
      className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors shadow 
        ${colorClass}`}
    />
  );
};

const PreviewEntry = ({ entry }) => {
  return (
    <div className="text-sm truncate p-2 rounded bg-white/50">
      <span className="mr-2">    
            {getTypesById(entry.activityType)?.emoji} 
      </span>
      {entry.title}
    </div>
  );
};
const PreviewCollection = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {
  if (isCreateNew) {
    return (
      <button
        onClick={onCreateNew}
        className="relative group h-[220px] cursor-pointer transition-transform hover:scale-[1.02]"
      >
        <FolderTab colorClass={colorSchemes["createCollection"].tag} />
        <div
          className={`relative h-full rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all 
            flex flex-col items-center justify-center gap-4 
            ${colorSchemes["createCollection"].tab}`}
        >
          <div className="h-14 w-14 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center transition-colors">
            <Plus className="text-gray-600 h-7 w-7" />
          </div>
          <p className="text-gray-700 font-medium text-lg">
            Create New Collection
          </p>
        </div>
      </button>
    );
  }

  const schemeKey = isUnorganized ? "unorganized" : "collection";

  return (
    <Link
      href={`/collection/${isUnorganized ? "unorganized" : id}`}
      className="group relative transition-transform hover:scale-[1.02]"
    >
      <FolderTab colorClass={colorSchemes[schemeKey].tag} />
      <div
        className={`relative rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between w-full ${colorSchemes[schemeKey].tab}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{isUnorganized ? "📂" : "📁"}</span>
          <h3 className="text-xl font-semibold truncate">{name}</h3>
        </div>
        <div className="w-full">
          <div className="space-y-2">
            {entries.length > 0 ? (
              entries
                .slice(0, 2)
                .map((entry) => <PreviewEntry key={entry.id} entry={entry} />)
            ) : (
              <p className="text-sm italic text-gray-500">No entries yet</p>
            )}
          </div>

          <div className="flex justify-between items-center w-full text-sm text-gray-700 mt-4">
            <span className="text-gray-800 font-medium">
              {entries.length} {entries.length <= 1 ? "entry" : "entries"}
            </span>
            {entries.length > 0 && entries[0]?.createdAt && (
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(entries[0].createdAt), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PreviewCollection;
