import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Preview from './preview.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <Preview/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}