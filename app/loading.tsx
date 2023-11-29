import { Icons } from '@/components/icons'
import React from 'react'

const Loading = () => {
  return (
    <div className='relative'>
        <Icons.spinner
              className="h-24 w-24 animate-spin m-auto my-72 text-muted-foreground"
              aria-hidden="true"
            />
    </div>
  )
}

export default Loading