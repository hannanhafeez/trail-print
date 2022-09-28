
import React, { FC, Fragment, useRef, useState } from "react";

import css from "./preview.module.css";
import ExportedImage from "next-image-export-optimizer";
// import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";


const Preview: FC = () => {
	return (

		<div className="">
			{/* Header */}
			<Header />
			{/* Header End */}
			<div className={css.my_container}>

				<div className="flex flex-col items-center pt-[80px] pb-[80px] gap-9">

					<h1 className="font-mulish font-bold text-[rgb(55,65,58,0.5)]">
						1/2
					</h1>

					<div className="text-center">
						<h2 className={css.heading_top}>
							Your download will be Digital Print and $20.00.
						
						</h2>
						
						<h2 className={css.heading_top}>
						Please make sure you’re happy with everything below…
						</h2>
					</div>
					
					<div className="flex flex-col flex-1 justify-center w-full xs:flex-row gap-6 pt-8">

						<button className={css.choise_button}>
						<div className={css.arrow}>
							<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow"  objectFit="cover"/>
						</div>
							Back to Edit


						</button>
						<button className={css.choise_button}>
							Order
						<div className={css.arrow_back}>
							<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow"  objectFit="cover"/>
						</div>
						</button>

					</div>

				</div>

		<h1>Content to be filled latter</h1>

			</div>

			{/* Footer */}
			<Footer />
			{/*Footer End  */}

		</div>

	);
};;

export default Preview;

