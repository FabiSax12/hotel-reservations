"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Label, TextArea, Switch, FieldError } from "@heroui/react";
import { ROOM_INFO_FORM_STYLES as s } from "../RoomInfoForm.styles";
import { ROOM_FORM_FIELDS } from "../../../../constants/roomFormFields";
import type { RoomInfoFormData } from "../RoomInfoForm.interface";
import type { RoomsTexts } from "../../../../i18n/roomsTexts.type";

import { Activity, PawPrint } from "lucide-react";

interface RoomExtraInfoProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}

export const RoomExtraInfo: React.FC<RoomExtraInfoProps> = ({ texts, getErrorMessage }) => {
  const { register, control, formState: { errors } } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_EXTRA_INFO}</h2>
      </div>

      <TextField
        name={ROOM_FORM_FIELDS.DESCRIPTION}
        isInvalid={!!errors.description}
        className={s.fullWidth}
      >
        <Label className={s.label}>{texts.FORM.DESCRIPTION_LABEL}</Label>
        <TextArea
          {...register(ROOM_FORM_FIELDS.DESCRIPTION)}
          placeholder={texts.FORM.DESCRIPTION_PLACEHOLDER}
          className={s.input}
        />
        <FieldError>{getErrorMessage(errors.description?.message)}</FieldError>
      </TextField>

      <div className="flex flex-col gap-4 mt-4">
        <Controller
          name={ROOM_FORM_FIELDS.IS_ACTIVE}
          control={control}
          render={({ field }) => (
            <div 
              className={`${s.switchCard} cursor-pointer transition-all duration-300 ${
                field.value ? "border-emerald-200" : "border-rose-200"
              }`}
              onClick={() => field.onChange(!field.value)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors duration-300 ${
                  field.value 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "bg-rose-100 text-rose-600"
                }`}>
                  <Activity size={20} />
                </div>
                <div className="flex flex-col">
                  <span className={s.switchLabel}>{texts.FORM.STATE_LABEL}</span>
                  <span className={`text-[12px] font-bold transition-colors duration-300 ${
                    field.value ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {field.value ? texts.FORM.STATE_ACTIVE : texts.FORM.STATE_INACTIVE}
                  </span>
                </div>
              </div>
              <Switch
                isSelected={field.value}
                onChange={field.onChange}
                aria-label={texts.FORM.STATE_LABEL}
              />
            </div>
          )}
        />

        <Controller
          name={ROOM_FORM_FIELDS.IS_PET_FRIENDLY}
          control={control}
          render={({ field }) => (
            <div 
              className={`${s.switchCard} cursor-pointer transition-all duration-300 ${
                field.value ? "border-emerald-200" : "border-rose-200"
              }`}
              onClick={() => field.onChange(!field.value)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors duration-300 ${
                  field.value 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "bg-rose-100 text-rose-600"
                }`}>
                  <PawPrint size={20} />
                </div>
                <div className="flex flex-col">
                  <span className={s.switchLabel}>{texts.FORM.PETS_LABEL}</span>
                  <span className={`text-[12px] font-bold transition-colors duration-300 ${
                    field.value ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {field.value ? texts.FORM.PETS_ALLOWED : texts.FORM.PETS_NOT_ALLOWED}
                  </span>
                </div>
              </div>
              <Switch
                isSelected={field.value}
                onChange={field.onChange}
                aria-label={texts.FORM.PETS_LABEL}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};
