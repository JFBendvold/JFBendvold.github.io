import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { enforceGuard } from "../utils/RouterGuard.js";

function RouterWrapper({ Component, pageProps }) {
    const router = useRouter();

     useEffect(() => {
         const handleRouteChange = () => {
             enforceGuard(router);
         }
         handleRouteChange();

         router.events.on('routeChangeStart', handleRouteChange);

         return () => {
             router.events.off('routeChangeStart', handleRouteChange);
        };
     }, [router]);

    return <Component {...pageProps} />;
}

export default RouterWrapper;
