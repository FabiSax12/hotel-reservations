import type { LoginActionState } from "../../domain/credentials";

export interface LoginFormProps {
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>;
}
