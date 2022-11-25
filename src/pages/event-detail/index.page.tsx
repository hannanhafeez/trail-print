import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { HOME } from '../../constants/pageLinks';
import EventDetailView from './event_detail.page';

export default function EventDetail({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <EventDetailView/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        redirect: {
            destination: HOME,
            permanent: false
        }
    }
}