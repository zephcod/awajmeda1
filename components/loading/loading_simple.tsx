import React from 'react'
import { Icons } from '../icons'

const LoadingSimple = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Icons.spinner className="h-24 w-24 animate-spin m-auto my-72 text-muted-foreground" aria-hidden="true" />
    </div>
  )
}

export default LoadingSimple