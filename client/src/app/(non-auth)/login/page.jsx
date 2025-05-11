"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { sendData } from "@/api/server"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";

export default function Page() {
  return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
}

export function LoginForm({
  className,
  ...props
}) {
  const router = useRouter();

  async function login(e) {
    try {
      e.preventDefault()
      const data = {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value
      }
      const response = await sendData("auth/login", data);
      if (!response.success) throw new Error(response.error);
      toast.success(response.message || "Logged in successfully!");

      const authHeaderResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: response.data.token })
      })
      const authHeaderData = await authHeaderResponse.json()

      if (authHeaderData.status_code !== 200) throw new Error(authHeaderData.message);
      router.push("/admin")
    } catch (error) {
      toast.error(error.message || "Please try again later!");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" placeholder="******" required name="password" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
