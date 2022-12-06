import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head';
import { ReactElement } from 'react';
import { WEBSITE_NAME } from '../../constants/metadata';
import { PaperContextWrapper } from '../../store/context/PaperContext';
import CheckOut from './checkout';

export default function Checkout({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

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

// Custom Layout to wrap the page within the User and company providers
Checkout.getLayout = function getLayout(page: ReactElement) {
    return (
        <PaperContextWrapper>{page}</PaperContextWrapper>
    );
};


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {

        }
    }
}