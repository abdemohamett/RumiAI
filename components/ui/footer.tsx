import React from 'react'
import { Button, buttonVariants } from './button'
import Link from 'next/link'
import { Badge } from './badge'

const Footer = () => {
  return (
        <div className="fixed bottom-10 px-4">
        <Link
        className='text-sm'
        href={"/"}
        // className={buttonVariants({
        //     variant: "secondary",
        //   })}
        >
         <Badge className='py-2' variant={'secondary'}>
            Rebuilded by Mett
         </Badge>
        </Link>
        </div>
  )
}

export default Footer