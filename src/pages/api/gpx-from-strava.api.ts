// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { API } from '../../constants/apiEndpoints';
import { withSessionRoute } from '../../lib/withSession'

import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const {  body, method } = req;
	const userInfo = JSON.parse(cookie.parse(req.headers?.cookie || 'null').user || 'null');

	if(method !== 'POST'){
		res.status(500).json({ message: 'Invalid request.' })
		return;
	}

	if (!body.str || (typeof (body.str) !== 'string')){
		res.status(400).json({ message: 'Bad request.' })
		return;
	}

	console.log({userInfo})

	if (!userInfo){
		res.status(500).json({message: 'Not connected to STRAVA.'})
		return;
	}

	const epochSecondsNow = Math.round((new Date()).getTime() / 1000);
	const difference = (userInfo?.expires_at || 0) - epochSecondsNow;
	console.log({ epochSecondsNow, difference });


	if (userInfo && (difference <= 0)){
		try {
			const authTokenRes = await fetch(API.refresh_token)
			const authTokenJson = await authTokenRes.json()
			console.log('\nTOKEN UPDATE RESPONSE: \n', JSON.stringify(authTokenJson, null, 4), '\n\n')
		}catch(e:any){
			console.warn(e)
		}
	}

	var query = body.str as string;

	if (query.includes('https://www.strava.com/') || query.includes('http://www.strava.com/')){
		query = query.replace('https://www.strava.com/', '').replace('http://www.strava.com/', '')
		console.log(query);
		// res.json({query})
	}else{
		query = "activities/" + query;
	}
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${userInfo.access_token}`);

	var requestOptions = { method: 'GET', headers: myHeaders };

	try {
		const response = await fetch(`https://www.strava.com/api/v3/${query}`, requestOptions);
		const result = await response.json();
		// console.log({result})
		if (result.message === 'Record Not Found' || result.errors){
			res.status(500).json({message: result.message})
			return;
		}
		res.json({result})
		return
	} catch (e:any) {
		console.log('error', e)
	}

	res.status(500).json({ message: 'No data found!' })
}
