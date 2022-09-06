
import React, { FC, Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SETTINGS } from "../../constants/pageLinks";
import css from "./about.module.css";
import Image from "next/image";


const AboutView: FC = () => {
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

			<div className={`${css.my_container} flex flex-col z-10`}>


				<h1 className=" flex flex-1 justify-center text-center font-mulish font-bold text-[40px]  text-[#22588D] py-[50px] ">About Trail Prints</h1>



				<div className={css.pargraph_style}>
					<p>In eget nunc facilisi sit eros vivamus at est. Tortor in donec magnis velit. Suspendisse magna justo, eleifend tortor aliquam. Tellus erat nam quis gravida lectus non. Habitant aenean euismod accumsan feugiat nulla velit vel. Duis velit ac elementum senectus posuere. Mollis enim fringilla ultrices vivamus eget neque sit aenean. Commodo eu et eu facilisi porttitor quis. Nisl, amet ipsum sollicitudin elit egestas massa hac.</p>


					<p>Volutpat vitae enim pellentesque lacinia massa iaculis in pulvinar odio. Et sed sagittis, habitasse morbi in purus. Nibh sollicitudin enim nisi, eleifend scelerisque enim augue. Ultricies a commodo proin pharetra feugiat imperdiet nisi aliquam ac. Felis, malesuada ligula ornare morbi. Semper parturient sit volutpat fringilla posuere est semper posuere. Porttitor curabitur cras ut at. Lacus sed a interdum mi, malesuada vitae lorem purus, pellentesque.</p>

				</div>
			</div>

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

export default AboutView;

