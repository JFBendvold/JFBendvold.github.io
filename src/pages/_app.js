import React from 'react'
import Head from 'next/head'
 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lokal - lokale råvarer et tastetrykk unna</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
 
export default MyApp