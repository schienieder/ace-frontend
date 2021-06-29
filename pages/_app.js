import '../styles/globals.css'
import Layout from '../components/Layout'
import Meta from '../components/Meta'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Meta />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
