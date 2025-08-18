'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SectionTitle from '@/components/Sections/SectionTitle';
import Image from 'next/image';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { HERO_SLUGS } from '@/constants';

export default function AboutPage() {
	const trpc = useTRPC();

	// Fetch first about image
	const { data: firstImageData } = useSuspenseQuery(
		trpc.layout.getHero.queryOptions({
			slug: HERO_SLUGS.aboutFirst,
		})
	);

	// Fetch second about image
	const { data: secondImageData } = useSuspenseQuery(
		trpc.layout.getHero.queryOptions({
			slug: HERO_SLUGS.aboutSecond,
		})
	);

	const firstImageUrl =
		firstImageData?.docs?.heroLarge?.url || firstImageData?.docs?.hero?.url;
	const secondImageUrl =
		secondImageData?.docs?.heroLarge?.url ||
		secondImageData?.docs?.hero?.url;   

	return (
		<MaxWidthWrapper className='flex flex-col gap-5 md:gap-0'>
			<>
				<SectionTitle title='About Us' />
				<div className='w-full flex flex-col-reverse gap-10 md:gap-0 md:flex-row'>
					<div className='flex-1 relative aspect-square'>
						<Image
							className='object-cover'
							src={firstImageUrl || '/images/about1.jpg'}
							fill
							alt={firstImageData?.docs?.hero?.alt || 'about'}
						/>
					</div>
					<div className='flex-1 flex flex-col gap-5 md:p-10 justify-center text-start'>
						<p className='text-xl font-bold'>
							Unleash Your Inner Deity with GreekGod.
						</p>
						<p className='text-xl'>
							At GreekGod, we&apos;re more than just a clothing
							brand; we&apos;re a movement dedicated to empowering
							you to express your authentic self. Just as the
							Greek gods and goddesses commanded their destinies,
							we want our clothing to inspire you to embrace your
							unique power and style.
						</p>
						<p className='text-xl'>
							Every stitch, every design, and every piece we
							create channels the strength, elegance, and
							confidence of ancient legends reimagined for the
							modern world. Whether you&apos;re conquering your
							day, making a statement, or rewriting your story,
							GreekGod is your armor. This isn&apos;t just
							fashion. It&apos;s mythology in motion. It&apos;s
							your era. Rule it.
						</p>
					</div>
				</div>
				<div className='w-full flex flex-col gap-10 md:gap-0 md:flex-row'>
					<div className='flex-1 flex flex-col gap-5 md:p-10 justify-center text-start'>
						<p className='text-xl'>
							At GreekGod, we&apos;re more than just a clothing
							brand; we&apos;re a movement dedicated to empowering
							you to express your authentic self. Just as the
							Greek gods and goddesses commanded their destinies,
							we want our clothing to inspire you to embrace your
							unique power and style.
						</p>
						<p className='text-xl'>
							From bold statements to timeless essentials, our
							designs are created to make you feel confident,
							strong, and undeniably divine.
						</p>
						<p className='text-xl font-bold'>
							Step into your greatness with GreekGod.
						</p>
					</div>
					<div className='flex-1 relative aspect-square'>
						<Image
							className='object-cover'
							src={secondImageUrl || '/images/about2.jpg'}
							fill
							alt={secondImageData?.docs?.hero?.alt || 'about'}
						/>
					</div>
				</div>
			</>
		</MaxWidthWrapper>
	);
}
