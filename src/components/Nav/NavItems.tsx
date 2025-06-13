'use client';

import { NAV_ITEMS } from '@/config';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOtside } from '@/hooks/use-on-click-outside';

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveIndex(null);
			}
		};
		document.addEventListener('keydown', handler);
		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, []);

	const isAnyOpen = activeIndex !== null;

	const navRef = useRef<HTMLDivElement | null>(null);
	useOnClickOtside(navRef, () => setActiveIndex(null));

	return (
		<div className='flex gap-4 h-full' ref={navRef}>
			{NAV_ITEMS.map((navItem, index) => {

				const handleOpen = () => {
					if (!navItem.children) {
						setActiveIndex(null);
						return null
					}
					if (activeIndex === index) {
						setActiveIndex(null);
					} else {
						setActiveIndex(index);
					}
				};
				const isOpen = index === activeIndex;

				return (
					<NavItem
						navItem={navItem}
						isOpen={isOpen}
						handleOpen={handleOpen}
						key={navItem.value}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
}
