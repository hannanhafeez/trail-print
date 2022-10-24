import React, { ChangeEvent, CSSProperties, Dispatch, FC, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';

import {
	valueLabelAction,
	LAYOUT, ORIENTATION, THEME, COLOR, VALUE_LABELS,
	Action, PageState
} from '../../../../store/slices/createPageSlice'

import css from './sidebar.module.css'
import TrailPreview from '../../../../../public/assets/png/trail_preview.webp';

import MyAccordian from '../../../../components/MyAccordian'
import MyButton from '../../../../components/MyButton'
import MyInput from '../../../../components/MyInput'

import { RadioGroup } from '@headlessui/react'

import { Row, SelectButton, SelectImage } from '../index'

import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

import { debounce } from '../../../../utils/helperFunctions'
import { colorThemeData } from '../../../../constants/themeData'
import ExportedImage from 'next-image-export-optimizer';
import { API } from '../../../../constants/apiEndpoints';
import { resourceUsage } from 'process';
import { decode } from '@googlemaps/polyline-codec';

export type SidebarContentProps = {
	strava_connected?: boolean,
	state: PageState,
	dispatch: Dispatch<Action>,
	onUploadClicked?: ()=>void,
}

const SidebarContent:FC<SidebarContentProps> = ({
	strava_connected,
	state, dispatch,
	onUploadClicked,
}) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [stravaText, setStravaText] = useState('');

	const primaryTextRef = useRef<HTMLInputElement>(null)
	const secondaryTextRef = useRef<HTMLInputElement>(null)
	const backgroundRef = useRef<HTMLInputElement>(null)
	const activityRef = useRef<HTMLInputElement>(null)
	const elevationRef = useRef<HTMLInputElement>(null)

	useEffect(()=>{
		if(
			primaryTextRef.current &&
			secondaryTextRef.current &&
			backgroundRef.current &&
			activityRef.current &&
			elevationRef.current
		){
			primaryTextRef.current.value = state.colors.primaryText
			secondaryTextRef.current.value = state.colors.secondaryText
			backgroundRef.current.value = state.colors.background
			activityRef.current.value = state.colors.activity
			elevationRef.current.value = state.colors.elevation
		}
	},[state.mapStyle])

	const onAddClicked = useCallback(async ()=>{
		if(!stravaText)return;

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({"str": stravaText});

		const requestOptions = { method: 'POST', headers: myHeaders, body: raw };

		setLoading(true);
		try {
			const response = await fetch(API.gpx_from_strava, requestOptions)
			const {result} = await response.json()
			// console.log({ result, ok: response.ok })
			if (response.ok && result.map){
				// console.log(decode(result?.map?.summary_polyline || ''))
				dispatch({type:'ADD_TRAIL', payload:{
					name: result.name || 'Unknown', type: 'strava',
					lengthInKm: (result.distance || 0) /1000,
					time: result.start_date || (new Date()).toISOString(),
					mapDetail: {
						type: 'Feature',
						properties:{
							name: result.name || 'Unknown',
							time: result.start_date || (new Date()).toISOString(),
						},
						geometry:{
							"type": "LineString",
							coordinates: (decode(result?.map?.summary_polyline || '')).map((arr)=>arr.reverse())
						}
					}
				}})
			}
		} catch (e:any) {
			console.warn(e);
		} finally {
			setLoading(false)
			setStravaText('')
		}

	}, [dispatch, stravaText])

	const onColorChange = useCallback((colorField: COLOR, e: ChangeEvent<HTMLInputElement>) => {
		debounce(() => dispatch({ type: colorField, payload: e.target.value }), 20)();
	}, [dispatch])

	const onDragEnd = useCallback((result: DropResult,) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			state.valueLabels,
			result.source.index,
			result.destination.index
		);

		dispatch({ type: 'SET_VALUE_LABELS_ORDERED', payload: items })
	},[dispatch, state.valueLabels])

	return (
		<>
			<MyAccordian defaultOpen title={state.trails.length === 0 ? 'Add Activities' : 'Edit Activities'}>
				<div className={css.sidebar_accordian_view}>
					{
						state.trails.length === 0
						?
						<p className={css.sidebar_label}>
							This is just a sample for you to play with. Try adding an activity from Strava or uploading one!
						</p>
						:
						<div className='flex flex-col items-stretch gap-y-4'>
							{
								state.trails.length > 2
								&&
									<button className='self-center text-14 hover:text-red-500 -mt-4'
										onClick={() => dispatch({ type: 'SET_TRAILS_ORDERED', payload: [] })}
									>
										Remove All
									</button>
							}
							{
								state.trails.map(({name, time, type, lengthInKm},ind)=>(
									<div key={`${name}-${time}-${ind}`}
										className={'flex gap-x-4 min-h-[100px] font-mulish'}
									>
										<div className='relative flex items-center justify-center w-[100px] aspect-square outline outline-theme_blue'>
											<ExportedImage alt='Trail Preview' src={TrailPreview} layout="fill" objectFit='cover' unoptimized
											/>
											<span className='absolute left-1/2 translate-x-[-50%] p-2 bg-theme_blue text-white'>{type.toUpperCase()}</span>
										</div>
										<div className='flex flex-col flex-1 items-stretch justify-between text-gray-500'>
											<div className='flex flex-col gap-y-2'>
												<span className='text-theme_blue'>
													{name}
												</span>
												<span className='text-16'>
													{(new Date(time)).toLocaleDateString()} . {lengthInKm ? `${lengthInKm.toFixed(2)}km` : '--'}
												</span>
											</div>
											<button className='self-end text-14 hover:text-theme_blue' disabled={isLoading}
												onClick={()=>dispatch({type:'REMOVE_TRAIL', payload: ind})}
											>
												Remove
											</button>
										</div>
									</div>
								))
							}
						</div>
					}
					{
						strava_connected
						?
						<div className='flex items-stretch gap-x-2'>
							<MyInput placeholder='Enter STRAVA link or ID' value={stravaText}  disabled={isLoading}
								onChange={(e)=>setStravaText(e.currentTarget.value)}
							/>
							<button className='px-2 bg-theme_green text-white'  disabled={isLoading}
								onClick={onAddClicked}
							>
								Add
							</button>
						</div>
						:
						<MyButton title='Connect to'
							onClick={()=> router.push(API.strava_authorize)}
						>
							<svg width="82" height="18" viewBox="0 0 82 18" fill="currentColor">
								<path d="M8.31 16.84C6.8489 16.8505 5.395 16.6346 4 16.2C2.73307 15.8093 1.56149 15.1588 0.559998 14.29L3.26 11.08C4.0324 11.6887 4.91041 12.1497 5.85 12.44C6.72495 12.7086 7.63474 12.8468 8.55 12.85C8.89216 12.8747 9.23522 12.8164 9.55 12.68C9.63873 12.6373 9.71381 12.5707 9.7668 12.4876C9.81979 12.4046 9.8486 12.3085 9.85 12.21C9.83788 12.0867 9.78968 11.9697 9.71142 11.8737C9.63315 11.7776 9.52831 11.7068 9.41 11.67C8.87844 11.4591 8.32502 11.3082 7.76 11.22C6.91333 11.0467 6.10333 10.8433 5.33 10.61C4.62766 10.4055 3.95524 10.1097 3.33 9.73C2.76823 9.38961 2.29256 8.92421 1.94 8.37C1.57972 7.76647 1.39931 7.07259 1.42 6.37C1.41418 5.68085 1.55746 4.9986 1.84 4.37C2.12309 3.74446 2.54351 3.19075 3.07 2.75C3.65964 2.26271 4.33913 1.89578 5.07 1.67C5.96061 1.39689 6.88857 1.26528 7.82 1.28C9.12536 1.23274 10.4303 1.38448 11.69 1.73C12.7772 2.05672 13.7944 2.58228 14.69 3.28L12.23 6.69C11.5392 6.18738 10.7683 5.80532 9.95 5.56C9.21803 5.33136 8.45677 5.2101 7.69 5.2C7.40295 5.17902 7.11568 5.23785 6.86 5.37C6.77844 5.4135 6.71023 5.47835 6.66268 5.55761C6.61512 5.63687 6.59 5.72757 6.59 5.82C6.6022 5.93657 6.64719 6.04729 6.71976 6.13932C6.79233 6.23136 6.8895 6.30094 7 6.34C7.51357 6.55301 8.05069 6.70408 8.6 6.79C9.49173 6.94309 10.3733 7.15014 11.24 7.41C11.9479 7.62683 12.6213 7.94334 13.24 8.35C13.7665 8.70617 14.2044 9.17825 14.52 9.73C14.8428 10.3244 15.0016 10.994 14.98 11.67C14.9914 12.4112 14.8269 13.1446 14.5 13.81C14.184 14.4432 13.7253 14.9943 13.16 15.42C12.5306 15.8787 11.8221 16.2177 11.07 16.42C10.1745 16.6901 9.24525 16.8315 8.31 16.84Z" />
								<path d="M19.15 5.73H14.69V1.45H28.69V5.73H24.2V16.56H19.15V5.73Z" />
								<path d="M29.36 1.45H36.69C37.8179 1.41624 38.9435 1.57173 40.02 1.91C40.8052 2.16809 41.5227 2.59861 42.12 3.17C42.5543 3.61403 42.8945 4.14124 43.12 4.72C43.3602 5.35905 43.4789 6.03735 43.47 6.72C43.5017 7.71391 43.222 8.69288 42.67 9.52C42.1139 10.3034 41.3623 10.9274 40.49 11.33L44.01 16.47H38.33L35.48 12.15H34.41V16.47H29.36V1.45ZM36.59 8.64C37.0931 8.66766 37.5916 8.53076 38.01 8.25C38.1782 8.1261 38.3136 7.96289 38.4042 7.77464C38.4949 7.58638 38.538 7.37879 38.53 7.17C38.5444 6.95894 38.5041 6.74773 38.413 6.55679C38.3219 6.36585 38.1831 6.20163 38.01 6.08C37.5904 5.82135 37.1023 5.69584 36.61 5.72H34.41V8.72H36.59V8.64Z" />
								<path d="M73.3 10.06L76.6 16.56H81.44L73.3 0.5L65.17 16.56H70.01L73.3 10.06Z" />
								<path d="M50.67 10.06L53.96 16.56H58.8L50.67 0.5L42.54 16.56H47.38L50.67 10.06Z" />
								<path d="M61.99 7.95L58.7 1.45H53.86L61.99 17.5L70.12 1.45H65.28L61.99 7.95Z" />
							</svg>
						</MyButton>
					}

					<MyButton title='Upload GPX/KML files' onClick={onUploadClicked} disabled={isLoading} />

				</div>
			</MyAccordian>

			<MyAccordian title='Labels'>
				<div className={css.sidebar_accordian_view}>
					<div className='pr-2 flex flex-col gap-y-6'>
						<MyInput value={state.text.title} placeholder='Title' type={'text'} onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })} />
						<MyInput value={state.text.subtitle} placeholder='Subtitle' type={'text'} onChange={(e) => dispatch({ type: 'SET_SUBTITLE', payload: e.target.value })} />

						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="droppable">
								{(provided, snapshot) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className="flex flex-col"
									>
										{
											state.valueLabels.map((v, ind) => (
												<Draggable key={v.id} draggableId={v.id} index={ind}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														>
															<Row>
																<MyInput value={v.value} placeholder={`Value ${v.id.slice(2, 3)}`}
																	onChange={(e) => dispatch(valueLabelAction(v.id, 'v', e.target.value))}
																/>
																<MyInput value={v.label} placeholder={`Label ${v.id.slice(2, 3)}`}
																	onChange={(e) => dispatch(valueLabelAction(v.id, 'l', e.target.value))}
																/>
															</Row>
														</div>
													)}
												</Draggable>
											))
										}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>

					<p className={[css.sidebar_label, 'mt-4'].join(' ')}>
						To remove any labels from your poster, simply delete the text from the field.
					</p>
				</div>
			</MyAccordian>

			<MyAccordian title='Layout'>
				<div className={css.sidebar_accordian_view}>
					<RadioGroup value={state.orientation} onChange={(v: ORIENTATION) => dispatch({ type: 'SET_ORIENTATION', payload: v })} className='flex gap-4'>
						<SelectButton title='Portrait' value="portrait" >
							<svg width="23" height="23" viewBox="0 0 23 23">
								<rect x="6.25" y="1.32928" width="11" height="20.2411" fill="white" stroke="#4C6CAC" />
							</svg>
						</SelectButton>

						<SelectButton title='Landscape' value="landscape" >
							<svg width="23" height="23" viewBox="0 0 23 23">
								<rect x="1.12946" y="16.9498" width="11" height="20.2411" transform="rotate(-90 1.12946 16.9498)" fill="white" stroke="#4C6CAC" />
							</svg>
						</SelectButton>
					</RadioGroup>

					<RadioGroup value={state.layout} onChange={(v: LAYOUT) => dispatch({ type: 'SET_LAYOUT', payload: v })} className='flex gap-4'>
						<SelectButton value='1'>
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
								<path d="M20.7613 6.50446H8.48871C7.38414 6.50446 6.48871 7.39989 6.48871 8.50446V21.3952" stroke="white" />
								<path d="M6.48871 21.3952H20.6893" stroke="white" strokeWidth="0.3" />
							</svg>
						</SelectButton>

						<SelectButton value='2'>
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
								<path d="M21.0113 7.28558H8.73871C7.63414 7.28558 6.73871 8.18101 6.73871 9.28558V22.1763" stroke="white" />
								<path d="M8.84167 5.34454L15.6621 5.34454" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M17.1444 5.34454L20.4872 5.34454" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</SelectButton>

						<SelectButton value='3'>
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
								<path d="M21.2613 6.50446H8.98868C7.88411 6.50446 6.98868 7.39989 6.98868 8.50446V19.3952C6.98868 20.4998 7.88411 21.3952 8.98868 21.3952H21.2613" stroke="white" />
							</svg>
						</SelectButton>

						<SelectButton value='4'>
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
								<path d="M22.0113 7.28558H9.73871C8.63414 7.28558 7.73871 8.18101 7.73871 9.28558V22.1763" stroke="white" />
								<path d="M9.84167 5.55066L21.5045 5.55066" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.84167 3.93945L21.5045 3.93945" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</SelectButton>
					</RadioGroup>
				</div>
			</MyAccordian>

			<MyAccordian title='Themes'>
				<div className={css.sidebar_accordian_view}>
					<RadioGroup value={state.theme} className='grid grid-cols-2 xl:grid-cols-3 gap-7'
						onChange={(v: THEME) => {
							const foundTheme = colorThemeData.find(({ value }) => value === v)
							console.log(foundTheme?.colors)
							dispatch({ type: 'SET_THEME', payload: { theme: v, colors: foundTheme?.colors, mapStyle: foundTheme?.mapStyle }})}
						}
					>
						{ colorThemeData.map(({value, title, color, src})=>(
								<SelectImage key={`${value}-${title}`}
									value={value}
									title={title}
									color={color}
									src={src}
								/>
							))
						}
					</RadioGroup>
				</div>
			</MyAccordian>

			<MyAccordian title='Colors'>
				<div className={css.sidebar_accordian_view}>
					<div className={css.color_row}>
						<div><input ref={primaryTextRef} id='primaryText' color={state.colors.primaryText} type={'color'} onChange={(e) => onColorChange("primaryText", e)} /></div>
						<label htmlFor='primaryText'>Primary Text Color</label>
					</div>
					<div className={css.color_row}>
						<div><input ref={secondaryTextRef} id='secondaryText' color={state.colors.secondaryText} type={'color'} onChange={(e) => onColorChange("secondaryText", e)} /></div>
						<label htmlFor='secondaryText'>Secondary Text Color</label>
					</div>
					<div className={css.color_row}>
						<div><input ref={backgroundRef} id='background' color={state.colors.background} type={'color'} onChange={(e) => onColorChange("background", e)} /></div>
						<label htmlFor='background'>Background Color</label>
					</div>
					<div className={css.color_row}>
						<div><input ref={activityRef} id='activity' color={state.colors.activity} type={'color'} onChange={(e) => onColorChange("activity", e)} /></div>
						<label htmlFor='activity'>Activity Color</label>
					</div>
					<div className={css.color_row}>
						<div><input ref={elevationRef} id='elevation' color={state.colors.elevation} type={'color'} onChange={(e) => onColorChange("elevation", e)} /></div>
						<label htmlFor='elevation'>Elevation Color</label>
					</div>
				</div>
			</MyAccordian>

			<MyAccordian title='Details'>
				<div className={css.sidebar_accordian_view}>
					<button className={css.detail_row} onClick={() => dispatch({ type: 'TOGGLE_ELEVATION_PROFILE' })}>
						<div className={[css.detail_row_circle + ' ' + (state.elevationProfile ? 'bg-theme_green' : ' ')].join(' ')}></div>
						<div className='flex flex-col gap-y-2'>
							<span className={css.detail_label}>Elevation Profile</span>
							<p className={[css.sidebar_label, 'text-left px-0'].join(' ')}>
								Please make sure your activities are ordered correctly
							</p>
						</div>
					</button>

					<button className={css.detail_row} onClick={() => dispatch({ type: 'TOGGLE_DASHED_LINES' })}>
						<div className={[css.detail_row_circle + ' ' + (state.useDashedLined ? 'bg-theme_green' : ' ')].join(' ')}></div>
						<span className={css.detail_label}>Use dashed lines</span>
					</button>

					<button className={css.detail_row} onClick={() => dispatch({ type: 'TOGGLE_ENDPOINTS' })}>
						<div className={[css.detail_row_circle + ' ' + (state.endpoints ? 'bg-theme_green' : ' ')].join(' ')}></div>
						<span className={css.detail_label}>Endpoints for all activities</span>
					</button>


					<button className={css.detail_row + ' items-baseline'} >
						<MyInput defaultValue={state.activityThickness} type={'number'} min={1} max={20} onChange={(e) => dispatch({ type: 'SET_ACTIVITY_THICKNESS', payload: Math.max(0, Math.min(20, e.target.valueAsNumber)) })}
							className='w-auto flex-1'
						/>
						<span className={css.detail_label + ' flex-[2]'}>Activity Thickness</span>
					</button>


				</div>
			</MyAccordian>
		</>
	)
}

export default SidebarContent


const reorder = (list: VALUE_LABELS, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle): CSSProperties => ({
	// some basic styles to make the items look a bit nicer
	// userSelect: "none",
	// change background colour if dragging
	background: isDragging ? "#fafcf8" : "transparent",
	margin: `10px 0`,

	// styles we need to apply on draggables
	...draggableStyle
});