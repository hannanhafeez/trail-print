import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { HOME } from '../../constants/pageLinks';
import EventsView from './events.page';

export default function Events({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <EventsView/>
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