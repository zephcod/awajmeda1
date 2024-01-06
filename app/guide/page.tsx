'use client'
import appwriteStorageService from '@/db/appwrite_storage'
import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Guide = () => {

  return (
    <div>Guide
      {/* <Image width='500' height='200' src={res!.href} alt={''}/> */}
      <Button>Download</Button>
    </div>
  )
}

export default Guide