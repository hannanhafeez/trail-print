// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler( req: NextApiRequest, res: NextApiResponse) {
	try {
		req.session.destroy();
		res.status(200).json({success: true, message: 'State reset successfully!'});
	} catch (error:any) {
		console.warn(error)
		res.status(500).json({success: false, message: 'An unkonwn error occured!', detail: error.message});
	}
});
