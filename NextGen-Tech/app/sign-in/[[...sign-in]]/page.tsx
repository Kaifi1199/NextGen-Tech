import { SignIn } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function Page() {
  return <div className='sign-in-page'>
    <SignIn />
  </div>
}