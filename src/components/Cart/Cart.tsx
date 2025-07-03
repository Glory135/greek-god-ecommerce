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
import { PAGES_LINKS } from '@/utils/linksData';
import { FaShoppingBag } from 'react-icons/fa';
import useGetUser from '@/hooks/use-get-user';
import { useCart } from '@/zustand/checkout/hooks/use-cart';
import { ScrollArea } from '../ui/scroll-area';
import ProductInCart from './ProductInCart';
import { useState } from 'react';

export default function Cart() {
	const [cartOpen, setCartOpen] = useState(false)
	const user = useGetUser()
	const cart = useCart(user?.id || "")

	const itemCount = cart?.totalProductsInCart || 0;

	const closeCart = () => {
		setCartOpen(false)
	}

	return (
		<Sheet open={cartOpen} onOpenChange={setCartOpen}>
			<SheetTrigger className='group -m-2 flex items-center p-2'>
				<FaShoppingBag
					aria-hidden='true'
					className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
				/>
				<span className='ml-2 text-sm font-medium text-greek group-hover:text-greek/70'>
					{itemCount}
				</span>
			</SheetTrigger>
			<SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg p-5'>
				<SheetHeader className='space-y-2.5 pr-6'>
					<SheetTitle>Bag ({itemCount})</SheetTitle>
				</SheetHeader>
				{itemCount > 0 ? (
					<>
						<div className='flex w-full flex-col pr-6'>
							Bag items
						</div>
						<div className='space-y-4'>
							<Separator />
							<ScrollArea className='h-[65dvh] w-full pb-2 flex flex-col overflow-y-auto'>
								{
									cart.products.map(((prod) => (
										<ProductInCart key={prod.productId} product={prod} close={closeCart} />
									)))
								}
							</ScrollArea>
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
					<div className='flex h-full flex-col items-center justify-center space-y-1 text-center'>
						<div
							className='relative md=-4 h-60 w-60 text-muted-foreground'
							aria-hidden='true'>
							<Image
								src={'/images/emptybag.png'}
								fill
								alt='Empty cart'
							/>
						</div>
						<h4 className='text-base font-bold capitalize'>
							Your Bag Is empty.
						</h4>
						<p className='text-sm text-gray-700 capitalize'>
							discover GreekGod and add products to your Bag
						</p>
						<div className="flex flex-col gap-2">
							<SheetTrigger asChild>
								<Link
									href={PAGES_LINKS.products.link}
									className={buttonVariants({
										variant: 'link',
										size: 'sm',
									})}>
									Best Sellers
								</Link>
							</SheetTrigger>
							<SheetTrigger asChild>
								<Link
									href={PAGES_LINKS.collections.link}
									className={buttonVariants({
										variant: 'link',
										size: 'sm',
									})}>
									Collections
								</Link>
							</SheetTrigger>
							<SheetTrigger asChild>
								<Link
									href={PAGES_LINKS.products.link}
									className={buttonVariants({
										variant: 'link',
										size: 'sm',
									})}>
									Exploe Our Products
								</Link>
							</SheetTrigger>
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
