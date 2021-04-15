import '../styles/globals.css'
import NextNProgress from '../components/NProgress/NextNProgress'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
