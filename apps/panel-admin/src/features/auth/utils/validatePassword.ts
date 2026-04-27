import { PASSWORD_RULES } from "../constants/passwordRules";
import { PASSWORD_VALIDATION_ERRORS } from "../constants/passwordValidationErrors";

export function validatePassword(password: string): string | null {
    if (password.length < PASSWORD_RULES.MIN_LENGTH) {
        return PASSWORD_VALIDATION_ERRORS.TOO_SHORT;
    }

    return null;
}