import { createContext, Dispatch, FC, useContext, useReducer } from "react";
import { Action, createReducer, PageState, pageState } from "../slices/createPageSlice";

const dispatch = () => {}

export const PaperContext = createContext<{ pageState: PageState, dispatch: Dispatch<Action> }>({pageState, dispatch});


export const PaperContextWrapper = ({children}:{children: any})=>{
	const [state, dispatch] = useReducer(createReducer, pageState)

	return(
		<PaperContext.Provider value={{pageState: state, dispatch}}>
			{children}
		</PaperContext.Provider>
	)
}

export const usePaperContext = ()=> useContext(PaperContext);