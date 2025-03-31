"use client"
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const EditButton = ({ entryId }) => {
  const router = useRouter();
  return (
    <Button size="sm" onClick={()=> router.push(`/scribe/write-new?edit=${entryId}`)}>
      <Edit className='w-4 h-4' /> Edit
    </Button>
  )
}

export default EditButton;