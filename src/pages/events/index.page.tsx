import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { HOME } from '../../constants/pageLinks';
import Events from './events.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <Events/>
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