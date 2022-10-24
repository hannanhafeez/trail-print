// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

type Data = {
  name: string;
};

export default withSessionRoute(async function handler( req: NextApiRequest, res: NextApiResponse) {
		try {
			const deAuthUrl = 'https://www.strava.com/oauth/deauthorize'
			const deAuthRes = await fetch(deAuthUrl, {method: 'POST'});
			const deAuthResJson = await deAuthRes.json();
			req.session.destroy();
			console.log({deAuthResJson});
			res.json({success: true, message: 'Logged out successfully!'});
		} catch (error:any) {
			console.warn(error)
			res.json({success: false, message: 'Logged out successfully!', detail: error.message});
		}
});
