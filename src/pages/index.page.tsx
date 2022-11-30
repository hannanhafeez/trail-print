import type { NextPage } from 'next'
import Home from './home';

export default Home;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getStaticProps = async () => {
  // your fetch function here

  return {
    props: {} as never
  }
}
