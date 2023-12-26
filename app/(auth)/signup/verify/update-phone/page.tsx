import { UpdatePhoneForm } from '@/components/forms/update_phone_form'
import { VerifyPhoneForm } from '@/components/forms/verify_phone_form'
import { Shell } from '@/components/shells/shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const updatePhone = () => {
  return (
    <Shell className="w-full relative my-48 p-6 ">
      <Card className='m-auto max-w-lg shadow-none bg-accent'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify Phone</CardTitle>
          <CardDescription>
            Please enter your phone number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePhoneForm/>
        </CardContent>
      </Card>
    </Shell>
  )
}

export default updatePhone