import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import AboutView from './view.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <AboutView/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}