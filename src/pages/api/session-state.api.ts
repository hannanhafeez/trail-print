import { PageState } from '../../store/slices/createPageSlice';
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = JSON.parse(req.cookies.user || 'null');
	if(req.method === 'GET'){
		res.status(200).json({state: user});
		return
	}else{
		res.status(500).json({ message: 'Invalid request.' })
	}

})
