import { LoginForm } from "@/features/auth/components";
import { loginAction } from "@/features/auth/services/loginAction";

export default function LoginPage() {
  return <LoginForm action={loginAction} />;
}
