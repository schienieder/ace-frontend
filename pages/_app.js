import '../styles/globals.css'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Meta />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
