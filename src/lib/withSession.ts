import { PageState } from './../store/slices/createPageSlice';
// lib/withSession.ts

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
} from "next";


declare module "iron-session" {
	interface IronSessionData {
		user?: {
			code: string;
			expires_at: number;
			refresh_token: string;
			access_token: string;
		};
	}
}

const sessionOptions = {
	password: (process.env.SECRET_COOKIE_PASSWORD as string) || '',
	cookieName: "Trailprints_STRAVA",
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
		// maxAge: (60 * 60) * 24 * 30 * 12 , 		// 1 hour * 24 * 30 * 12, (30 days) * 12
	},
};

export function withSessionRoute(handler: NextApiHandler) {
	return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
	P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
	handler: (
		context: GetServerSidePropsContext,
	) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
	return withIronSessionSsr(handler, sessionOptions);
}