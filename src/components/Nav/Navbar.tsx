"use client"

import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Link from 'next/link';
import NavItems from './NavItems';
import { Button, buttonVariants } from '../ui/button';
import Cart from '../Cart';
import { LogoFull, LogoIcon } from '../Logo';
import { Heart, Menu, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import MobileNav from './MobileNav';

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const pathname = usePathname();

	useEffect(() => {
		setMobileMenuOpen(false)
	}, [pathname]);

	return (
		<div className='w-full sticky z-50 top-0 inset-x-0'>
			<header className={cn(
				'w-full relative bg-background',
			)}>
				<MaxWidthWrapper>
					<div className='w-full flex items-center justify-between gap-5 py-3 shadow-sm border-b border-gray-600/50'>
						{/* Mobile Nav */}
						<div className='flex gap-2 lg:hidden items-center'>
							<Button onClick={() => setMobileMenuOpen(prev => !prev)} variant={"ghost"} size={"sm"}>
								<MobileNav />
							</Button>
							<Link
								href={'/search'}
								className={buttonVariants({
									variant: 'ghost',
									size: "sm"
								})}>
								<Search />
							</Link>
						</div>

						<LogoFull className='hidden md:block' />
						<LogoIcon className='block md:hidden' />

						{/* Mobile Nav */}
						<div className='flex gap-2 lg:hidden items-center'>
							<Link
								href={'/login'}
								className={buttonVariants({
									variant: 'ghost',
									size: "sm"
								})}>
								<User />
							</Link>
							<Cart />
						</div>

						{/* desktop navs start */}
						<div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
							<NavItems />
						</div>
						<div className='hidden lg:flex lg:items-center lg:justify-end'>
							<Link
								href={'/search'}
								className={buttonVariants({
									variant: 'ghost',
									size: "sm"
								})}>
								<Search />
							</Link>
							<span className='h-6 w-px bg-gray-200' />
							<Link
								href={'/login'}
								className={buttonVariants({
									variant: 'ghost',
									size: "sm"
								})}>
								<User />
							</Link>
							<span className='h-6 w-px bg-gray-200' />
							<Link
								href={'/favourite'}
								className={buttonVariants({
									variant: 'ghost',
									size: "sm"
								})}>
								<Heart />
							</Link>
							<span className='h-6 w-px bg-gray-200' />
							<div className='ml-4 flow-root lg:ml-6'>
								<Cart />
							</div>
						</div>
						{/* Desktop navs end */}

					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
}
