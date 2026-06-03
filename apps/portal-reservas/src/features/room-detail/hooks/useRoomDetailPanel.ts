/**
 * @file useRoomDetailPanel.ts — Shell behaviour for the room detail panel.
 *
 * Encapsulates the slide-in transition, focus management, mobile scroll lock,
 * and Escape-to-close so the panel component stays presentational. Returns the
 * `entered` flag, the panel ref to attach, and whether the viewport is the
 * mobile (modal) size.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { DOM_EVENTS, KEYBOARD_KEYS } from "@/constants/dom-events.constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { ROOM_DETAIL_MOBILE_QUERY } from "../constants/room-detail.constants";
import type { UseRoomDetailPanelOptions } from "../domain/types";

export function useRoomDetailPanel({ isOpen, onClose }: UseRoomDetailPanelOptions) {
  const [entered, setEntered] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery(ROOM_DETAIL_MOBILE_QUERY);

  // Lock body scroll only on mobile, where the panel is a modal sheet.
  useScrollLock(isOpen && isMobile);

  // Trigger the slide-in on the frame after mount.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Move focus into the panel once it has entered.
  useEffect(() => {
    if (entered) asideRef.current?.focus();
  }, [entered]);

  // Close on Escape.
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === KEYBOARD_KEYS.ESCAPE) onClose();
    };
    window.addEventListener(DOM_EVENTS.KEYDOWN, handleKey);
    return () => window.removeEventListener(DOM_EVENTS.KEYDOWN, handleKey);
  }, [onClose]);

  return { entered, asideRef, isMobile };
}
