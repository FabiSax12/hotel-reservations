"use client";

import { Button, Spinner } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import type { CheckInCheckOutFormProps } from "./CheckInCheckOut.interface";
import { CHECK_IN_CHECK_OUT_STYLES as STYLES } from "./CheckInCheckOut.styles";
import { useCheckInCheckOut } from "./hooks/useCheckInCheckOut";
import { TimeSlotSelector } from "./components/TimeSlotSelector";

export const CheckInCheckOutForm = ({ roomId, onSuccess }: CheckInCheckOutFormProps) => {
  const {
    selectedCheckIn,
    setSelectedCheckIn,
    selectedCheckOut,
    setSelectedCheckOut,
    isLoading,
    isSubmitting,
    error,
    texts,
    handleSubmit,
    checkInOptions,
    checkOutOptions,
  } = useCheckInCheckOut(roomId, onSuccess);

  if (isLoading) {
    return (
      <div className={STYLES.loadingContainer}>
        <Spinner color="success" size="lg" />
        <p className={STYLES.loadingText}>{texts.SCHEDULES?.LOADING}</p>
      </div>
    );
  }

  return (
    <div className={STYLES.container}>
      <header className={STYLES.header}>
        <h1 className={STYLES.title}>{texts.SCHEDULES?.TITLE}</h1>
        <p className={STYLES.subtitle}>{texts.SCHEDULES?.SUBTITLE}</p>
      </header>

      <div className={STYLES.formCard}>
        <div className={STYLES.grid}>
          {/* Check-in Selector Section */}
          <TimeSlotSelector
            label={texts.SCHEDULES?.CHECK_IN_LABEL}
            placeholder={texts.SCHEDULES?.CHECK_IN_PLACEHOLDER}
            rangeHint={texts.SCHEDULES?.CHECK_IN_RANGE_HINT}
            icon={<LucideIcons.LogIn size={20} />}
            selectedTimes={selectedCheckIn}
            onChange={setSelectedCheckIn}
            options={checkInOptions}
            emptySelectionText={texts.SCHEDULES?.EMPTY_SELECTION}
          />

          {/* Check-out Selector Section */}
          <TimeSlotSelector
            label={texts.SCHEDULES?.CHECK_OUT_LABEL}
            placeholder={texts.SCHEDULES?.CHECK_OUT_PLACEHOLDER}
            rangeHint={texts.SCHEDULES?.CHECK_OUT_RANGE_HINT}
            icon={<LucideIcons.LogOut size={20} />}
            selectedTimes={selectedCheckOut}
            onChange={setSelectedCheckOut}
            options={checkOutOptions}
            emptySelectionText={texts.SCHEDULES?.EMPTY_SELECTION}
          />
        </div>

        {/* Hint Section */}
        <div className={STYLES.hintBox}>
          <LucideIcons.Info className={STYLES.hintIcon} size={18} />
          <p>{texts.SCHEDULES?.HINT}</p>
        </div>

        {error && <p className={STYLES.errorText}>{error}</p>}
      </div>

      <div className={STYLES.actions}>
        <Button className={STYLES.cancelButton} onPress={() => window.history.back()}>
          {texts.SCHEDULES?.CANCEL}
        </Button>
        <Button
          className={STYLES.submitButton}
          onPress={() => handleSubmit()}
          isPending={isSubmitting}
          isDisabled={selectedCheckIn.length === 0 && selectedCheckOut.length === 0}
        >
          {texts.SCHEDULES?.SUBMIT}
        </Button>
      </div>
    </div>
  );
};
