import React from 'react'
import Head from 'next/head'
import { createBrowserClient } from '@supabase/ssr'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  // Create a new Supabase Client for browser
  const [client] = useState(createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))

  return (
    <>
      <Head>
        <title>Lokal - lokale råvarer et tastetrykk unna</title>
      </Head>
      <SessionContextProvider 
        supabaseClient={client}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  )
}
 
export default MyApp