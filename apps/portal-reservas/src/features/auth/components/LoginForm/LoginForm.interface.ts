import type { LoginActionState } from "@/features/auth/domain/credentials";

export interface LoginFormProps {
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>;
}
