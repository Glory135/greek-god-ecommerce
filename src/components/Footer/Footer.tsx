import React from 'react'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { FaInstagram, FaFacebook, FaPinterest, FaTiktok } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

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
                <FaInstagram size={25} />
                <FaFacebook size={25} />
                <FaPinterest size={25} />
                <FaTiktok size={25} />
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
                  <Link href={"#"}>Collection</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Trending</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Privacy Policy</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Support System</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Terms & Condition</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Copyright Notice</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className='font-bold text-base'>Help & Support</h4>
              <ul className='flex flex-col gap-3'>
                <li className='text-base'>
                  <Link href={"#"}>Orders & Shipping</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Returns & Refunds</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>FAQs</Link>
                </li>
                <li className='text-base'>
                  <Link href={"#"}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </>
        <Image className='absolute bottom-5 right-5 md:right-10 object-contain cursor-pointer hover:scale-105' width={50} height={50} alt='help' src="/icons/help.svg" />
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer