'use client';

import React from 'react';
import { NAV_ITEMS } from '@/config';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

type NavItem = (typeof NAV_ITEMS)[number];

interface INavItemProps {
	navItem: NavItem;
	handleOpen: () => void;
	isOpen: boolean;
	isAnyOpen: boolean;
}
export default function NavItem({
	navItem,
	handleOpen,
	isOpen,
	isAnyOpen,
}: INavItemProps) {
	return (
		<div className='flex'>
			<div className='flex relative items-center'>
				{
					!navItem.children && navItem.href ? (

						<Button
							asChild
							size={"sm"}
							onClick={handleOpen}
							variant={isOpen ? 'secondary' : 'ghost'}
							className='text-sm xl:text-base'
						>
							<Link href={navItem.href}>
								{navItem.label}
							</Link>
						</Button>

					) : (
						<Button
							size={"sm"}
							onClick={handleOpen}
							variant={isOpen ? 'secondary' : 'ghost'}
							className='gap-1.5 text-sm xl:text-base'>
							{navItem.label}
							{
								navItem.children && (
									<ChevronDown
										className={cn(
											'h-4 w-4 transition-all text-muted-foreground',
											{
												'-rotate-180': isOpen,
											}
										)}
									/>
								)
							}
						</Button>
					)
				}
			</div>
			{isOpen && (
				<div
					className={cn(
						'absolute inset-x-0 top-full text-sm text-muted-foreground',
						{
							'animate-in fade-in-10 slide-in-from-top-5':
								!isAnyOpen,
						}
					)}>
					<div
						className='absolute inset-0 top-1/2 shadow'
						aria-hidden='true'
					/>
					<div className='relative bg-background py-16 h-[600px] shadow-md border-b border-gray-600/50 '>
						<div className='mx-auto max-w-7xl h-full px-8 flex justify-between'>

							<div className="flex-1 flex gap-20">
								{/* @ts-expect-error it will just happen */}
								{Object.entries(navItem?.children?.links).map(([key, value]) => (
									<div key={key} className="flex flex-col gap-5 capitalize">
										<h4 className='font-bold text-lg'>
											{key}
										</h4>
										<div className="flex flex-col gap-2">
											{
												value.map((itm) => (
													<Link key={itm.id} href={itm.href} className='hover:underline'>
														{itm.label}
													</Link>
												))
											}
										</div>
									</div>
								))}
							</div>

							<div className='flex-1 h-full flex gap-2 gap-x-3'>
								{navItem.children?.featured.slice(0, 3).map((item) => (
									<div
										className='flex-1 h-full flex flex-col group relative text-base sm:text-sm'
										key={item.id}>
										<div className='relative h-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
											<Image
												src={item.imageSrc}
												fill
												alt='song'
												className='object-cover object-center'
											/>
										</div>
										<Link
											href={item.href}
											className='mt-6 block font-medium text-primary hover:underline'>
											{item.label}
										</Link>
										<p
											className='mt-1'
											aria-hidden='true'>
											Buy now
										</p>
									</div>
								))}
							</div>

						</div>
					</div>
				</div>
			)}
		</div>
	);
}
