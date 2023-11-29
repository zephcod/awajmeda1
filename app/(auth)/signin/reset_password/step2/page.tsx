'use client'
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordStep2Form } from "@/components/forms/reset_password_form_step2"
import { Shell } from "@/components/shells/shell"


export default function ResetPasswordStep2Page() {

  const urlParams = useSearchParams()
  const userId = urlParams.get('userId')
  const secret = urlParams.get('secret')
  let ver = false



  return (
    <Shell className="w-full relative my-48 p-6 ">
      <Card className='m-auto max-w-lg shadow-none bg-accent'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordStep2Form user={userId??""} sec={secret??""} />
        </CardContent>
      </Card>
    </Shell>
  )
}
