export type LoginActionState = { error: string } | null;

export const validateEmail = (value: string): string | null => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  return null;
};
