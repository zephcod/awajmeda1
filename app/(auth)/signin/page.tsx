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
import { SignInForm } from "@/components/forms/signin_form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign in to your account",
}

export default async function SignInPage() {

  return (
    <Shell className="w-full relative my-48 p-6 ">
      <Card className='m-auto max-w-lg shadow-none bg-accent'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
            Choose your preferred log in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-accent px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="underline-offset-4 text-card-foreground transition-colors hover:underline"
            >
              Register 🡥
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset_password"
            className="text-sm text-card-foreground underline-offset-4 transition-colors hover:underline"
          >
            Forgot password 🡥
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
