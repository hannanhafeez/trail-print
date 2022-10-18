import { FC, Suspense, useEffect, useReducer, useState, } from 'react';
import dynamic from 'next/dynamic';
import { useFilePicker } from 'use-file-picker';

const tj = require('@mapbox/togeojson');

import ExportedImage from 'next-image-export-optimizer';
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import css from './create.module.css'
import MyButton from '../../components/MyButton'

import { createReducer, pageState } from '../../store/slices/createPageSlice'
import SidebarContent from './components/SidebarContent';
import { Transition } from '@headlessui/react';
// import Loader from '../../components/Loader';

const PaperPrint = dynamic(async() => {
	/* const p = new Promise((resolve)=>{
		setTimeout(()=>resolve('done'), 3000);
	})
	await p;
	*/
	return import('./components/PaperPrint')
}, { ssr: false, });

export type CreatePageViewProps = {
}

const CreatePageView:FC<CreatePageViewProps> = ({}) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [state, dispatch] = useReducer(createReducer, pageState)

	const [openFileSelector, { filesContent, loading }] = useFilePicker({
		accept: ['.gpx', '.kml'],
		readFilesContent: true,
	});

	useEffect(() => {
		console.log(filesContent)
		if(filesContent.length === 0)return;

		try {
			const file = (new DOMParser()).parseFromString(filesContent[0].content, 'text/xml');
			const extension = filesContent[0].name.split('.').pop()
			const converted = (extension === 'kml') ? tj.kml(file) : tj.gpx(file);
			// const convertedWithStyles = tj.gpx(gpx, { styles: true });

			console.log({ fileContent: filesContent[0].content, file, converted, extension });
			// console.log(filesContent[0].content);
		} catch (e:any) {
			console.warn("\n\nERROR:\n", e, "\n\n");
		}

	}, [filesContent])



	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<Header/>

				<section className={[css.my_container, " flex-1 self-stretch flex flex-col md:flex-row gap-4"].join(' ')}>
					<div className={css.main_view}>
						{/* <Suspense fallback={<Loader size={64} />}> */}
							<PaperPrint
								state={state}
								colors={state.colors}
								mapStyle={state.mapStyle}
							/>
						{/* </Suspense> */}
					</div>

					{/* Static Sidebar */}
					<div className={css.static_sidebar}>
						<SidebarContent state={state} dispatch={dispatch}
							onUploadClicked={() => openFileSelector()}
						/>

						<div className="flex flex-col gap-8 pt-20 pb-2 pr-4 text-center">
							<h2 className={css.total_label}>
								Total: $20.00
							</h2>
							<MyButton title='Preview & Order' className='py-2 text-[22px]'/>
						</div>
					</div>

					<MyButton title='Customize' className='md:hidden mb-2 sticky bottom-2 py-2 text-[22px] gap-4 flex-row-reverse'
						onClick={()=>setShowSidebar(old=>!old)}
					>
						<div className='relative w-5 h-5 animate-pulse'>
							<ExportedImage src={'/assets/svg/arrow1.svg'} alt={'Right arrow'} layout='fill' objectFit='contain'  />
						</div>
					</MyButton>
				</section>

				<Footer/>

				{/* Animating Sidebar */}
				<Transition show={showSidebar}
					className={`z-20 fixed md:hidden inset-0 overflow-y-auto`}
				>
					<Transition.Child onClick={() => setShowSidebar(false)}
						className={`fixed inset-0 bg-[#00000040]`}
						enter={`transition-opacity ease-linear duration-400`}
						enterFrom={`opacity-0`}
						enterTo={`opacity-100`}
						leave={`transition-opacity ease-linear duration-200`}
						leaveFrom={`opacity-100`}
						leaveTo={`opacity-0`}
					/>

					<Transition.Child unmount={false}
						className={`fixed top-0 bottom-0 w-[300px] sm:w-[400px] bg-white flex flex-col divide divide-y-[1px] divide-[#0092DB33]  overflow-y-auto uppercase font-raleway font-medium text-16`}
						enter={`transition ease-linear duration-400 transform`}
						enterFrom={`-translate-x-[300px] sm: -translate-x-[400px] `}
						enterTo={`translate-x-0`}
						leave={`transition ease-linear duration-200 transform`}
						leaveFrom={`translate-x-0`}
						leaveTo={`-translate-x-[300px] sm: -translate-x-[400px] `}
					>
						<div className={'w-full py-4 pl-8'}>
							<SidebarContent state={state} dispatch={dispatch} />

							<div className="flex flex-col gap-8 pt-20 pb-2 pr-4 text-center">
								<h2 className={css.total_label}>
									Total: $20.00
								</h2>
								<MyButton title='Preview & Order' className='py-2 text-[22px]' />
							</div>
						</div>

					</Transition.Child>

				</Transition>
			</div>
		</>
	)
}

export default CreatePageView