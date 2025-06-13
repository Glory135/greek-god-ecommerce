'use client';

import { RefObject, useEffect } from 'react';

export const useOnClickOtside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	handler: (event: Event) => void
) => {
	// @ts-expect-error use effect error
	useEffect(() => {
		const listener = (event: Event) => {
			const el = ref?.current;
			if (!el || el.contains((event?.target as Node) || null)) {
				return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => [
			document.removeEventListener('mousedown', listener),
			document.removeEventListener('touchstart', listener), // Cleanup on unmount
		];
	}, [ref, handler]);
};
