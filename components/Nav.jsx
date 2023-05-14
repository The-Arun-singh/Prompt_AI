"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from "next-auth/react";
import { useRouter } from 'next/navigation';

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [ Providers, setProviders ] = useState(null);
  const [ toggleDropdown, setToggleDropdown ] = useState(false);
  
  useEffect(() => {

    const setUpProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    setUpProviders();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/promptai-logo.png" 
          alt="Promptopia Logo"
          width={50}
          height={50}
          loading='lazy'
          className="object-contain"
        />
        <p className="logo_text">PromptAi</p>
      </Link>

    {/* Desktop Nav  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>

            <button type="button" onClick={() => signOut({ callbackUrl: 'https://arun-promptai.netlify.app'})} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
                src= {session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {
              Providers && Object.values(Providers).map((provider) => (
                <button 
                  type='button'
                  key = {provider.name}
                  className="black_btn" 
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className='flex'>
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((curr) => !curr ) }
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button 
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: 'https://arun-promptai.netlify.app'});
                  }}
                  className='mt-5 w-full black_btn' 
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
              Providers && Object.values(Providers).map((provider) => (
                <button 
                  type='button'
                  key = {provider.name} 
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav