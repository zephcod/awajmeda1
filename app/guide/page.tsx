'use client'
import appwriteStorageService from '@/db/appwrite_storage'
import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Guide = () => {
const headers = new Headers()
const router = useRouter()
  async function onDownload() {
    try {
      const res = await appwriteStorageService.downloadFile()
      router.push(res!.href)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>Guide
      {/* <Image width='500' height='200' src={res!.href} alt={''}/> */}
      <Button onClick={onDownload}>Download</Button>
    </div>
  )
}

export default Guide