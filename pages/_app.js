import '../styles/globals.css'
import MainLayout from '../src/components/Layout/main-layout'

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
