import React, { FC } from 'react'
import Image from 'next/image'

import css from './footer.module.css'

export type FooterProps = {
}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <footer className="bg-[#EBEBE6]">

            <div className={css.my_container}>

                <div className="flex flex-col md:flex-row justify-between pt-[144px]">

                    <div className="flex flex-col flex-1">

                        <p className="font-quicksand font-semibold text-[24px] text-theme_dark_blue">
                            If you have any questions, please get in touch 👍
                        </p>
                        <p className="font-mulish font-bold text-[21px] italic text-theme_dark_blue">
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
                                <Image alt='svg' src={'/assets/svg/Strava.svg'} layout='fill' objectFit='contain'
                                />
                            </div>
                            <div className={css.visa_card}>
                                <Image alt='svg' src={'/assets/svg/map.svg'} layout='fill' objectFit='contain'

                                />
                            </div>
                        </div>

                    </div>
                    <div className=" flex flex-col  gap-4 flex-1  pb-8">
                        <div className="font-mulish font-semibold text-[28px] text-theme_green">

                            <p>Custom Prints</p>
                            <p>Events</p>
                            <p>About</p>
                            <p>Help</p>
                        </div>

                        <div className="flex  gap-3 m-0 p-0">

                            <div className={css.social_img}>
                                <Image alt='svg' src={'/assets/svg/Group.svg'} layout='fill' objectFit='contain'
                                />
                            </div>
                            <div className={css.social_img}>
                                <Image alt='svg' src={'/assets/svg/facebook.svg'} layout='fill' objectFit='contain'

                                />
                            </div>
                            <div className={css.social_img}>
                                <Image alt='svg' src={'/assets/svg/twitter.svg'} layout='fill' objectFit='contain'

                                />
                            </div>

                        </div>


                    </div>

                </div>

                <div className="pb-[30px] flex flex-col gap-3 ">
                    <ul className="flex flex-col md:flex-row gap-2 font-mulish font-medium  text-14  text-[#848484]">
                        <li><a href="" className="underline underline-offset-4">Terms & Conditions </a></li>
                        <li><a href="" className="underline underline-offset-4">• Privacy Policy </a></li>
                        <li><a href="" className="underline underline-offset-4"> • Cookie Policy</a></li>
                        <li><a href="" className="underline underline-offset-4"> • Shipping</a></li>
                        <a href="" >  • All content © Copyright 2022</a>
                    </ul>
                    <div className="font-mulish font-medium  text-14  text-[#848484]">
                        <p>Created by <span>Adam Brewer </span> & <span>Jake Brewer</span></p>
                    </div>
                </div>

            </div>

        </footer>
    )
}

export default Footer