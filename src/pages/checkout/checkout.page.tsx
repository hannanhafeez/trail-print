import React, { FC, } from "react";

import css from "./checkout.module.css";
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";

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
						<h2 className={css.heading_styles}>Nearly there!</h2>
						<h2 className={css.heading_styles}>
							Just need a few details from you…
						</h2>
					</div>

					<h3>🤘</h3>
				</div>

				<div className="flex flex-col gap-6">
					<div className={css.form_wrapper}>
						<div className="flex flex-col  items-center gap-20">
							<h1 className={css.form_heading}>YOUR DETAIL</h1>
							<div className="flex flex-col w-full gap-[30px]">
								<div className={css.input_wrapper}>
									{/* <label htmlFor="" className="">Name*</label> */}
									<input
										type="text"
										name=""
										id=""
										placeholder="Name *"
										className={css.input_style}
									/>
								</div>
								<div className={css.input_wrapper}>
									{/* <label htmlFor="" className="">Name*</label> */}
									<input
										type="text"
										name=""
										id=""
										placeholder="Your Email *"
										className={css.input_style}
									/>
								</div>
								<div className={css.input_wrapper}>
									{/* <label htmlFor="" className="">Name*</label> */}
									<input
										type="text"
										name=""
										id=""
										placeholder="Phone Number *"
										className={css.input_style}
									/>
								</div>
							</div>
							<div className="flex flex-col items-center text-center md:items-center font-quicksand text-theme_dark_blue text-[14px] md:text-[16px]">
								<p>
									Your email is only used for order confirmation/notifications
									and your phone
								</p>
								<p>number only for delivery queries.</p>
							</div>
							<h1 className={css.form_heading}>DISCOUNT VOUCHER</h1>

							<div className={css.input_wrapper}>
								{/* <label htmlFor="" className="">Name*</label> */}
								<input
									type="text"
									name=""
									id=""
									placeholder="Enter Code"
									className={css.input_style}
								/>
							</div>
							<h1 className={css.form_heading}>PAYMENT</h1>
							<div className="flex items-center flex-col md:flex-row w-full gap-y-6 gap-x-4 border-0 md:border-b  ">
								<div className="flex-1 flex  items-center border-b w-full md:border-none">
									<div className="relative h-[15px] w-[20px] mr-2">
										<ExportedImage
											alt="card"
											src={"/assets/png/card.png"}
											layout="fill"
											objectFit="contain"
										/>
									</div>
									{/* <label htmlFor="" className="">Name*</label> */}
									<input
										type="text"
										name=""
										id=""
										placeholder="Card Number"
										className={`${css.input_style_card} flex-1`}
									/>
								</div>

								{/* <label htmlFor="" className="">Name*</label> */}
								<div className="w-full md:w-auto border-b md:border-none">
									<input
										type="text"
										name=""
										id=""
										placeholder="MM / YY  CVC"
										className={css.input_style_card}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className={css.form_wrapper}>
						<h1 className={`${css.form_heading} text-center `}>SUMMARY</h1>

						<div className="flex flex-col items-center gap-3">
							<h2 className={`${css.head_common} text-[#38423B] mt-[30px]`}>
								Your download will be a digital print.
							</h2>
							<a
								className={`${css.head_common}  font-medium  text-[#4C6CAC] underline underline-offset-4`}
							>
								Need to go back and check?
							</a>

							<div className="flex items-center gap-2 mt-11">
								<label htmlFor="" className="font-quicksand text-[19px] ">Quantity : </label>
								<input
									type="number"
									name=""
									id=""
									placeholder="1"
									className={`${css.input_style_card} flex-1 border-b`}
								/>
							</div>


						</div>
						<div className="flex flex-col items-center gap-5">
							<h1 className="font-quicksand font-medium text-[32px] md:text-[36px] lg:text-[42px] text-[#4C6CAC] text-center mt-12">
								$ 20.00</h1>
								<button className="font-quicksand font-bold text-[20px] text-white w-full md:w-[400px] py-3 bg-theme_green ">Order</button>
						</div>

					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
			{/*Footer End  */}
		</div>
	);
};

export default CheckOut;
