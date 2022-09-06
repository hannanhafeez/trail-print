
import React, { FC, Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SETTINGS } from "../../constants/pageLinks";
import css from "./about.module.css";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const AboutView: FC = () => {
	return (
		<div className="relative">
			{/* Header */}
			<Header/>
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
			<Footer/>
			{/* footer */}
				
		</div>

	);
};;

export default AboutView;

