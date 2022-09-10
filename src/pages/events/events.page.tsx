
import React, { FC, } from "react";

import css from "./events.module.css";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";


const Events: FC = () => {
	return (
		<div className="relative">
			{/* Header */}
			<Header/>
			{/* Header End */}

			<div className={css.img}>
				<Image alt='ben' src={'/assets/imgs/Mask.png'} layout='fill' objectFit='cover'
					
				/>
			</div>

			<div className="hidden sm:block w-full h-[200px]">

			</div>

			<section className={`${css.my_container} flex flex-col z-10`}>


				<h1 className=" flex flex-1 justify-center text-center font-mulish font-bold text-[72px]  text-[#22588D] pt-[50px] ">Events</h1>

				<h2 className=" flex flex-1 justify-center text-center font-mulish font-medium text-[30px]  text-[#22588D] pb-[50px]">
				Select your event organiser to get started
				</h2>

			</section>

			<div className={`${css.my_container}`}>
			
			<section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-20 md:gap-x-8 pb-[60px] md:pb-[120px]">
			
				<div className={css.wrapper}>
					<div className={css.image_container}>
						
							<div className={css.country_image}>
								<Image alt='lendon' src={'/assets/png/ph.png'} layout='fill' objectFit='cover'/>
							</div>
					</div>
						<h1 className={css.font_wrapper}>Great British Divide</h1>
				</div>
				<div className={css.wrapper}>
					<div className={css.image_container}>
						
							<div className={css.country_image}>
								<Image alt='lendon' src={'/assets/png/ph.png'} layout='fill' objectFit='cover'/>
							</div>
					</div>
						<h1 className={css.font_wrapper}>Great British Divide</h1>
				</div>
				<div className={css.wrapper}>
					<div className={css.image_container}>
						
							<div className={css.country_image}>
								<Image alt='lendon' src={'/assets/png/ph.png'} layout='fill' objectFit='cover'/>
							</div>
					</div>
						<h1 className={css.font_wrapper}>Great British Divide</h1>
				</div>
				<div className={css.wrapper}>
					<div className={css.image_container}>
						
							<div className={css.country_image}>
								<Image alt='lendon' src={'/assets/png/ph.png'} layout='fill' objectFit='cover'/>
							</div>
					</div>
						<h1 className={css.font_wrapper}>Great British Divide</h1>
				</div>
				<div className="flex flex-col items-center gap-[30px]">
					<div className={css.image_container}>
						
							<div className={css.country_image}>
								<Image alt='lendon' src={'/assets/svg/dots.svg'} layout='fill' objectFit='cover'/>
							</div>
					</div>
						<h1 className={css.font_wrapper_soon}>Great British Divide</h1>
				</div>
				<div className="flex flex-col items-center gap-[30px]">
					<div className={css.image_container}>
						
							<div className={css.country_image}>
								<Image alt='lendon' src={'/assets/svg/dots.svg'} layout='fill' objectFit='cover'/>
							</div>
					</div>
						<h1 className= {css.font_wrapper_soon}>Great British Divide</h1>
				</div>
		

			
			</section>

			</div>
			<section className={`${css.my_container} mb-[100px]`}>

				<div className="flex flex-col gap-10 items-center px-1">

					<h1 className="font-mulish font-bold text-[26px] md:text-[40px] text-[#22588D]  ">
						Cherish your own adventure, from $15.
					</h1>

					<button className="font-quicksand font-semibold text-[20px] md:text-[26px] text-white bg-theme_green w-full md:w-auto py-3 md:px-10 md:py-6">Lets get started!</button>

				</div>

			</section>

			{/* footer */}

			<Footer/>

			{/* footer */}

		</div>

	);
};;

export default Events;

