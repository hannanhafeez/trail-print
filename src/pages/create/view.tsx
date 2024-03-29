import { FC, useCallback, useEffect, useState, } from 'react';
import dynamic from 'next/dynamic';
import { useFilePicker } from 'use-file-picker';

const tj = require('@mapbox/togeojson');

import ExportedImage from 'next-image-export-optimizer';
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import css from './create.module.css'
import MyButton from '../../components/MyButton'

import { TRAIL } from '../../store/slices/createPageSlice'
import { Transition } from '@headlessui/react';
// import Loader from '../../components/Loader';
import {LoadingSidebar, LoadingMap} from './loading';
const SidebarContent = dynamic(async() => {
	return import('./components/SidebarContent')
}, { ssr: false, loading: ()=><LoadingSidebar/> });

const PaperPrint = dynamic(() => {
	return import('../../components/PaperPrint');
}, { ssr: false, loading: () => <LoadingMap /> });


import { Feature, Geometry, length, lineString } from '@turf/turf';
import { Position } from 'geojson';
import { useRouter } from 'next/router';
import { PREVIEW } from '../../constants/pageLinks';
import { usePaperContext } from '../../store/context/PaperContext';
import { ViewState } from 'react-map-gl';

import {toPng} from 'html-to-image'

export type CreatePageViewProps = {
	strava_connected?: boolean,
}

const CreatePageView: FC<CreatePageViewProps> = ({ strava_connected }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const {pageState: state, dispatch} = usePaperContext()

	const [openFileSelector, { filesContent }] = useFilePicker({
		accept: ['.gpx', '.kml'],
		readFilesContent: true,
	});

	useEffect(() => {
		// console.log(filesContent)
		dispatch({type: 'RESET_EXPORT_IMAGE'})
	}, [])

	useEffect(() => {
		// console.log(filesContent)
		if (filesContent.length === 0) return;

		try {
			const file = (new DOMParser()).parseFromString(filesContent[0].content, 'text/xml');
			const extension = filesContent[0].name.split('.').pop();
			const converted = (extension === 'kml') ? tj.kml(file) : tj.gpx(file);
			// const convertedWithStyles = tj.gpx(gpx, { styles: true });

			console.log({ converted, extension });
			dispatch({
				type: 'ADD_TRAILS',
				payload:{
					geojson: converted,
					trails: (converted.features as Feature<Geometry, any>[]).map((feature, ) => {
									const line = lineString(feature.geometry.coordinates as Position[]);
									const l = length(line, { units: 'kilometers' });
									return {
										name: feature.properties?.name ?? "Untitled",
										time: feature.properties?.time ?? '',
										lengthInKm: l,
										type: extension || 'gpx',
										mapDetail: feature
									}
								}) as TRAIL[]
				}

			})
			// console.log(filesContent[0].content);
		} catch (e: any) {
			console.warn("\n\nERROR:\n", e, "\n\n");
		}

	}, [filesContent])

	const handleLatestViewState = (viewState: ViewState) =>{
		// console.log({ state: viewState })
		dispatch({type: 'SET_VIEW_STATE', payload: viewState})
	}

	const goToPreview = async ()=>{
		setLoading(true)

		const mapElement = document.getElementById('custom-map');
		if (!mapElement) return;

		const initialScale = mapElement?.style.getPropertyValue('transform');

		const divEle = document.createElement('div');
		divEle.append(mapElement.cloneNode());

		// (divEle.lastElementChild as HTMLElement).style.

		mapElement.style.setProperty('transition-duration', '0ms');
		mapElement.style.setProperty('transform', 'scale(1)');
		console.log({ divEle, mapElement, initialScale });

		// await (new Promise(resolve => setTimeout(() => resolve(true), 350)));

		const data = await toPng(mapElement, {});
		dispatch({type: 'SET_EXPORT_IMAGE', payload:data})
		// console.log(data);
		mapElement.style.removeProperty('transition-duration');
		mapElement.style.setProperty('transform', initialScale || "scale(1)");


		setLoading(false)

		await (new Promise(resolve => setTimeout(() => resolve(true), 350)));

		router.push(PREVIEW)
	}

	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<Header />

				<section className={[css.my_container, " flex-1 self-stretch flex flex-col md:flex-row gap-4"].join(' ')}>
					<div className={css.main_view}>
						<PaperPrint
							state={state}
							handleLatestViewState={handleLatestViewState}
						/>
					</div>

					{/* Static Sidebar */}
					<div className={css.static_sidebar}>
						<SidebarContent state={state} dispatch={dispatch}
							strava_connected={strava_connected}
							onUploadClicked={() => {/* console.log('log'); */openFileSelector()}}
						/>

						<div className="flex flex-col gap-8 pt-20 pb-2 pr-4 text-center">
							<h2 className={css.total_label}>
								Total: $20.00
							</h2>
							<MyButton type='button' onClick={goToPreview} title='Preview & Order' className='py-2 text-[22px]' />
						</div>
					</div>

					<MyButton title='Customize' className='md:hidden mb-2 sticky bottom-2 py-2 text-[22px] gap-4 flex-row-reverse'
						onClick={() => setShowSidebar(old => !old)}
					>
						<div className='relative w-5 h-5 animate-pulse'>
							<ExportedImage unoptimized src={'/assets/svg/arrow1.svg'} alt={'Right arrow'} layout='fill' objectFit='contain' />
						</div>
					</MyButton>
				</section>

				<Footer />

				{/* Animating Sidebar */}
				<Transition show={showSidebar}
					className={`z-20 fixed md:hidden inset-0 overflow-y-auto`}
				>
					<Transition.Child unmount={false}  onClick={() => setShowSidebar(false)}
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
							<SidebarContent state={state} dispatch={dispatch}
								strava_connected={strava_connected}
								onUploadClicked={() => openFileSelector()}
							/>

							<div className="flex flex-col gap-8 pt-20 pb-2 pr-4 text-center">
								<h2 className={css.total_label}>
									Total: $20.00
								</h2>
								<MyButton type='button' onClick={goToPreview} title='Preview & Order' className='py-2 text-[22px]' />
							</div>
						</div>

					</Transition.Child>

				</Transition>

				{loading &&
					<div className='z-[1000] absolute inset-0 bg-white bg-opacity-75'>
						<LoadingMap />
					</div>
				}
			</div>
		</>
	)
}

export default CreatePageView