import { baseUrl } from './../../../constants/apiEndpoints';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";


export default withSessionRoute(async function handler( req: NextApiRequest, res: NextApiResponse) {
	console.log(req.query);
	const { state, code, scope, error } = req.query;

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
			req.session.user = {
				code: code as string,
				expires_at: authTokenJson.expires_at as number,
				refresh_token: authTokenJson.refresh_token as string,
				access_token: authTokenJson.access_token as string,
			}
			await req.session.save();
			console.log("AFTER SAVE:",{userInfo: req.session.user})
		} catch (e) {
			console.warn(e)
			res.redirect(307, baseUrl + '/create?noAuth=true');
		}
		res.redirect(307, baseUrl + '/create');
	} else{
		res.redirect(307, baseUrl + '/create?noAuth=true');
	}
});
