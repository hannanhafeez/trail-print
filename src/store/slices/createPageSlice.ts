export type ORIENTATION = 'portrait' | 'landscape';
export type LAYOUT = '1' | '2' | '3' | '4';
export type THEME = '1' | '2' | '3' | '4' | '5' | '6';

const vl_ids = ['vl1' , 'vl2' , 'vl3' , 'vl4' , 'vl5' , 'vl6'] as const
export type VALUE_LABELS = typeof vl_ids[number];

export type COLOR =		'primaryText' | 
						'secondaryText' | 
						'background' | 
						'activity' | 
						'elevation' ;


export type PageState = {
	text: {
		title: string,
		subtitle: string,
	},
	valueLabels: {id: VALUE_LABELS, value: string, label: string}[],
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
}

export const pageState: PageState = {
	text: {
		title: '',
		subtitle: '',
	},
	valueLabels: vl_ids.map((id, ind) => ({ id: id, value: `Value ${ind + 1}`, label: `Label ${ind + 1}` })),
	orientation: 'portrait',
	layout: '1',
	theme: '1',
	colors:{
		primaryText:	'#263D69',
		secondaryText:	'#282726',
		background:		'#EEEDE7',
		activity: 		'#94B028',
		elevation: 		'#263D69',
	},
	elevationProfile: false,
	useDashedLined: false,
	endpoints: false,
	activityThickness: 4,
}

/* Actions */

type SET_TITLE      = { type: 'SET_TITLE',    payload: string,}
type SET_VALUE_LABELS = { type: 'SET_VALUE_LABELS', payload: { id: VALUE_LABELS, target: 'v' | 'l', value: string},}
type SET_SUBTITLE   = { type: 'SET_SUBTITLE', payload: string,}
type SET_ORIENTATION  = { type: 'SET_ORIENTATION', payload: ORIENTATION,}

type SET_LAYOUT  = { type: 'SET_LAYOUT', payload: LAYOUT,}

type SET_THEME  = { type: 'SET_THEME', payload: THEME,}

type SET_COLOR  = { type: COLOR, payload: string,}
type TOGGLE_ELEVATION_PROFILE  = { type: 'TOGGLE_ELEVATION_PROFILE', payload?: undefined,}
type TOGGLE_DASHED_LINES  = { type: 'TOGGLE_DASHED_LINES', payload?: undefined,}
type TOGGLE_ENDPOINTS  = { type: 'TOGGLE_ENDPOINTS', payload?: undefined,}
type SET_ACTIVITY_THICKNESS  = { type: 'SET_ACTIVITY_THICKNESS', payload: number,}


type Action = SET_TITLE 
			| SET_SUBTITLE 
			| SET_VALUE_LABELS 
			| SET_ORIENTATION 
			| SET_LAYOUT 
			| SET_THEME 
			| SET_COLOR
			| TOGGLE_ELEVATION_PROFILE
			| TOGGLE_DASHED_LINES
			| TOGGLE_ENDPOINTS
			| SET_ACTIVITY_THICKNESS;

/* Actions */

export const createReducer = (state: PageState, action: Action): PageState => {
	switch (action.type) {
		case 'SET_TITLE':
			return { ...state, text: {...state.text, title: action.payload}};
		case 'SET_SUBTITLE':
			return { ...state, text: {...state.text, subtitle: action.payload}};

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
			return { ...state, theme: action.payload};
		
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
			return { ...state, activityThickness: action.payload };

		default:
			return state;
	}
}

export const valueLabelAction = (id: VALUE_LABELS, target: 'v' | 'l', value: string): SET_VALUE_LABELS => {
	return {
		type:'SET_VALUE_LABELS',
		payload:{
			id, target, value
		}
	}
}