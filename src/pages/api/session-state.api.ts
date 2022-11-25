import { PageState } from '../../store/slices/createPageSlice';
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

const REDUCER_STATE_ID = "@REDUCER_STATE_ID"

export function isPageState(obj: any): obj is PageState{
	// 👇️ check for type property
	return 	"text" in obj &&
			"trails" in obj &&
			"geoJson" in obj &&
			"valueLabels" in obj &&
			"orientation" in obj &&
			"layout" in obj &&
			"theme" in obj &&
			"colors" in obj &&
			"elevationProfile" in obj &&
			"useDashedLined" in obj &&
			"endpoints" in obj &&
			"activityThickness" in obj &&
			"mapStyle" in obj;
}

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {

	if(req.method === 'GET'){
		res.status(200).json({state: req.session.reducerState});
		return
	}

	if(req.method === 'POST'){
		const stateStr = req.body.stateStr;
		console.log(req.body)
		if(stateStr === undefined || stateStr === '' || typeof(stateStr) === 'object'){
			res.status(400).json({ success: false, message: 'Bad request.' });
			return
		}
		try {
			const stateJson = JSON.parse(stateStr);
			if(typeof(stateJson)!=='object'){
				res.status(400).json({ success: false, message: 'Bad request.' });
				return
			}
			if (isPageState(stateJson)){
				req.session.reducerState = stateJson;
				await req.session.save();
				res.status(200).json({ success: true, message: 'State saved successfully.' });
				return
			}
			res.status(400).json({ success: false, message: 'Bad request.' });
		} catch (e) {
			console.warn("Error saving state:", e)
			res.status(500).json({ success: false, message: 'An unknown error occured.' });
		}
	}

})
