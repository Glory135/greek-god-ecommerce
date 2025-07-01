'use client';

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { PAGES_LINKS } from '@/utils/linksData';
import { FaShoppingBag } from 'react-icons/fa';

export default function Cart() {
	const itemCount = 0;
	const fee = "10";
    
	return (
		<Sheet>
			<SheetTrigger className='group -m-2 flex items-center p-2'>
				<FaShoppingBag
					aria-hidden='true'
					className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
				/>
				<span className='ml-2 text-sm font-medium text-greek group-hover:text-greek/70'>
					{itemCount}
				</span>
			</SheetTrigger>
			<SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
				<SheetHeader className='space-y-2.5 pr-6'>
					<SheetTitle>Bag ({itemCount})</SheetTitle>
				</SheetHeader>
				{itemCount > 0 ? (
					<>
						<div className='flex w-full flex-col pr-6'>
							{/* Toto: cart login */}
							Bag items
						</div>
						<div className='space-y-4 pr-6'>
							<Separator />
							<div className='space-y-1.5 text-sm'>
								<div className='flex'>
									<span className='flex-1'>Shipping</span>
									<span className=''>Free</span>
								</div>
								<div className='flex'>
									<span className='flex-1'>
										Transaction Fee
									</span>
									<span>{formatPrice(fee)}</span>
								</div>
								<div className='flex'>
									<span className='flex-1'>Total</span>
									<span>{formatPrice(fee)}</span>
								</div>
							</div>
							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href='/merch'
										className={buttonVariants({
											className: 'w-full',
										})}>
										Continue to checkout
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className='flex h-full flex-col items-center justify-center space-y-1'>
						<div
							className='relative md=-4 h-60 w-60 text-muted-foreground'
							aria-hidden='true'>
							<Image
								src={'/images/emptybag.png'}
								fill
								alt='Empty cart'
							/>
						</div>
						<div className='text-sm text-gray-500'>
							No items in your bag
						</div>
						<div className='text-sm text-gray-700'>
							Start adding songs to your bag by visiting the
							products page.
						</div>
						<SheetTrigger asChild>
							<Link
								href={PAGES_LINKS.products.link}
								className={buttonVariants({
									variant: 'link',
									size: 'sm',
									className: 'text-sm text-muted-foreground',
								})}>
								Exploe Our Products
							</Link>
						</SheetTrigger>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
