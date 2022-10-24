// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { baseUrl } from "../../constants/apiEndpoints";

export default function handler( req: NextApiRequest, res: NextApiResponse) {

	const authUrl = 'https://www.strava.com/oauth/authorize?'
					+ `client_id=${process.env.STRAVA_CLIENT_ID}`
					+ '&response_type=code'
					+ `&redirect_uri=${baseUrl}/api/update-auth/exchange_token&approval_prompt=force`
					+ '&scope=activity:read_all,read_all'
	res.redirect(307, authUrl);
};
