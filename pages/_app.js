import Head from 'next/head'
import '../public/styles/styles.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-circular-progressbar/dist/styles.css';
import '../public/styles/react-datetime.scss'
import '../public/styles/styles.scss'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tôi đọc</title>
        <meta name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Palatino%20Linotype:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <Component {...pageProps} />

      <ToastContainer />
    </>
  )
}
