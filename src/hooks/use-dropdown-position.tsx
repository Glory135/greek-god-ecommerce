import { RefObject } from 'react'

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLElement>,
  dropDownWidth?: number
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 }

    const rect = ref.current.getBoundingClientRect()
    const dropWidth = dropDownWidth || 240; // width od dropdown

    // calc initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom - 85;

    // chek if dropdown would go off the right edge of the viewport
    if (left + dropWidth > window.innerWidth) {
      // align right edge of button instead
      left = rect.right + window.scrollX - dropWidth

      //  if still off screen, align to the right edge of viewport with small padding
      if (left < 0) {
        left = window.innerWidth - dropWidth - 16;
      }
    }

    // ensure dropdown does not go off left edge
    if (left < 0) {
      left = 16
    }

    return { top, left }
  }
  return { getDropdownPosition }
}

