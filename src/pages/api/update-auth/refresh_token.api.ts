import { baseUrl } from '../../../constants/apiEndpoints';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";

type Data = {
  success: boolean,
  message: string,
  detail?: any,
};

export default withSessionRoute(async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

	const {userInfo} = req.session;

	if (userInfo && userInfo.refresh_token){
		const authTokenUrl = 'https://www.strava.com/api/v3/oauth/token?'
			+ `&client_id=${process.env.STRAVA_CLIENT_ID}`
			+ `&client_secret=${process.env.STRAVA_CLIENT_SECRET}`
			+ `&grant_type=refresh_token`
			+ `&refresh_token=${userInfo.refresh_token}`

		try {
			const authTokenRes = await fetch(authTokenUrl, {method: 'POST'})
			const authTokenJson = await authTokenRes.json()
			req.session.userInfo = {
				code: req.session.userInfo!.code,
				expires_at: authTokenJson.expires_at as number,
				refresh_token: authTokenJson.refresh_token as string,
				access_token: authTokenJson.access_token as string,
			}
			await req.session.save();
			console.log("AFTER SAVE:", { userInfo: req.session.userInfo })
			res.json({ success: true, message: 'Token refresh successfull!' });
		} catch (e: any) {
			console.warn(e)
			res.json({success: false, message: 'Token refresh failed!', detail: e.message});
		}
	} else{
		res.json({success: false, message: 'Token refresh failed!', detail: "Not connected to STRAVA."});
	}
});
