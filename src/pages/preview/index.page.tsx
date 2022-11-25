import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import PreviewView from './preview.page';

export default function Preview({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <PreviewView/>
    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {

        }
    }
}