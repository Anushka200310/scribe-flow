import { GetCollections } from '@/actions/collection';
import { getScribeEntry } from '@/actions/scribe';
import React from 'react'
import Collections from './_components/Collections';
import ActivityAnalytics from './_components/ActivityAnalytics';

const DashboardPage = async() => {

  const collections = await GetCollections();

  //console.log(collections);
  const scribeEntries = await getScribeEntry();

  const entriesByCollection = (scribeEntries?.data.entries || []).reduce((acc, entry)=>{
    const collectionId = entry.collectionId || "unorganized";
    if(!acc[collectionId]){
      acc[collectionId] = [];
    }
    acc[collectionId].push(entry);
    return acc;
  }, {});

  //console.log(entriesByCollection);
  return (
    <div>
      <section>
        <ActivityAnalytics />
      </section>
      <Collections collections={collections || []} entriesByCollection={entriesByCollection} />
    </div>
  )
}

export default DashboardPage;
  
