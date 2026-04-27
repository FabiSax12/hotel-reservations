import type { ActivateAdminState } from "../../domain/adminActivation";

export interface ActivationPasswordFormProps {
  tokens: { accessToken: string; refreshToken: string };
  action: (payload: FormData) => void;
  isPending: boolean;
  activateState: ActivateAdminState;
}
