import React from 'react'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { PAGES_LINKS } from '@/utils/linksData';
import { CONTACT_DETAILS, SOCIAL_LINKS } from '@/constants';

const Footer = () => {
  return (
    <footer className='w-full  pb-5 pt-10 md:py-10 bg-greek text-greek-foreground mt-10'>
      <MaxWidthWrapper className="relative flex flex-col-reverse md:flex-row justify-between gap-10 md:gap-20">
        <>
          <div className="flex-1 max-w-[500px] flex flex-col gap-10 lg:gap-32">
            <div className="w-full flex flex-col gap-3">
              <Input className='w-full' placeholder='Enter Your Email Address' />
              <div className="flex gap-2 items-center">
                <Checkbox />
                <p className='text-base'>
                  By Submittng your email, you agree to receive advertising emails from GreekGod.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-3">
                <Link href={SOCIAL_LINKS.instagram} target='__blank' className='w-fit' >
                  <FaInstagram size={25} />
                </Link>
                {/* <Link href={SOCIAL_LINKS.facebook} target='__blank' className='w-fit' >
                  <FaFacebook size={25} />
                </Link> */}
                <Link href={SOCIAL_LINKS.snapchat} target='__blank' className='w-fit' >
                  <FaSnapchat size={25} />
                </Link>
                {/* <Link href={SOCIAL_LINKS.pinterest} target='__blank' className='w-fit' >
                  <FaPinterest size={25} />
                </Link> */}
                <Link href={SOCIAL_LINKS.tiktok} target='__blank' className='w-fit' >
                  <FaTiktok size={25} />
                </Link>
              </div>
              <p className="text-sm">
                &copy; 2025 GreekGod. All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-[500px] flex gap-20 flex-wrap text-white">
            <div className="flex flex-col gap-5">
              <h4 className='font-bold text-base'>About GreekGod</h4>
              <ul className='flex flex-col gap-3'>
                <li className='text-base'>
                  <Link href={PAGES_LINKS.about.link}>About Us</Link>
                </li>
                <li className='text-base'>
                  <Link href={PAGES_LINKS.products.link}>Products</Link>
                </li>
                <li className='text-base'>
                  <Link href={PAGES_LINKS.collections.link}>Collections</Link>
                </li>
                <li className='text-base'>
                  <Link href={`${PAGES_LINKS.products.link}?sort=bestseller`}>Trending</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className='font-bold text-base'>Help & Support</h4>
              <ul className='flex flex-col gap-3'>
                <li className='text-base'>
                  <Link href={PAGES_LINKS.contact.link}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </>
        <Link target="__blank" href={`mailto:${CONTACT_DETAILS.support_email}`} className='absolute bottom-5 right-5 md:right-10'>
          <Image className='object-contain cursor-pointer hover:scale-105' width={50} height={50} alt='help' src="/icons/help.svg" /></Link>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer