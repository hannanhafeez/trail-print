import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import AboutView from './view';

export default function About() {
    return <AboutView/>;
}


export async function getStaticProps(ctx: GetServerSidePropsContext) {
    return {
        props: {} as never,
    }
}