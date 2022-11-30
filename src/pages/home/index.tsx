// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import HomeView from './view';

export default function Home({} /* : InferGetServerSidePropsType<typeof getServerSideProps> */) {
    return <HomeView/>;
}

/* 
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return {
        props: {
            
        }
    }
}
 */