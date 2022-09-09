import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Home from './home.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <Home/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}