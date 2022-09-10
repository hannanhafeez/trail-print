export type ORIENTATION = 'portrait' | 'landscape';
export type LAYOUT = '1' | '2' | '3' | '4';
export type THEME = '1' | '2' | '3' | '4' | '5' | '6';
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
	colors: {
		primaryText: string,
		secondaryText: string,
		background: string,
		activity: string,
		elevation: string,
	},
	orientation: ORIENTATION;
	layout: LAYOUT;
	theme: THEME;
}

export const pageState: PageState = {
	text: {
		title: '',
		subtitle: '',
	},
	colors:{
		primaryText:	'#263D69',
		secondaryText:	'#282726',
		background:		'#EEEDE7',
		activity: 		'#94B028',
		elevation: 		'#263D69',
	},
	orientation: 'portrait',
	layout: '1',
	theme: '1',
}

/* Actions */

interface SET_TITLE     { type: 'SET_TITLE';    payload: string;}
interface SET_SUBTITLE  { type: 'SET_SUBTITLE'; payload: string;}
interface SET_ORIENTATION { type: 'SET_ORIENTATION'; payload: ORIENTATION;}

interface SET_LAYOUT { type: 'SET_LAYOUT'; payload: LAYOUT;}

interface SET_THEME { type: 'SET_THEME'; payload: THEME;}

interface SET_COLOR { type: COLOR; payload: string;}


type Action = SET_ORIENTATION | SET_LAYOUT | SET_THEME | SET_TITLE | SET_SUBTITLE | SET_COLOR;

/* Actions */

export const createReducer = (state: PageState, action: Action): PageState => {
	 switch (action.type) {
		 case 'SET_TITLE':
			 return { ...state, text: {...state.text, title: action.payload}};
		 case 'SET_SUBTITLE':
			 return { ...state, text: {...state.text, subtitle: action.payload}};
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

		 default:
			 return state;
	 }
}

