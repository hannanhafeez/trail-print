import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head';
import { ReactElement } from 'react';
import { WEBSITE_NAME } from '../../constants/metadata';
import { PaperContextWrapper } from '../../store/context/PaperContext';
import PreviewView from './preview';

export default function Preview({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <title>{`${WEBSITE_NAME} - Preview`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content={`${WEBSITE_NAME} - Preview`} key="title" />
            </Head>
            <PreviewView/>
        </>
    );
}

// Custom Layout to wrap the page within the User and company providers
Preview.getLayout = function getLayout(page: ReactElement) {
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