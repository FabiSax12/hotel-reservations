"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Label, Input, FieldError, Select, ListBox } from "@heroui/react";
import { ROOM_INFO_FORM_STYLES as s } from "../RoomInfoForm.styles";
import { ROOM_FORM_FIELDS } from "../../../../constants/roomFormFields";
import { ROOM_CATEGORIES } from "../../../../constants/info.constants";
import type { RoomInfoFormData } from "../RoomInfoForm.interface";
import type { RoomsTexts } from "../../../../i18n/roomsTexts.type";
import { Home } from "lucide-react";

interface RoomBasicInfoProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}

export const RoomBasicInfo: React.FC<RoomBasicInfoProps> = ({ texts, getErrorMessage }) => {
  const { register, control, formState: { errors } } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_BASIC_INFO}</h2>
      </div>
      <div className="flex flex-col gap-6">
        <TextField
          name={ROOM_FORM_FIELDS.NAME}
          isInvalid={!!errors.name}
          className={s.fullWidth}
        >
          <Label className={s.label}>{texts.FORM.NAME_LABEL}</Label>
          <div className={s.inputWrapper}>
            <Home className={s.inputIcon} size={18} />
            <Input
              {...register(ROOM_FORM_FIELDS.NAME)}
              placeholder={texts.FORM.NAME_PLACEHOLDER}
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.name?.message)}</FieldError>
        </TextField>

        <Controller
          name={ROOM_FORM_FIELDS.CATEGORY}
          control={control}
          render={({ field }) => (
            <Select
              name={field.name}
              selectedKey={field.value}
              onSelectionChange={(key) => field.onChange(key)}
              isInvalid={!!errors.category}
              className={s.fullWidth}
              placeholder={texts.FORM.CATEGORY_PLACEHOLDER}
            >
              <Label className={s.label}>{texts.FORM.CATEGORY_LABEL}</Label>
              <Select.Trigger className={s.selectTrigger}>
                <Select.Value />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className={s.listBox}>
                  {ROOM_CATEGORIES.map((category) => (
                    <ListBox.Item key={category} id={category}>
                      {category}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError>{getErrorMessage(errors.category?.message)}</FieldError>
            </Select>
          )}
        />
      </div>
    </div>
  );
};