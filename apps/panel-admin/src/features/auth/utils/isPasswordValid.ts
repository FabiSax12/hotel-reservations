import type { PasswordCriteria } from "../domain/passwordCriteria";

export function isPasswordValid(criteria: PasswordCriteria): boolean {
  return (
    criteria.minLength &&
    criteria.hasUppercase &&
    criteria.hasLowercase &&
    criteria.hasDigit &&
    criteria.hasSpecialChar
  );
}
