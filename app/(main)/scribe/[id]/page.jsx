import { getEntry } from '@/actions/scribe';
import { getTypesById } from '@/lib/projectActivityTypes';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react'
import EditButton from './_components/EditButton';
import DeleteButton from './_components/DeleteButton';
import Link from 'next/link';


const EntryPage = async({params}) => {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry) {
    return <p className="text-center text-gray-500">Entry not found or deleted.</p>;
  }
  //console.log(entry);
  const activity = getTypesById(entry.activityType);
  return (
    <>
     {entry.activityImageUrl && (
      <div className='w-full relative h-48 md:h-64'>
        <Image src={entry.activityImageUrl} alt="activity visualization" className='object-contain mt-4' fill priority />
      </div>
     )}
     <div className='p-6 space-y-6'>
      <div className='space-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='space-y-2'>
            <h1 className='font-bold gradient-color text-5xl'>{entry.title}</h1>
            <p className='text-gray-500'>Created at {format(new Date(entry.createdAt), "PPP")}</p>
          </div>
          <div className='flex items-center gap-2'>
            <EditButton entryId={id} />
            <DeleteButton entryId={id} />

          </div>
        </div>

        <div className='flex flex-wrap gap-2 items-center'>
          {entry.collection && (
            <Link href={`/collection/${entry.collection.id}`} className='w-fit'>
              <small className='p-2 rounded-2xl bg-gray-800 text-gray-100 w-fit inline-block'>Collection: {entry.collection.name}</small>
            </Link>
          )}
          <small className='p-2 rounded-2xl bg-gray-800 text-gray-100 w-fit inline-block'>{activity?.label}</small>
        </div>
      </div>
      <hr />

      <div className='ql-snow'>
        <div className='ql-editor' dangerouslySetInnerHTML={{__html: entry.content || "<p>No content available.</p>"}} />
      </div>

      <div className='pt-4 text-sm border-t text-gray-500'>
        Last updated at {format(new Date(entry.updatedAt), "PPP 'at' p")}
      </div>
     </div>
    </>
  )
}

export default EntryPage;