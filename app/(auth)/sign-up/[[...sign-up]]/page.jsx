import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center md:flex-row">
      <SignUp />
      <Image
      className='hidden w-1/2 p-10 md:block'
      src="/sign-up.svg"
      width={500}
      height={500}
      alt="Picture of sign-up"
    />
    </div>
  )
}

export default SignUpPage;