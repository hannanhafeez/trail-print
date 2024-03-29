import React, { FC, useEffect, } from "react";

import css from "./preview.module.css";
import ExportedImage from "next-image-export-optimizer";
// import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import {  CHECKOUT, CREATE } from "../../constants/pageLinks";
import { usePaperContext } from "../../store/context/PaperContext";
import dynamic from "next/dynamic";


const PaperPrint = dynamic(() => import('../../components/PaperPrint'), { ssr: false, });


const PreviewView: FC = () => {
	const router = useRouter();

	const { pageState: state } = usePaperContext();

	useEffect(()=>{
		if (!state.exportImage || state.exportImage.length < 1000){router.replace(CREATE);}
	},[])

	const goBack = () => router.replace(CREATE);

	const goToCheckout = () => {
		router.push(CHECKOUT);
	}

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

						<button type='button' className={css.choise_button}
							onClick={goBack}
						>
							<div className={css.arrow}>
								<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow" objectFit="cover" />
							</div>
							Back to Edit
						</button>

						<button type='button' className={css.choise_button}
							onClick={goToCheckout}
						>
							Order
							<div className={css.arrow_back}>
								<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow" objectFit="cover" />
							</div>
						</button>

					</div>

					<div
						className={`self-center relative w-full aspect-square ${state.orientation === 'portrait' ? 'max-w-[1191px] aspect-[0.7072446556]' : 'max-w-[1648px] aspect-[1/0.7072446556]'}`}
					>
						<PaperPrint
							state={state}
							mapInteractive={false}
							mapTransitionDuration={0}
						/>
						{/* {state.exportImage &&
							<Image alt="Exported Print" src={state.exportImage} layout='fill' objectFit="contain"/>
						} */}
					</div>
				</div>


			</div>

			{/* Footer */}
			<Footer />
			{/*Footer End  */}

		</div>

	);
};;

export default PreviewView;

