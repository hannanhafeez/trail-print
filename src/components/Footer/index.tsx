import React, { FC } from 'react'
import Image from 'next/image'

import css from './footer.module.css'
import Link from 'next/link'
import { ABOUT, CREATE, EVENTS, HELP } from '../../constants/pageLinks'

export type FooterProps = {
}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <footer className="bg-[#EBEBE6]">

            <div className={css.my_container}>

                <div className="flex flex-col md:flex-row justify-between pt-20 md:pt-32">

                    <div className="flex flex-col flex-1">

                        <p className="font-quicksand font-semibold text-[20px] text-theme_dark_blue md:text-[24px]">
                            If you have any questions, please get in touch 👍
                        </p>
                        <p className="font-mulish font-bold text-[20px] italic text-theme_dark_blue md:text-[24px]">
                            contact@trailprints.io
                        </p>

                        <div className="flex items-center gap-6 pt-16">
                            <div className={css.master_card}>
                                <Image alt='svg' src={'/assets/svg/Master.svg'} layout='fill' objectFit='contain'
                                />
                            </div>
                            <div className={css.visa_card}>
                                <Image alt='svg' src={'/assets/svg/Visa.svg'} layout='fill' objectFit='contain'

                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6 pb-20 pt-10">
                            <div className={css.master_card}>
                                <Image alt='svg' src={'/assets/svg/Strava.svg'} layout='fill' objectFit='contain'/>
                            </div>
                            <div className={css.visa_card}>
                                <Image alt='svg' src={'/assets/svg/map.svg'} layout='fill' objectFit='contain'/>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col  gap-5 flex-1  pb-8">
                        <div className="flex flex-col gap-3 font-mulish font-medium text-[20px] md:text-[24px] text-theme_green">
                            <Link href={CREATE}><a>Custom Prints</a></Link>
                            <Link href={EVENTS}><a>Events</a></Link>
                            <Link href={ABOUT}><a>About</a></Link>
                            <Link href={HELP}><a>Help</a></Link>
                        </div>

                        <div className="flex  gap-3 m-0 p-0">
                            <Link href="#">
                                <a className={css.social_img}>
                                    <Image alt='svg' src={'/assets/svg/Group.svg'} layout='fill' objectFit='contain'/>
                                </a>
                            </Link>
                            <Link href="#">
                                <a className={css.social_img}>
                                    <Image alt='svg' src={'/assets/svg/facebook.svg'} layout='fill' objectFit='contain'/>
                                </a>
                            </Link>
                            <Link href="#">
                                <a className={css.social_img}>
                                    <Image alt='svg' src={'/assets/svg/twitter.svg'} layout='fill' objectFit='contain'/>
                                </a>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="pb-[30px] flex justify-center ">
                    <a  className='font-mulish text-[14px] md:text-[16px]text-[#848484] font-medium   text-[#848484]'>All content © Copyright 2022</a>
                </div>

            </div>

        </footer>
    )
}

export default Footer