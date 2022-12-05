import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head';
import { WEBSITE_NAME } from '../../constants/metadata';
import CheckOut from './checkout';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Head>
                <title>{`${WEBSITE_NAME} - Checkout`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content={`${WEBSITE_NAME} - Checkout`} key="title" />
            </Head>
            <CheckOut/>
        </>
    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {

        }
    }
}