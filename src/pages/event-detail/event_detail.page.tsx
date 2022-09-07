
import React, { FC, Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SETTINGS } from "../../constants/pageLinks";
import css from "./event_detail.module.css";
import Image from "next/image";
import Footer from "../../components/Footer";


const EventDetail: FC = () => {
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
							<a>EventDetail</a>
						</div>
					</div>
				</div>
			</div>
			{/* Header End */}

			<div className={css.img}>
				<Image alt='ben' src={'/assets/imgs/Mask.png'} layout='fill' objectFit='cover'
				/>
			</div>



			<section className={`${css.my_container} relative top-[-210px] flex flex-col z-10 mt-96 gap-10 pb-8 `}>

				<div className={css.img_center}>
					<Image alt='ben' src={'/assets/imgs/pan.png'} layout='fill' objectFit='contain' />
				</div>


				<h1 className="font-mulish font-medium text-[28px] md:text-[32px] text-center text-[#22588D]">
					Select your event to personalise your print
				</h1>

				<h1>Content will be filled later</h1>


				<div className="flex flex-col items-center gap-10 p-[10px] md:p-[50px] bg-[rgb(235,235,230,0.3)]">

					<h2 className="font-quicksand text-[#22588D] text-[22px]">The Pan Celtic is a self-supported, ultra-endurance bicycle ride, journeying through the Celtic Nations of Wales, Scotland, Ireland, Cornwall, the Isle of Man and Brittany. A different route each year tackling stunning terrain and landscapes steeped in Celtic tradition.</h2>

					<button className="font-quicksand font-semibold text-[20px] md:text-[22px] text-white bg-theme_dark_blue w-full md:w-auto py-3 md:px-10 md:py-6">
						pancelticrace.com
					</button>

				</div>

				<div className="flex flex-col gap-12 items-center px-2">

					<h1 className="font-mulish font-bold text-[26px] md:text-[40px] text-[#22588D]  ">
						Cherish your own adventure, from $15.
					</h1>

					<button className="font-quicksand font-semibold text-[20px] md:text-[22px] text-white bg-theme_green w-full md:w-auto py-3 md:px-10 md:py-6">Lets get started!</button>

				</div>



			</section>






			{/* footer */}
			<Footer/>
			{/* footer */}

		</div>

	);
};;

export default EventDetail;

