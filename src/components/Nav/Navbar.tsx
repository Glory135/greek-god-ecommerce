"use client"

import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Link from 'next/link';
import NavItems from './NavItems';
import { buttonVariants } from '../ui/button';
import Cart from '../Cart';
import { LogoFull, LogoIcon } from '../Logo';
import { Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileNav from './MobileNav';
import SearchComponent from '../Filter/SearchComponent';
import SearchBtn from '../mini-client-fixes/SearchBtn';
import { PAGES_LINKS } from '@/utils/linksData';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';


export default function Navbar() {
	const trpc = useTRPC()
	const session = useQuery(trpc.auth.session.queryOptions())

	return (
		<div className='w-full sticky z-50 top-0 inset-x-0'>
			<header className={cn(
				'w-full relative z-50 bg-background',
			)}>
				<MaxWidthWrapper className='relative z-50 bg-background shadow-primary/10 shadow-sm'>
					<div className='w-full flex items-center justify-between gap-5 py-3'>
						{/* Mobile Nav */}
						<div className='flex gap-2 lg:hidden items-center'>
							<MobileNav />
							<SearchBtn />
						</div>

						<LogoFull className='hidden md:block' />
						<LogoIcon className='block md:hidden' />

						{/* Mobile Nav */}
						<div className='flex gap-2 lg:hidden items-center'>
							<Link
								href={session?.data?.user ? PAGES_LINKS.account.link : PAGES_LINKS.login.link}
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
							<SearchBtn />
							<span className='h-6 w-px bg-gray-200' />
							<Link
								href={session?.data?.user ? PAGES_LINKS.account.link : PAGES_LINKS.login.link}
								className={buttonVariants({
									variant: 'ghost',
									size: "sm"
								})}>
								<User />
							</Link>
							{
								session?.data?.user && (
									<>
										<span className='h-6 w-px bg-gray-200' />
										<Link
											href={'/favourite'}
											className={buttonVariants({
												variant: 'ghost',
												size: "sm"
											})}>
											<Heart />
										</Link>
									</>
								)
							}

							<span className='h-6 w-px bg-gray-200' />
							<div className='ml-4 flow-root lg:ml-6'>
								<Cart />
							</div>
						</div>
						{/* Desktop navs end */}
					</div>
				</MaxWidthWrapper>

				{/* Search component */}
				<SearchComponent />
			</header>
		</div>
	);
}
