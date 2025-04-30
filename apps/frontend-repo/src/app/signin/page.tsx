import type { Metadata } from "next"
import { AuthTemplate } from "@/components/templates/auth-template";
import { LoginForm } from "@/components/organisms/login-form";

export const metadata: Metadata = {
  title: "Login | MonoRepoDemo",
  description: "Login to access your account",
}

export default function LoginPage() {
  return (
    <AuthTemplate title="Welcome Back" subtitle="Please sign in to continue">
      <LoginForm />
    </AuthTemplate>
  )
}
