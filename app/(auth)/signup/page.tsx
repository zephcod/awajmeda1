import { type Metadata } from "next"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/components/auth/oauth_signin"
import { SignUpForm } from "@/components/forms/signup_form"
import { Shell } from "@/components/shells/shell"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign Up",
  description: "Sign up for an account",
}

export default async function SignUpPage() {
  return (
    <Shell className="w-full relative my-48 p-6">
      <Card className='m-auto max-w-lg shadow-none bg-accent'>
      <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Register</CardTitle>
          {/* <CardDescription>
            Choose your preferred sign up method
          </CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-accent px-2 text-muted-foreground ">
                Or continue with
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              aria-label="Sign in"
              href="/signin"
              className=" text-card-foreground underline-offset-4 transition-colors hover:underline"
            >
              Login 🡥 
            </Link>
          </div>
          <Separator/>
          <p className="text-muted-foreground text-sm font-light text-center w-full">
            By continuing you agree to Awaj AI&apos;s{' '}
            <Link className="font-normal underline" href={'https://www.awajai.com/privacy'} target="_blank">Privacy Policy</Link>{' '}and{' '} 
            <Link className="font-normal underline" href={'https://www.awajai.com/terms'} target="_blank">Terms</Link>.
          </p>
        </CardFooter>
      </Card>
    </Shell>
  )
}
