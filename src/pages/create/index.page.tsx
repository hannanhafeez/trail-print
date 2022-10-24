// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { InferGetServerSidePropsType } from 'next';
import { withSessionSsr } from '../../lib/withSession'
import CreatePageView from './view'

export default function CreatePage({ strava_connected } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <CreatePageView strava_connected={strava_connected}/>
    )
}

import { decode, encode } from "@googlemaps/polyline-codec";

export const getServerSideProps = withSessionSsr(async function ({ req }) {
    const {session} = req;
    const epochSecondsNow = Math.round((new Date()).getTime()/1000);
    const difference = (session.userInfo?.expires_at || 0) - epochSecondsNow;
    console.log({epochSecondsNow, difference});

    if(session.userInfo && (difference <= 0)) // if difference is less than 5 minutes
    {
        const authTokenUrl = 'https://www.strava.com/api/v3/oauth/token?'
            + `&client_id=${process.env.STRAVA_CLIENT_ID}`
            + `&client_secret=${process.env.STRAVA_CLIENT_SECRET}`
            + `&grant_type=refresh_token`
            + `&refresh_token=${session.userInfo.refresh_token}`

        try {
            const authTokenRes = await fetch(authTokenUrl, { method: 'POST' })
            const authTokenJson = await authTokenRes.json()
            req.session.userInfo = {
                code: req.session.userInfo!.code,
                expires_at: authTokenJson.expires_at as number,
                refresh_token: authTokenJson.refresh_token as string,
                access_token: authTokenJson.access_token as string,
            }
            await req.session.save();
            console.log('\n\n\n','Token Refreshed!!', '\n\n\n')
        } catch (e: any) {
            console.warn(e)
        }
    }

    // console.log(decode('_|tlEkuq|LBFiBgElIzRrCqB{DoJI?CF@P'))


    console.log({userInfo: session.userInfo})
    return {
        props: {
            strava_connected: !!session.userInfo?.refresh_token
        }
    }
})
