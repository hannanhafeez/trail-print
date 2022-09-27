// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import CreatePageView from './view'

export default function CreatePage({} /* : InferGetServerSidePropsType<typeof getServerSideProps> */) {
    return (
        <CreatePageView/>
    )
}

/* 
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    resetServerContext();
    return {
        props: {
        }
    }
}
 */