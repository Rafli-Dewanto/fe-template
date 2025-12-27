import { type RefObject, useEffect, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./use-iso-layout-fx";

/* =======================
   Overload signatures
   ======================= */

// MediaQueryList
export function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void;

// Window
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;

// HTMLElement / SVGElement
export function useEventListener<
  K extends keyof HTMLElementEventMap | keyof SVGElementEventMap,
  T extends Element,
>(
  eventName: K,
  handler: (event: Event) => void,
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void;

// Document
export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void;

/* =======================
   Implementation
   ======================= */

export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: RefObject<EventTarget>,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element?.current ?? window;

    if (!target || !("addEventListener" in target)) return;

    const listener = (event: Event) => {
      savedHandler.current(event);
    };

    target.addEventListener(eventName, listener, options);

    return () => {
      target.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
