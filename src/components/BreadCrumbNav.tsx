"use client"

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';

const BreadCrumbNav = () => {
  const [crumbs, setCrumbs] = useState<string[]>([])
  const pathname = usePathname()

  useEffect(() => {
    setCrumbs(pathname.split("/"))
  }, [pathname])

  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null
  }
  return (
    <MaxWidthWrapper className='w-full flex flex-wrap gap-y-3 gap-x-5 items-center py-5'>
      <>
        <Link href={"/"} className="text-base font-light">Home</Link>
        {
          crumbs.map((crumb, idx) => {
            if (crumb !== "") {
              const href = '/' + crumbs.slice(1, idx + 1).join('/');
              return (
                <React.Fragment key={href} >
                  <span className="text-base font-light">/</span>
                  <Link className="text-base font-light" href={href}>{decodeURIComponent(crumb)}</Link>
                </React.Fragment>
              )
            }
          })
        }
      </>
    </MaxWidthWrapper>
  )
}

export default BreadCrumbNav