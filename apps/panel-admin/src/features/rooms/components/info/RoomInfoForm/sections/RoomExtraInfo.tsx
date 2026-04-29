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

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Controller
          name={ROOM_FORM_FIELDS.IS_ACTIVE}
          control={control}
          render={({ field }) => (
            <div 
              className={`${s.switchCard} cursor-pointer transition-all duration-300 ${
                field.value ? "border-emerald-200" : "border-rose-200"
              } flex-col !items-start gap-3 p-4`}
              onClick={() => field.onChange(!field.value)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`p-2 rounded-xl transition-colors duration-300 ${
                  field.value ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                }`}>
                  <Activity size={16} />
                </div>
                <div className="flex flex-col">
                  <span className={s.switchLabel}>Activo</span>
                  <span className={`text-[11px] font-black tracking-wider ${
                    field.value ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {field.value ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
              <div className="mt-auto w-full flex justify-end">
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  aria-label={texts.FORM.STATE_LABEL}
                />
              </div>
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
              } flex-col !items-start gap-3 p-4`}
              onClick={() => field.onChange(!field.value)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`p-2 rounded-xl transition-colors duration-300 ${
                  field.value ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                }`}>
                  <PawPrint size={16} />
                </div>
                <div className="flex flex-col">
                  <span className={s.switchLabel}>Mascotas</span>
                  <span className={`text-[11px] font-black tracking-wider ${
                    field.value ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {field.value ? "Permitidas" : "Prohibidas"}
                  </span>
                </div>
              </div>
              <div className="mt-auto w-full flex justify-end">
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  aria-label={texts.FORM.PETS_LABEL}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
