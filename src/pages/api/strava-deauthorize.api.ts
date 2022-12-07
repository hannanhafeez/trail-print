// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import cookie from 'cookie';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
		try {
			const deAuthUrl = 'https://www.strava.com/oauth/deauthorize'
			const deAuthRes = await fetch(deAuthUrl, {method: 'POST'});
			const deAuthResJson = await deAuthRes.json();
			res.setHeader(
				"Set-Cookie",
				cookie.serialize('user', '', {
					httpOnly: true,
					secure: false,
					expires: new Date(0),
					sameSite: 'lax',
					path: '/'
				})
			)
			console.log({deAuthResJson});
			res.json({success: true, message: 'Logged out successfully!'});
		} catch (error:any) {
			console.warn(error)
			res.json({success: false, message: 'Logged out successfully!', detail: error.message});
		}
};
