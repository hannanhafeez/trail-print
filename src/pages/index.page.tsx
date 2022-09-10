import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (<div></div>)
}
export default Home;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { HOME } from '../constants/pageLinks';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // your fetch function here 

  return {
    redirect:{
      destination: HOME,
      permanent: false
    }
  }
}
