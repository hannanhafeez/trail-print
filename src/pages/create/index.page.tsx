// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import { WEBSITE_NAME } from '../../constants/metadata';
import { PaperContextWrapper } from '../../store/context/PaperContext';
import CreatePageView from './view'

export default function CreatePage({ strava_connected } : InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Head>
                <title>{`${WEBSITE_NAME} - Create`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content={`${WEBSITE_NAME} - Create`} key="title" />
            </Head>
            <CreatePageView strava_connected={strava_connected}/>
        </>
    )
}


// Custom Layout to wrap the page within the User and company providers
CreatePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <PaperContextWrapper>{page}</PaperContextWrapper>
    );
};


import cookie from 'cookie'
import { API, baseUrl } from '../../constants/apiEndpoints';

export const getServerSideProps: GetServerSideProps = async function ({ req, res }) {
    // console.log('REQ HEADER COOKIE RAW: ', req.headers?.cookie);
    // console.log('REQ COOKIES RAW: ', req.cookies);
    // console.log('COOKIE: ', cookie.parse(req.headers?.cookie || 'null'));

    /* const state = await (await fetch(baseUrl + API.session_state)).json();
    console.log({state}); */

    const user = JSON.parse(cookie.parse(req.headers?.cookie || 'null').user || 'null');

    // const {session} = req;
    const epochSecondsNow = Math.round((new Date()).getTime()/1000);
    const difference = (user?.expires_at || 0) - epochSecondsNow;
    console.log({epochSecondsNow, difference});

    if(user && (difference <= 0)) // if difference is less than 5 minutes
    {
        const authTokenUrl = 'https://www.strava.com/api/v3/oauth/token?'
            + `&client_id=${process.env.STRAVA_CLIENT_ID}`
            + `&client_secret=${process.env.STRAVA_CLIENT_SECRET}`
            + `&grant_type=refresh_token`
            + `&refresh_token=${user.refresh_token}`

        try {
            const authTokenRes = await fetch(authTokenUrl, { method: 'POST' })
            const authTokenJson = await authTokenRes.json()
            const newUser = {
                code: user!.code,
                expires_at: authTokenJson.expires_at as number,
                refresh_token: authTokenJson.refresh_token as string,
                access_token: authTokenJson.access_token as string,
            }
            res.setHeader(
                "Set-Cookie",
                cookie.serialize('user', JSON.stringify(newUser), {
                    httpOnly: true,
                    secure: false,
                    maxAge: (60 * 60) * 24 * 30 * 12, 		// 1 hour * 24 * 30 * 12, (30 days) * 12
                    sameSite: 'lax',
                    path: '/'
                })
            )
            // await req.session.save();
            console.log('\n\n\n','Token Refreshed!!', '\n\n\n')
        } catch (e: any) {
            console.warn(e)
        }
    }

    // console.log(decode('_|tlEkuq|LBFiBgElIzRrCqB{DoJI?CF@P'))


    console.log({userInfo: user})
    return {
        props: {
            strava_connected: !!user?.refresh_token,
        }
    }
}