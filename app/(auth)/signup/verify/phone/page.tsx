'use client'
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/shells/shell"
import { VerifyPhoneForm } from "@/components/forms/verify_phone_form"


export default function ResetPasswordStep2Page() {

  const urlParams = useSearchParams()
  const userId = urlParams.get('userId')
  const secret = urlParams.get('secret')
  let ver = false



  return (
    <Shell className="max-w-lg h-screen relative my-auto p-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify Phone</CardTitle>
          <CardDescription>
            Please enter the 6-digit code sent to your phone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyPhoneForm/>
        </CardContent>
      </Card>
    </Shell>
  )
}