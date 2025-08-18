'use client';

import { DEFAULT_LIMIT } from '@/constants';
import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { InboxIcon, RefreshCcw } from 'lucide-react';
import React from 'react';
import CollectionCard from './CollectionCard';
import CollectionsListSkeleton from './CollectionsListSkeleton';
import { Button } from '../ui/button';

const CollectionsList = () => {
	const trpc = useTRPC();
	const {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		isPending,
		isError,
	} = useSuspenseInfiniteQuery(
		trpc.collections.getMany.infiniteQueryOptions(
			{
				limit: DEFAULT_LIMIT,
			},
			{
				getNextPageParam: (lastPage) => {
					return lastPage.docs.length > 0
						? lastPage.nextPage
						: undefined;
				},
			}
		)
	);

	// Show skeleton while loading
	if (isPending) {
		return <CollectionsListSkeleton />;
	}

	// Show skeleton if there's an error (you might want to show an error message instead)
	if (isError) {
		return <CollectionsListSkeleton />;
	}

	if (data.pages?.[0]?.docs.length === 0) {
		return (
			<div className='border border-greek border-dashed flex items-center justify-center p-8 flex-col gap-y-5 bg-muted text-primary w-full h-[50vh] rounded-lg'>
				<InboxIcon />
				<p className='text-primary text-base font-medium'>
					No Collections Found!{' '}
				</p>
			</div>
		);
	}

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
				{data?.pages
					.flatMap((page) => page.docs)
					.map((collection) => {            
						return (
							<CollectionCard
								key={collection.id}
								slug={collection.slug}
								title={collection.title}
								description={collection?.description}
								heroimg={
									collection?.heroLarge?.url ||
									collection?.hero?.url
								}
							/>
						);
					})}
			</div>
			<div className='w-full flex justify-center pt-8'>
				{hasNextPage && (
					<Button
						disabled={isFetchingNextPage}
						// className=''
						variant='secondary'
						onClick={() => fetchNextPage()}>
						<RefreshCcw
							className={`${
								isFetchingNextPage && 'animate-spin'
							}`}
						/>
						Load More
					</Button>
				)}
			</div>
		</>
	);
};

export default CollectionsList;
