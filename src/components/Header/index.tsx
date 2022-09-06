import React, { FC, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { Transition } from '@headlessui/react'

import css from './header.module.css';

export type HeaderProps = {
    
}

const Header:FC<HeaderProps> = ({}) => {
    const [isShowing, setIsShowing] = useState(false)

    return (
        <header className={`${css.header_shadow} z-20 bg-white sticky top-0`}>
            <div className={[css.my_container, css.inner_container].join(' ')}>
                <div className={css.logo_style}>
                    <Image alt='ben' src={'/assets/imgs/logo.png'} layout='fill' objectFit='cover' />
                </div>
                <div className={css.nav_links}>
                    <NavLinks/>
                </div>
                <button className='sm:hidden px-2 text-theme_green' onClick={() => setIsShowing(old=>!old)}>
                    <svg width="28" height="26" viewBox="0 0 28 26">
                        <path d="M0.25 0.5H27.75V3H0.25V0.5ZM0.25 11.75H27.75V14.25H0.25V11.75ZM0.25 23H27.75V25.5H0.25V23Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
            
            {/* This `show` prop controls all nested `Transition.Child` components. */}
            <Transition show={isShowing} className="sm:hidden">
                {/* Background overlay */}
                <Transition.Child onClick={() => setIsShowing(old => !old)}
                    className="bg-[#00000066] z-[-1] absolute top-0 left-0 w-full h-screen"
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={''}></div>
                </Transition.Child>

                {/* Sliding sidebar */}
                <Transition.Child
                    className={[css.dd_container, 'z-10'].join(' ')}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-full"
                >
                    {/* ... */}
                    <div className={[css.my_container, css.nav_links_dd].join(' ')}>
                        <NavLinks/>
                    </div>
                    {/* <div className={css.dd_container}>
                    </div> */}
                </Transition.Child>
            </Transition>
        </header>
    )
}

export default Header

const NavLinks: FC = () =>{
    return(
        <>
            <Link href=''>
                <a>CUSTOM PRINTS</a>
            </Link>

            <Link href='/events'>
                <a>EVENTS</a>
            </Link>

            <Link href='/help'>
                <a>HELP</a>
            </Link>
        </>
    )
}