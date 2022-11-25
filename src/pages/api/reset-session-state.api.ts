// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler( req: NextApiRequest, res: NextApiResponse) {
	/* if(req.method!=='POST'){
		res.status(400).json('Bad request');
		return
	}
	if(req.body.action !== 'reset'){
		res.status(400).json('Bad request');
		return
	} */
	try {
		const userInfo = req.session.userInfo;
		req.session.destroy();
		req.session.userInfo = userInfo;
		await req.session.save();
		res.status(200).json({success: true, message: 'State reset successfully!'});
	} catch (error:any) {
		console.warn(error)
		res.status(500).json({success: false, message: 'An unkonwn error occured!', detail: error.message});
	}
});
