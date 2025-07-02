"use client"

import useGetUser from '@/hooks/use-get-user'
import React, { isValidElement, cloneElement } from 'react'

type Props = {
  children: React.ReactElement
}

const NotLoggedInCatcher = ({ children }: Props) => {
  const user = useGetUser()
  const isLoggedIn = !!user

  const handleClick = (originalOnClick?: (e: any) => void) => (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      e.stopPropagation()

      // TODO display login modal
      console.log("login first!!")
      return
    }

    // Call original click handler if present
    originalOnClick?.(e)
  }

  if (!isValidElement(children)) {
    console.error("NotLoggedInCatcher expects a single React element as a child.")
    return null
  }

  // Type guard to ensure children has props and onClick
  type ChildWithOnClick = React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;

  return cloneElement(
    children as ChildWithOnClick,
    {
      onClick: handleClick(
        (children as ChildWithOnClick).props?.onClick
      ),
    }
  );
}

export default NotLoggedInCatcher
