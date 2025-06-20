'use client';

import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOtside } from '@/hooks/use-on-click-outside';
import useDashboardStore from '@/zustand/DashboardStore';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { INavItem } from './types';
import { usePathname } from 'next/navigation';

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const { setSearchOpen } = useDashboardStore((state => state))
	const pathname = usePathname()

	// Fetch navigation data dynamically
	const trpc = useTRPC();
	const { data: navItems, isLoading } = useQuery(trpc.layout.getNavigationData.queryOptions());

	useEffect(()=>{
		setActiveIndex(null);
		setSearchOpen(false)
	}, [pathname])

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

	// Show loading state if data is not available
	if (isLoading || !navItems) {
		return (
			<div className='flex gap-4'>
				{/* Loading skeleton */}
				{Array.from({ length: 5 }).map((_, index) => (
					<div key={index} className="h-8 w-20 bg-gray-200 animate-pulse rounded" />
				))}
			</div>
		);
	}

	return (
		<div className='flex gap-4 h-full' ref={navRef}>
			{navItems.map((navItem: INavItem, index) => {
				const handleOpen = () => {
					if (!navItem?.children) {
						setActiveIndex(null);
						return null
					}
					if (activeIndex === index) {
						setActiveIndex(null);
					} else {
						setActiveIndex(index);
						setSearchOpen(false)
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
