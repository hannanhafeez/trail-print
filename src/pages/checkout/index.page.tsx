import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import CheckOut from './checkout.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <CheckOut/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}