import React, { FC, FormEvent, FormEventHandler, useEffect, useState, } from "react";

import css from "./checkout.module.css";
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { CREATE, PREVIEW } from "../../constants/pageLinks";
import { usePaperContext } from "../../store/context/PaperContext";
import { LoadingMap } from "../create/loading";
import axios from "axios";
import { API } from "../../constants/apiEndpoints";

const CheckOut: FC = () => {
	const router = useRouter();
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isSubmitted, setSubmitted] = useState(false);


	const { pageState: {exportImage} } = usePaperContext();
	const imageString = exportImage?.split(',').slice(1)[0] || ''

	useEffect(()=>{
		if (!imageString || imageString.length < 1000) { router.replace(CREATE); }
	},[])

	const goBack = () => router.replace(PREVIEW);

	const onSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		// console.log(imageString)

		if (!imageString || imageString.length < 1000) { return }
		setLoading(true);

		// * Upload Image here and get a link.
		const imageFormData = new FormData();
		imageFormData.append('image', imageString);

		const config = {
			url: API.admin_image_upload,
			method: 'post', data: imageFormData
		};

		try{
			const imageUploadResponse = await axios(config);
			// * console.log('Image upload response', imageUploadResponse.data)

			if (imageUploadResponse.data.success == 1 && imageUploadResponse.data.result.image_path){
				// Already has name, email, phone and quantity
				const formData = new FormData(e.target as HTMLFormElement);
				formData.append('amount', ((parseInt(formData.get('quantity')?.toString() || '1')) * 20).toString())
				formData.append('image_link', imageUploadResponse.data.result.image_path);

				/* console.group('FormData')
					formData.forEach((v, k) => console.log({ [k]: v }))
				console.groupEnd() */

				const orderRequest = {
					url: API.admin_add_order,
					method: 'post', data: formData
				};

				const response = await axios(orderRequest);
				// * console.log('Order add response', response.data)

				if(response.data.success == 1){
					setSubmitted(true);
				}else{
					alert('An unknown error occured. Please try again!')
				}
			}else{
				alert('An unknown error occured. Please try again!')
			}
		}catch(e){
			console.warn(e)
			alert('An unknown error occured. Please try again!')
		}
		setLoading(false);
	}

	if(isSubmitted){
		return <SuccessView/>
	}

	return (
		<div className="relative">
			{/* Header */}
			<Header />
			{/* Header End */}

			<form onSubmit={onSubmit}>
				<div className={`${css.my_container} mb-24`}>
					<div className="flex flex-col items-center pt-[80px] pb-[60px] gap-9">
						<button type='button' className={css.backButton} onClick={goBack}>
							<div className={css.arrow}>
								<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow" objectFit="cover" />
							</div>
							{/* Back to Edit */}
						</button>
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
										<input required
											type="text"
											name="name"
											id="name"
											placeholder="Name *"
											className={css.input_style}
										/>
									</div>
									<div className={css.input_wrapper}>
										{/* <label htmlFor="" className="">Name*</label> */}
										<input required
											type="email"
											name="email"
											id="email"
											placeholder="Your Email *"
											className={css.input_style}
										/>
									</div>
									<div className={css.input_wrapper}>
										{/* <label htmlFor="" className="">Name*</label> */}
										<input required
											type="phone"
											name="phone"
											id="phone"
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

								{/* <h1 className={css.form_heading}>DISCOUNT VOUCHER</h1>

								<div className={css.input_wrapper}>
									<input required
										type="text"
										name=""
										id=""
										placeholder="Enter Code"
										className={css.input_style}
									/>
								</div> */}

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
									<input required type="number" name="quantity" id="quantity"
										value={quantity}
										className={`${css.input_style_card} flex-1 border-b`}
										onChange={(e)=>{
											setQuantity(Math.max(1, Math.min(10,parseInt(e.target.value)|| 1)))
										}}
									/>
								</div>


							</div>
							<div className="flex flex-col items-center gap-5">
								<h1 className="font-quicksand font-medium text-[32px] md:text-[36px] lg:text-[42px] text-[#4C6CAC] text-center mt-12">
									$ {(20 * quantity).toFixed(2)}</h1>
									<button type="submit" className="font-quicksand font-bold text-[20px] text-white w-full md:w-[400px] py-3 bg-theme_green ">Order</button>
							</div>

						</div>
					</div>
				</div>
			</form>

			{/* Footer */}
			<Footer />
			{/*Footer End  */}
			{loading &&
				<div className='z-[1000] absolute inset-0 bg-white bg-opacity-75'>
					<div className="min-h-screen min-w-screen sticky top-0 flex items-center justify-center">
						<LoadingMap />
					</div>
				</div>
			}
		</div>
	);
};

export default CheckOut;

const SuccessView = () => {
	const router = useRouter();
	return (
		<>
			<Header />
			<div className={css.my_container}>
				<div className="flex flex-col items-center pt-[80px] pb-[80px] gap-9">

					<h1 className="font-mulish font-bold text-[rgb(55,65,58,0.5)]">2/2</h1>

					<div className="text-center">
						<h2 className={css.heading_top}>
							🙌🏻 🙌🏻 🙌🏻
						</h2>
						<h2 className={css.heading_top}>
							Your custom digital print is on its way.
						</h2>
						<h2 className={css.heading_top}>
							You&apos;ll receive it via email shortly.
						</h2>

					</div>

					<div className="flex flex-col flex-1 justify-center w-full xs:flex-row gap-6 pt-8">

						<button type='button' className={css.choise_button}
							onClick={()=>router.replace(CREATE)}
						>
							<div className={css.arrow}>
								<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow" objectFit="cover" />
							</div>
							Back to Create
						</button>

						{/* <button type='button' className={css.choise_button}
						>
							Order
							<div className={css.arrow_back}>
								<ExportedImage src={'/assets/svg/arrow2.svg'} layout="fill" alt="arrow" objectFit="cover" />
							</div>
						</button> */}

					</div>

				</div>
			</div>
		</>
	)
}
