import { PASSWORD_RULES } from "../constants/passwordRules";
import type { PasswordCriteria } from "../domain/passwordCriteria";

export function checkPasswordCriteria(password: string): PasswordCriteria {
  return {
    minLength: password.length >= PASSWORD_RULES.MIN_LENGTH,
    hasUppercase: PASSWORD_RULES.HAS_UPPERCASE.test(password),
    hasLowercase: PASSWORD_RULES.HAS_LOWERCASE.test(password),
    hasDigit: PASSWORD_RULES.HAS_DIGIT.test(password),
    hasSpecialChar: PASSWORD_RULES.HAS_SPECIAL_CHAR.test(password),
  };
}
