import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useClickOutsideElement = <T extends HTMLElement = HTMLElement>(
  inputMinPriceRef: RefObject<T>,
  inputMaxPriceRef: RefObject<T>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {

    const handleInputMinPriceRefClick = (evt: Event) => {
      const el = inputMinPriceRef?.current;
      const target = evt.target as HTMLElement;

      if (
        !el || el.contains((evt?.target as Node) || null) || evt?.target === inputMaxPriceRef.current) {
        evt.stopPropagation();
        return;
      }
      if (target.id === 'reset-button'
      ) {
        evt.stopPropagation();
        return;
      }
      if (target.matches('.custom-checkbox__label')
      ) {
        evt.stopPropagation();
        return;
      }
      handler(evt);
    };

    const handleInputMaxPriceRefClick = (evt: Event) => {
      const el = inputMaxPriceRef?.current;
      const target = evt.target as HTMLElement;

      if (!el || el.contains((evt?.target as Node) || null) || evt?.target === inputMinPriceRef.current) {
        evt.stopPropagation();
        return;
      }
      if ((target.id === 'reset-button'
      )) {
        evt.stopPropagation();
        return;
      }
      if (target.matches('.checkbox_filter')
      ) {
        evt.stopPropagation();
        return;
      }
      handler(evt);
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
