
import React, { FC, Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SETTINGS } from "../../constants/pageLinks";
import css from "./help.module.css";
import Image from "next/image";


const Help: FC = () => {
	return (
		<div className="relative">
			{/* Header */}
			<div className={`${css.header_shadow} z-20 bg-white`}>
				<div className={`${css.my_container}`}>

					<div className="flex flex-1 justify-between items-center h-[85px] px-4">
						<div className={css.logo_style}>
							<Image alt='ben' src={'/assets/imgs/logo.png'} layout='fill' objectFit='cover' />
						</div>
						<div className={css.nav_links}>
							<a>CUSTOM PRINTS</a>
							<a>EVENTS</a>
							<a>HELP</a>
						</div>
					</div>
				</div>
			</div>
			{/* Header End */}

			<div className={css.img}>
				<Image alt='ben' src={'/assets/imgs/Mask.png'} layout='fill' objectFit='cover'
					className="s"
				/>
			</div>

			<div className="hidden sm:block w-full h-[200px]">

			</div>

			<section className={`${css.my_container} flex flex-col z-10`}>


				<h1 className=" flex flex-1 justify-center text-center font-mulish font-bold text-[40px]  text-[#22588D] py-[50px] ">About Trail Prints</h1>

			

				<div className={css.content}>
					<div className={css.content_wrapper}>
							<p className={css.question}>Where is my print?</p>
							<div className="flex-[2] ">
							<p className={css.ans}>It can take up to 48 hours/2 days for maps to be processed, printed and shipped. Delivery times after that depend on country… 
							see   
							<span className="underline underline-offset-1 italic text-theme_green"> estimated times below</span>
							.</p>
							<p className={`${css.ans_two_style} text-[#A0A0A0]`}>👉 Please note: shipping times exclude customs delays as these are unfortunately out of our control.
							</p>
						</div>
					</div>

					<div className={`${css.content_wrapper} bg-[rgba(195,192,171,0.1)]`}>
						
							<p className={css.question}>Do you offer tracking?</p>
							<div className="flex-[2] ">
							<p className={css.ans}>We don’t yet offer tracking due to keeping the overall cost down, which is why shipping is included in the price of your print. Though, we’re looking into providing more shipping options in future.   
							</p>
							
						</div>
					</div>

					<div className={css.content_wrapper}>
							<p className={css.question}>Where do you ship to?</p>
							<div className="flex-[2] ">
							<p className={css.ans}>We currently ship to the 20 countries
							<span className="underline underline-offset-1 italic text-theme_green"> listed below.</span>
							</p>
						</div>
					</div>

					<div className={`${css.content_wrapper} bg-[rgba(195,192,171,0.1)]`}>
						
							<p className={css.question}>How much is shipping?</p>
							<div className="flex-[2] ">
							<p className={css.ans}>
								Shipping is free, no matter where you are! 🤸
							</p>
							
						</div>
					</div>

					<div className={css.content_wrapper}>
							<p className={css.question}>What paper do you use?</p>
							<div className="flex-[2] ">
							<p className={css.ans}>
								We use 200gsm Enhanced Matte Art paper, which is a premium, heavyweight and slightly textured fine art paper with a smooth, clean finish.
							</p>
						</div>
					</div>

				</div>
			</section>

			<section className={`${css.my_container} mb-[100px]`}>

			<div className="flex flex-col gap-10 items-center px-1">
				
				<h1 className="font-mulish font-bold text-[26px] md:text-[40px] text-[#22588D]  ">
				Cherish your own adventure, from $15.
				</h1>

				<button className="font-quicksand font-semibold text-[20px] md:text-[26px] text-white bg-theme_green w-full md:w-auto py-3 md:px-10 md:py-6">Lets get started!</button>

			</div>

			</section>

			{/* footer */}

			<section className="bg-[#EBEBE6]">

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

			</section>

				{/* footer */}

		</div>

	);
};;

export default Help;

