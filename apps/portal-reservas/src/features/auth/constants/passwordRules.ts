export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  HAS_UPPERCASE: /[A-Z]/,
  HAS_LOWERCASE: /[a-z]/,
  HAS_DIGIT: /[0-9]/,
  HAS_SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>]/,
} as const;
