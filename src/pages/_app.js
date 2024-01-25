import React from 'react'
import Head from 'next/head'
 
function MyApp({ Component, pageProps }) {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

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