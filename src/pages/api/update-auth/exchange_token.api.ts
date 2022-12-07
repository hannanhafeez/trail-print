import { baseUrl } from './../../../constants/apiEndpoints';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";

import cookie from 'cookie'
import { CREATE } from '../../../constants/pageLinks';


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
	console.log(req.query);
	const { /* state, */ code, /* scope, error */ } = req.query;

	if(code){
		const authTokenUrl = 'https://www.strava.com/api/v3/oauth/token?'
			+ `&client_id=${process.env.STRAVA_CLIENT_ID}`
			+ `&client_secret=${process.env.STRAVA_CLIENT_SECRET}`
			+ `&code=${code}`
			+ `&grant_type=authorization_code`

		try {
			const authTokenRes = await fetch(authTokenUrl, {method: 'POST'})
			const authTokenJson = await authTokenRes.json()
			console.log({authTokenJson})
			const user = {
				code: code as string,
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
			res.setHeader('Location', baseUrl + '/create?noAuth=true');

			console.log("AFTER SAVE:",{userInfo: user})
		} catch (e) {
			console.warn(e)
			res.redirect(307, baseUrl + '/create?noAuth=true');
		}
		res.status(200).send(`<script>window.location.replace("${baseUrl + CREATE}");</script>`);
	} else{
		res.redirect(307, baseUrl + '/create?noAuth=true');
	}
};
