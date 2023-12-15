import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { validateToken } from "@/services/AuthService.js";
import { showLoadingScreen, hideLoadingScreen } from '@/utils/LoadingProvider';
import LoadingScreen from "@/components/LoadingScreen";
import { openNotificationInfo } from '@/utils/Notifications';

//Verifies that the user object has all the required attributes
const hasRequiredUserAttributes = (user) => {

  const requiredAttributes = ['name', 'email', 'country', 'timestamp', 'avatar_url', 'style', 'tokens'];

  return requiredAttributes.every(attr => user.hasOwnProperty(attr));
}

//This is a supercomponent that wraps the following public pages: index.js, login.js, register.js
export default function PublicWrapper({ children }) {
  const router = useRouter();
  const mainRef = useRef(null);

  const validate = async () => {
    try {
      const response = await validateToken()
      if (response.status === 200) {
        const user = localStorage.getItem('user')
        if (user && hasRequiredUserAttributes(JSON.parse(user))) {
          router.push('/dashboard')
          openNotificationInfo("Already logged in")
        }
        else {
          console.log("User is not logged in");
        }
      }
    } catch (error) {
      console.log("The user was not logged in");
    }
  };

  useEffect(() => {
    showLoadingScreen();
    mainRef.current.style.opacity = 1;
    if (!window.Cypress) {
    setTimeout(() => {
        validate().then(() => {
          hideLoadingScreen();
        });
      }, 600);
    } else {
      hideLoadingScreen();
    }
  }, []);

  return (
    <main ref={mainRef}>
      {children}
      <LoadingScreen />
    </main>
  );
}
