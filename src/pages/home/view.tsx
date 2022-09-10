import React, { FC, Fragment, useRef, useState } from "react";

import css from "./home.module.css";

import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Section1Bg from "./components/Section1Bg";
import TestimonialSection from "./components/TestimonialSection";

const HomeView: FC = () => {
	return (
		<div>
			{/* Header */}
			<Header />
			{/* Header End */}

			<section className="relative min-h-[480px] sm:min-h-[660px] 2xl:min-h-[800px]">
				<Section1Bg/>
				<div className={css.section1_greenbg}></div>
				<div className="absolute inset-0">
					<div className={[css.my_container, css.text_container].join(' ')}>
						<div className={css.section1_greenbg_inner}>
							<h1>
								Print your “Trials” printed easier than ever
							</h1>
							
							<p>
								Custom prints of your adventures and events.
								Art prints to get you motivated.
								Running, cycling, hiking and more…
							</p>
						</div>
					</div>
				</div>
			</section>

			<div className="py-24 lg:pt-32 bg-[rgba(195,192,171,0.5)]">
				<div className={css.my_container}>
					<section className={css.content_parent_top}>
						<div className={css.left_content}>
							<h1>CUSTOM PRINTS</h1>
							<p>
								Choose a theme style and add your Strava/GPX data from an event or adventure onto a personalised print — from £15.
							</p>
							<button>Get started</button>
						</div>
						<div className={css.img_wrapper_top}>
							<div className={css.img_top}>
								<Image src={'/assets/png/trailtrack.png'} alt="globe" objectFit="contain" layout="fill" quality={100} />
							</div>

						</div>
					</section>
				</div>
			</div>

			<div className="relative pt-32 pb-20 bg-[#1E3561]">
				<svg className="absolute top-0 scale-[0.4] md:scale-75 left-[50%]  translate-x-[-50%] translate-y-[-50%]"  width="120" height="530" viewBox="0 0 120 513" fill="none">
					<defs>
						<marker id="circle" viewBox="0 0 10 10"
							refX="1" refY="5"
							markerUnits="strokeWidth"
							markerWidth="10" markerHeight="10"
							orient="auto">
							<svg width="9" height="9" viewBox="0 0 9 9" fill="none">
								<circle cx="4.32178" cy="4.19037" r="4" fill="#AFD130" />
							</svg>
						</marker>
					</defs>
					<path 
						stroke="#A0B454" strokeWidth="2" strokeDasharray="6 6"   markerStart='url(#circle)' markerEnd='url(#circle)'
						d="M65.2864 8.32483V42.6228C65.2864 94.0304 183.441 139.856 65.2864 199.451C-52.8678 259.045 23.4863 306.616 65.2864 322.952C176.448 366.396 63.0941 415.799 65.2864 474.663V504.272"
					/>
				</svg>


				<div className={css.my_container}>
					<div className="flex flex-col gap-16 bg-[#1E3561] py-[50px] md:py-[100px]">
						<section className={css.section_three}>
							<div className={css.wrapper}>
								<div className=" bg-white p-2 rounded-full">
									<div className="relative w-[200px] md:w-[200px] aspect-square">
										<Image src={'/assets/png/globe.png'} alt="globe" objectFit="contain" layout="fill" />
									</div>
								</div>
								<h1>Printed Locally</h1>
								<h2>
									Where possible, we use trusted printers closest to you, reducing carbon emissions.
								</h2>
							</div>
							<div className={css.wrapper}>
								<div className=" bg-white p-2 rounded-full">
									<div className="relative w-[200px] md:w-[200px] aspect-square">
										<Image src={'/assets/png/delivery.png'} alt="globe" objectFit="contain" layout="fill" />
									</div>
								</div>
								<h1>Free Shipping</h1>
								<h2>Available worldwide
									(due to local printing!)
								</h2>
							</div>
							<div className={css.wrapper}>
								<div className=" bg-white p-2 rounded-full">
									<div className="relative w-[200px] md:w-[200px] aspect-square">
										<Image src={'/assets/png/hglobe.png'} alt="globe" objectFit="contain" layout="fill" />
									</div>
								</div>
								<h1>Sustainable</h1>
								<h2>
									Water-based inks, sustainably sourced paper, plastic-free & vegan… smash!
								</h2>
							</div>

						</section>



						<section className={[css.content_parent_reverse, ''].join(' ')}>
							<div className={css.left_content}>
								<h1>EVENT ORGANIZERS</h1>
								<h2>
									We design bespoke, branded prints for your events and/or offer sponsor discounts for your participants.
								</h2>
								<button>Email Us</button>
							</div>
							<div className={css.img_wrapper_top}>
								<div className={css.img_top}>
									<Image src={'/assets/png/yourtrail.png'} alt="globe" objectFit="contain" layout="fill" />
								</div>

							</div>
						</section>

						<section className={[css.content_parent, ''].join(' ')}>
							<div className={css.left_content}>
								<h1>GIFT VOUCHERS</h1>
								<h2>
									The easiest way to gift a print to loved ones, which they can personalise.
								</h2>
								<h2>
									Get in touch to purchase and receive one to print and wrap.
								</h2>
								<button>Get started</button>
							</div>
							<div className={[css.img_wrapper, 'pb-4'].join(' ')}>
								<div className={[css.img, 'aspect-square'].join(' ')}>
									<Image src={'/assets/png/logomask.png'} alt="globe" objectFit="contain" layout="fill" quality={100}/>
								</div>
								<h2 className={css.vouch}>GIFT VOUCHERS</h2>
							</div>
						</section>

					</div>
				</div>
			</div>

			<div className="bg-[rgb(195,192,171,50%)] py-16 md:py-36">

				<div className={css.my_container}>
					<h1 className="mb-12 text-center font-mulish font-semibold text-[42px] text-theme_dark_green">TESTIMONIALS</h1>
					
					<TestimonialSection/>

					<section className={css.track_wrapper}>
						<div className={css.track}>
							<div className="w-full">
								<div className="mx-auto relative w-full max-w-[600px] h-auto aspect-video">
									<Image src={'/assets/png/bicycle.png'} alt="globe" objectFit="contain" layout="fill" />
								</div>
							</div>

							<span>
								Trail Pirnts is a family run (ha!) business.
								<br/>
								We’re runners, cyclists and only sell products we’d buy ourselves.
							</span>
						</div>

					</section>
				</div>
			</div>

			<section className="bg-[#162646] py-12 ">
				<div className={css.my_container}>

					<div className={css.testomonial_wrapper}>

						<h1 className={css.testomonial_heading}>OUR CLIENTS</h1>

						<div className={css.testomonial_img}>

							<div className={css.img_style}>
								<Image src={'/assets/png/gravel.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>

							<div className={css.img_style}>
								<Image src={'/assets/png/rhino.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>

							<div className={css.img_style}>
								<Image src={'/assets/png/pan2.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>

							<div className={css.img_style}>
								<Image src={'/assets/png/tribe.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>
							<div className={css.img_style}>
								<Image src={'/assets/png/peaks.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>
							<div className={css.img_style}>
								<Image src={'/assets/png/brit.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>

						</div>

					</div>
				</div>

			</section>


			{/* Footer */}
			<Footer />
			{/*Footer End  */}

		</div>
	);
};

export default HomeView;
