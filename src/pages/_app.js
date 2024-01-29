import React from 'react'
import Head from 'next/head'
import { createBrowserClient } from '@supabase/ssr'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState, useEffect, useLayoutEffect } from 'react'
import { setKey } from 'react-geocode'
import { useRouter } from 'next/router'
import { openNotificationWarning } from '../utils/Notifications'

const publicPages = ["/", "/utselger", "/utselger/login", "/utselger/registrer"]

// Gets the auth session from Supabase
const fetchSession = async (client) => {
  const { data, error } = await client.auth.getSession()
  if (error) throw error
  return data
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Create a new Supabase Client for browser
  const [client] = useState(createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))
  setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  
  const [authenticated, setAuthenticated] = useState(false)

  // Fetch session data from Supabase
  useEffect(() => {

    try {
      const session = fetchSession(client)
      setAuthenticated(session !== null)
    } catch (error) {
      console.log(error)
      openNotificationWarning("Advarsel", "Vennligst prøv igjen senere.")

    }

  }, [])

  // Redirect to home page if not authenticated
  if(!authenticated && !publicPages.includes(router.pathname)) {
    router.replace("/")
  }

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