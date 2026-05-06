"use client";

import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { PasswordStrengthChecklist } from "../PasswordStrengthChecklist/PasswordStrengthChecklist";
import type { PasswordInputProps } from "./PasswordInput.interface";
import { PASSWORD_INPUT_STYLES as S } from "./PasswordInput.styles";

export const PasswordInput = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  criteria,
  hideLabel,
  showLabel,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={S.wrapper}>
      <TextField
        isRequired
        name={name}
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
      >
        <Label>{label}</Label>
        <div className={S.inputWrapper}>
          <Input
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={S.input}
          />
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label={showPassword ? hideLabel : showLabel}
            onPress={() => setShowPassword((prev) => !prev)}
            className={S.toggleBtn}
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
        <FieldError />
      </TextField>
      {criteria && <PasswordStrengthChecklist criteria={criteria} />}
    </div>
  );
};