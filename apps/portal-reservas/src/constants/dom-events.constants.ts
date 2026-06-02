/**
 * @file dom-events.constants.ts — Shared DOM event names and keyboard keys.
 *
 * Centralizes the string literals passed to addEventListener / removeEventListener
 * and compared against `KeyboardEvent.key`, so they are never hardcoded in
 * component or hook logic.
 */

export const DOM_EVENTS = Object.freeze({
  CHANGE: "change",
  KEYDOWN: "keydown",
  MOUSEDOWN: "mousedown",
} as const);

export const KEYBOARD_KEYS = Object.freeze({
  ESCAPE: "Escape",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
} as const);
