// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
	try {
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
		res.status(200).json({success: true, message: 'State reset successfully!'});
	} catch (error:any) {
		console.warn(error)
		res.status(500).json({success: false, message: 'An unkonwn error occured!', detail: error.message});
	}
};