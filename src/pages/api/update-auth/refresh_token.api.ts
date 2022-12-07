import { baseUrl } from '../../../constants/apiEndpoints';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";

import cookie from 'cookie';

type Data = {
  success: boolean,
  message: string,
  detail?: any,
};

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

	console.log(req.cookies.user);
	const userInfo = JSON.parse(cookie.parse(req.headers?.cookie || 'null').user || 'null');

	if (userInfo && userInfo.refresh_token){
		const authTokenUrl = 'https://www.strava.com/api/v3/oauth/token?'
			+ `&client_id=${process.env.STRAVA_CLIENT_ID}`
			+ `&client_secret=${process.env.STRAVA_CLIENT_SECRET}`
			+ `&grant_type=refresh_token`
			+ `&refresh_token=${userInfo.refresh_token}`

		try {
			const authTokenRes = await fetch(authTokenUrl, {method: 'POST'})
			const authTokenJson = await authTokenRes.json()
			const user = {
				code: req.session.user!.code,
				expires_at: authTokenJson.expires_at as number,
				refresh_token: authTokenJson.refresh_token as string,
				access_token: authTokenJson.access_token as string,
			}
			res.setHeader(
				"Set-Cookie",
				cookie.serialize('user', JSON.stringify(user), {
					httpOnly: true,
					secure: false,
					maxAge: (60 * 60) * 24 * 30 * 12, 		// 1 hour * 24 * 30 * 12, (30 days) * 12
					sameSite: 'lax',
					path: '/'
				})
			)
			// await req.session.save();
			console.log("AFTER SAVE:", { userInfo: user })
			res.json({ success: true, message: 'Token refresh successfull!' });
		} catch (e: any) {
			console.warn(e)
			res.json({success: false, message: 'Token refresh failed!', detail: e.message});
		}
	} else{
		res.json({success: false, message: 'Token refresh failed!', detail: "Not connected to STRAVA."});
	}
};