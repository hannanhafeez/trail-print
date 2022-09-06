import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Events from './events.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <Events/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}