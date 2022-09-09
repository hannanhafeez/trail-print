import React, { FC, Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SETTINGS } from "../../constants/pageLinks";
import css from "./home.module.css";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home: FC = () => {
	return (
		<div>
			{/* Header */}
			<Header />
			{/* Header End */}
			<div className=" bg-[rgba(195,192,171,0.5)]">
				<div className={css.my_container}>
				<section className={css.content_parent_top}>
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
						<div className={css.img_wrapper_top}>
							<div className={css.img_top}>
								<Image src={'/assets/png/trailtrack.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>
							
						</div>
					</section>
				</div>
			</div>
			<div className="bg-[#1E3561]">
				<div className={css.my_container}>

					<div className="flex flex-col gap-12 bg-[#1E3561] py-[50px] md:py-[100px]">
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

					

						<section className={css.content_parent_reverse}>
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

					<section className={css.content_parent}>
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
						<div className={css.img_wrapper}>
							<div className={css.img}>
								<Image src={'/assets/png/logomask.png'} alt="globe" objectFit="contain" layout="fill" />
							</div>
							<h2 className={css.vouch}>GIFT VOUCHERS</h2>
						</div>
					</section>

					</div>

				</div>


			</div>
			<div className="bg-[rgb(195,192,171,50)] py-12 md:py-48">

				<div className={css.my_container}>
					<div className="">
				<h1>TESTIMONIALS</h1>

					</div>

					<section className={css.track_wrapper}>
						<div className={css.track}>
							<div className="w-full">
								<div className="relative w-full  aspect-square md:full md:h-[400px]">
									<Image src={'/assets/png/bicycle.png'} alt="globe" objectFit="contain" layout="fill" />
								</div>
							</div>

							<h1>Paper Trails is a family run (ha!) business.
								We’re runners, cyclists and only sell products we’d buy ourselves.</h1>
						</div>

					</section>
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

			</div>


			{/* Footer */}
			<Footer />
			{/*Footer End  */}

		</div>
	);
};

export default Home;
