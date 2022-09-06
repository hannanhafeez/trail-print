import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import EventDetail from './event_detail.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <EventDetail/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}