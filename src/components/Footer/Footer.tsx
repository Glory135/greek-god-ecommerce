import React from 'react'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { FaInstagram, FaFacebook, FaPinterest, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='w-full py-5 md:py-10 bg-greek text-greek-foreground mt-10'>
      <MaxWidthWrapper className="flex flex-col-reverse md:flex-row">
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
            <div className="flex flex-col gap-5">
              <div className="flex gap-2">
                <FaInstagram />
                <FaFacebook />
                <FaPinterest />
                <FaTiktok />
              </div>
              <p className="text-sm">
                &copy; 2025 GreekGod. All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="flex-1"></div>
        </>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer