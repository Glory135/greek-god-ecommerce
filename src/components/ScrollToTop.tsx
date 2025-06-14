"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // px

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]); // trigger only on path change

  return null;
};

export default ScrollToTop;
