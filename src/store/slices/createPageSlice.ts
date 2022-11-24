import { Feature } from "geojson";
import mapboxgl from "mapbox-gl";
import { colorThemeData } from "../../constants/themeData";

export type TRACKING_DATA = { time?: string, value: number }[];
export type ORIENTATION = 'portrait' | 'landscape';
export type LAYOUT = '1' | '2' | '3' | '4';
export type THEME = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14';

const vl_ids = ['vl1' , 'vl2' , 'vl3' , 'vl4' , 'vl5' , 'vl6'] as const
export type VALUE_LABEL_IDS = typeof vl_ids[number];

export type COLOR =	'primaryText' |
					'secondaryText' |
					'background' |
					'activity' |
					'elevation' ;

export type VALUE_LABELS = { id: VALUE_LABEL_IDS, value: string, label: string }[];

export type TRAIL = {
	name: string,
	time: string,
	type: 'gpx' | 'kml' | 'strava',

	/**
	 * Length of trach in KM.
	 */
	lengthInKm: number,
	mapDetail: Feature
}

export type PageState = {
	text: {
		title: string,
		subtitle: string,
	},
	trails: TRAIL[],
	geoJson: any,
	valueLabels: VALUE_LABELS,
	orientation: ORIENTATION,
	layout: LAYOUT,
	theme: THEME,
	colors: {
		primaryText: string,
		secondaryText: string,
		background: string,
		activity: string,
		elevation: string,
	},
	elevationProfile: boolean,
	useDashedLined: boolean,
	endpoints: boolean,
	activityThickness: number,
	mapStyle: string
}

export const pageState: PageState = {
	text: {
		title: 'Title',
		subtitle: 'Subtitle',
	},
	trails: [],
	geoJson: {},
	valueLabels: vl_ids.map((id, ind) => ({ id: id, value: `Value ${ind + 1}`, label: `Label ${ind + 1}` })),
	orientation: 'portrait',
	layout: '1',
	theme: '1',
	colors: colorThemeData[0].colors,
	elevationProfile: true,
	useDashedLined: false,
	endpoints: false,
	activityThickness: 4,
	mapStyle: colorThemeData[0].mapStyle,
}

/* Actions */

type SET_TITLE      = { type: 'SET_TITLE',    payload: string,}
type SET_VALUE_LABELS = { type: 'SET_VALUE_LABELS', payload: { id: VALUE_LABEL_IDS, target: 'v' | 'l', value: string},}
type SET_VALUE_LABELS_ORDERED = { type: 'SET_VALUE_LABELS_ORDERED', payload: VALUE_LABELS,}
type SET_SUBTITLE   = { type: 'SET_SUBTITLE', payload: string,}

type ADD_TRAIL = {type: 'ADD_TRAIL', payload: TRAIL}
type REMOVE_TRAIL = {type: 'REMOVE_TRAIL', payload: number}
type ADD_TRAILS = {type: 'ADD_TRAILS', payload: {trails: TRAIL[], geojson: any}}
type SET_TRAILS_ORDERED = {type: 'SET_TRAILS_ORDERED', payload: TRAIL[]}

type SET_ORIENTATION  = { type: 'SET_ORIENTATION', payload: ORIENTATION,}
type SET_LAYOUT  = { type: 'SET_LAYOUT', payload: LAYOUT,}

type SET_THEME  = { type: 'SET_THEME', payload: {
	theme: THEME,
	colors?: {
		primaryText: string,
		secondaryText: string,
		background: string,
		activity: string,
		elevation: string,
	},
	mapStyle?: string,
},}

type SET_COLOR  = { type: COLOR, payload: string,}
type TOGGLE_ELEVATION_PROFILE  = { type: 'TOGGLE_ELEVATION_PROFILE', payload?: undefined,}
type TOGGLE_DASHED_LINES  = { type: 'TOGGLE_DASHED_LINES', payload?: undefined,}
type TOGGLE_ENDPOINTS  = { type: 'TOGGLE_ENDPOINTS', payload?: undefined,}
type SET_ACTIVITY_THICKNESS  = { type: 'SET_ACTIVITY_THICKNESS', payload: number,}


export type Action =  SET_TITLE
					| SET_SUBTITLE
					| SET_VALUE_LABELS
					| SET_VALUE_LABELS_ORDERED
					| SET_ORIENTATION
					| SET_LAYOUT
					| SET_THEME
					| SET_COLOR
					| TOGGLE_ELEVATION_PROFILE
					| TOGGLE_DASHED_LINES
					| TOGGLE_ENDPOINTS
					| SET_ACTIVITY_THICKNESS
					| ADD_TRAIL
					| REMOVE_TRAIL
					| ADD_TRAILS
					| SET_TRAILS_ORDERED;

/* Actions */

export const createReducer = (state: PageState, action: Action): PageState => {
	switch (action.type) {
		case 'SET_TITLE':
			return { ...state, text: {...state.text, title: action.payload}};
		case 'SET_SUBTITLE':
			return { ...state, text: {...state.text, subtitle: action.payload}};

		case 'SET_TRAILS_ORDERED':
			return { ...state, trails: action.payload};
		case 'ADD_TRAIL':
			console.log(state.trails)
			return { ...state, trails: [action.payload, ...state.trails], geoJson: action.payload.mapDetail};
		case 'ADD_TRAILS':
			return { ...state, trails: [...action.payload.trails, ...state.trails], geoJson: action.payload.geojson};
		case 'REMOVE_TRAIL':
			return { ...state, trails: state.trails.filter((_, ind)=>ind !== action.payload)};

		case 'SET_VALUE_LABELS_ORDERED':
			return { ...state, valueLabels: action.payload};

		case 'SET_VALUE_LABELS':
			const id = state.valueLabels.findIndex((v)=>v.id===action.payload.id);
			const newArray = [...state.valueLabels];
			if(action.payload.target === "v"){
				newArray[id].value = action.payload.value;
			}else{
				newArray[id].label = action.payload.value;
			}
			return {...state};

		case 'SET_ORIENTATION':
			return { ...state, orientation: action.payload };
		case 'SET_LAYOUT':
			return { ...state, layout: action.payload };
		case "SET_THEME":
			return {
				...state,
				theme: action.payload.theme,
				colors: action.payload.colors ? action.payload.colors : state.colors,
				mapStyle: action.payload.mapStyle ? action.payload.mapStyle : state.mapStyle,
			};

		case "primaryText":
			return { ...state, colors: {...state.colors, primaryText:action.payload}};
		case "secondaryText":
			return { ...state, colors: {...state.colors, secondaryText:action.payload}};
		case "background":
			return { ...state, colors: {...state.colors, background:action.payload}};
		case "activity":
			return { ...state, colors: {...state.colors, activity:action.payload}};
		case "elevation":
			return { ...state, colors: {...state.colors, elevation:action.payload}};

		case 'TOGGLE_ELEVATION_PROFILE':
			return { ...state, elevationProfile: !state.elevationProfile}
		case 'TOGGLE_DASHED_LINES':
			return { ...state, useDashedLined: !state.useDashedLined}
		case 'TOGGLE_ENDPOINTS':
			return { ...state, endpoints: !state.endpoints}

		case "SET_ACTIVITY_THICKNESS":
			return { ...state, activityThickness: Math.max(1, action.payload) };

		default:
			return state;
	}
}

export const valueLabelAction = (id: VALUE_LABEL_IDS, target: 'v' | 'l', value: string): SET_VALUE_LABELS => {
	return {
		type:'SET_VALUE_LABELS',
		payload:{
			id, target, value
		}
	}
}