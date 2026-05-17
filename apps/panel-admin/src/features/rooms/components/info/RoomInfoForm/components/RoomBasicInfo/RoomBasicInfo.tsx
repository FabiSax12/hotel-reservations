"use client";

import { FieldError, Input, Label, ListBox, Select, TextField } from "@heroui/react";
import { Home, Tags } from "lucide-react";
import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { RoomInfoFormData } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm.interface";
import { ICON_SIZES, ROOM_CATEGORIES } from "@/features/rooms/constants/info.constants";
import { ROOM_FORM_FIELDS } from "@/features/rooms/constants/roomFormFields";
import type { RoomBasicInfoProps } from "./RoomBasicInfo.interface";
import { ROOM_BASIC_INFO_STYLES as s } from "./RoomBasicInfo.styles";

export const RoomBasicInfo: React.FC<RoomBasicInfoProps> = ({ texts, getErrorMessage }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_BASIC_INFO}</h2>
      </div>
      <div className={s.formContainer}>
        <TextField name={ROOM_FORM_FIELDS.NAME} isInvalid={!!errors.name} className={s.fullWidth}>
          <Label className={s.label}>{texts.FORM.NAME_LABEL}</Label>
          <div className={s.inputWrapper}>
            <Home className={s.inputIcon} size={ICON_SIZES.MD} />
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
                <div className={s.selectContent}>
                  <Tags size={ICON_SIZES.MD} />
                  <Select.Value className={s.selectValue} />
                </div>
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
