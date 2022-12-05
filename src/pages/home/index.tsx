// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head';
import { WEBSITE_NAME } from '../../constants/metadata';
import HomeView from './view';

export default function Home({} /* : InferGetServerSidePropsType<typeof getServerSideProps> */) {
    return(
    <>
        <Head>
            <title>{`${WEBSITE_NAME} - Home`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={`${WEBSITE_NAME} - Home`} key="title" />
        </Head>
        <HomeView/>
    </>
    )
}

/*
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {

        }
    }
}
 */