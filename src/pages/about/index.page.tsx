import { GetServerSidePropsContext } from 'next'
import Head from 'next/head';
import { WEBSITE_NAME } from '../../constants/metadata';
import AboutView from './view';

export default function About() {
    return (
        <>
            <Head>
                <title>{`${WEBSITE_NAME} - About`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content={`${WEBSITE_NAME} - About`} key="title" />
            </Head>
            <AboutView/>
        </>
    );
}


export async function getStaticProps(ctx: GetServerSidePropsContext) {
    return {
        props: {} as never,
    }
}