import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Help from './help.page';

export default function About({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
       <Help/>

    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}