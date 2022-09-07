
import React, { FC, Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SETTINGS } from "../../constants/pageLinks";
import css from "./checkout.module.css";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";


const CheckOut: FC = () => {
	return (

		<div className="">
			{/* Header */}
			<Header />
			{/* Header End */}
			<div className={`${css.my_container} mb-24`}>

				<div className="flex flex-col items-center pt-[80px] pb-[60px] gap-9">

					<h1 className="font-mulish font-bold text-[rgb(55,65,58,0.5)]">
						2/2
					</h1>
					<div>

						<h2 className={css.heading_styles}>
							Nearly there!
						</h2>
						<h2 className={css.heading_styles}>

							Just need a few details from you…

						</h2>
					</div>


					<h3>🤘</h3>

				</div>
				<div className="px-3 py-8 md:px-[70px] md:py-[100px]  bg-[#FAFCF8]">

					<div className="flex flex-col  items-center gap-20">
						<h1 className={css.form_heading}>YOUR DETAIL</h1>

						<div className="flex flex-col w-full gap-[30px]">
							<div className={css.input_wrapper}>
								{/* <label htmlFor="" className="">Name*</label> */}
								<input type="text" name="" id="" placeholder="Name *" className={css.input_style} />
							</div>
							<div className={css.input_wrapper}>
								{/* <label htmlFor="" className="">Name*</label> */}
								<input type="text" name="" id="" placeholder="Your Email *" className={css.input_style} />
							</div>
							<div className={css.input_wrapper}>
								{/* <label htmlFor="" className="">Name*</label> */}
								<input type="text" name="" id="" placeholder="Phone Number *" className={css.input_style} />
							</div>

						</div>
						<div className="flex flex-col items-center text-center md:items-center font-quicksand text-theme_dark_blue text-[14px] md:text-[16px]">
							<p>Your email is only used for order confirmation/notifications and your phone</p>
							<p>number only for delivery queries.</p>
						</div>

						<h1 className={css.form_heading}>DISCOUNT VOUCHER</h1>

						
						<div className={css.input_wrapper}>
								{/* <label htmlFor="" className="">Name*</label> */}
								<input type="text" name="" id="" placeholder="Enter Code" className={css.input_style} />
							
						</div>
						<h1 className={css.form_heading}>PAYMENT</h1>

						<div className="flex items-center w-full gap-4 border-b">
							
							
										<div className="relative h-[15px] w-[20px] ">
											<Image alt="card" src={'/assets/png/card.png'}  layout='fill' objectFit="contain" />
										</div>
										{/* <label htmlFor="" className="">Name*</label> */}
										<input type="text" name="" id="" placeholder="Enter Code" className={`${css.input_style_card} flex-1`} />
									
							
									{/* <label htmlFor="" className="">Name*</label> */}
									<input type="text" name="" id="" placeholder="MM / YY  CVC" className={css.input_style_card} />
							
					
						</div>

					</div>


				</div>


			</div>

			{/* Footer */}
			<Footer />
			{/*Footer End  */}

		</div>

	);
};;

export default CheckOut;

