import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ReactElement } from 'react';
import { PaperContextWrapper } from '../../store/context/PaperContext';
import PreviewView from './preview';

export default function Preview({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
       <PreviewView/>
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