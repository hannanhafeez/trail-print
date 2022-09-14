import React, { FC, Fragment, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { Disclosure, Transition } from '@headlessui/react'

import css from './accordian.module.css';

import { useRouter } from 'next/router';

export type MyAccordianProps = {
    title: string, defaultOpen?: boolean, children?: React.ReactNode
}

const MyAccordian: FC<MyAccordianProps> = ({ title, defaultOpen, children }) => {
    return (
        <Disclosure as='div' defaultOpen={defaultOpen} className={'transition-all duration-500 border-b-[0.5px] border-b-[hsla(210,61%,34%,0.4)]'}>
            {({ open, }) => (
                <>
                    <Disclosure.Button as={Fragment}>
                        <button className='font-quicksand font-medium text-[22px] text-[#22588D] w-full flex items-center justify-between py-2 pr-4'>
                            {title}
                            <span className={"transition " + (open ? "" : 'rotate-180')}>
                                <svg width="12" height="8" viewBox="0 0 8 6" fill="currentColor">
                                    <path d="M0.352983 5.35397H7.64702C7.8658 5.35397 7.98796 5.12298 7.85247 4.96528L4.20545 0.73634C4.10106 0.615291 3.90005 0.615291 3.79455 0.73634L0.147532 4.96528C0.0120463 5.12298 0.134206 5.35397 0.352983 5.35397Z" />
                                </svg>
                            </span>
                        </button>
                    </Disclosure.Button>

                    {/*
            Use the `Transition` + `open` render prop argument to add transitions.
          */}
                    <Transition unmount={false}
                        show={open}
                        enter="transition-all duration-500 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition-all duration-250 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        {/*
              Don't forget to add `static` to your `Disclosure.Panel`!
            */}
                        <Disclosure.Panel static as={Fragment}>
                            {children}
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

export default MyAccordian;
