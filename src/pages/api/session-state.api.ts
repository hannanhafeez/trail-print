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
		res.status(200).json({state: req.session});
		return
	}else{
		res.status(500).json({ message: 'Invalid request.' })
	}

})
