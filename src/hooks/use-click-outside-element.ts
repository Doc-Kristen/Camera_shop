import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useClickOutsideElement = <T extends HTMLElement = HTMLElement>(
  inputMinPriceRef: RefObject<T>,
  inputMaxPriceRef: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const handleInputMinPriceRefClick = (event: Event) => {
      const el = inputMinPriceRef?.current;

      if (
        !el || el.contains((event?.target as Node) || null) || event?.target === inputMaxPriceRef.current) {
        return;
      }
      handler(event);
    };

    const handleInputMaxPriceRefClick = (event: Event) => {
      const el = inputMaxPriceRef?.current;

      if (!el || el.contains((event?.target as Node) || null) || event?.target === inputMinPriceRef.current) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', handleInputMinPriceRefClick);
    document.addEventListener('touchstart', handleInputMinPriceRefClick);

    document.addEventListener('mousedown', handleInputMaxPriceRefClick);
    document.addEventListener('touchstart', handleInputMaxPriceRefClick);

    return () => {
      document.removeEventListener('mousedown', handleInputMinPriceRefClick);
      document.removeEventListener('touchstart', handleInputMinPriceRefClick);

      document.removeEventListener('mousedown', handleInputMaxPriceRefClick);
      document.removeEventListener('touchstart', handleInputMaxPriceRefClick);
    };
  }, [handler, inputMaxPriceRef, inputMinPriceRef]);
};
