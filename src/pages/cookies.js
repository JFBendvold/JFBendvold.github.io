import styles from '../style/cookie.module.css'
import Link from 'next/link'
import BouncyTitle from '@/components/BouncyTitle'
import ArrowLink from '@/components/ArrowLink'

export default function Cookie() {
    return (
        <main className={styles.main}>
            <BouncyTitle title="Cookies" />
            <ArrowLink href="/" />
            <div className={styles.content}>
                <h1>
                    Cookie Policy for <Link href="/">TokenTrivia</Link>
                </h1>
                <p>
                    This is the Cookie Policy for TokenTrivia, accessible from <Link href="/cookies">this link.</Link>
                </p>
                <h1>
                What Are Cookies
                </h1>
                <p>
                As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however, this may downgrade or 'break' certain elements of the site's functionality.
                </p>
                <p>
                    For more information on cookies, please refer to the <Link href="https://www.cookieconsent.com/what-are-cookies/">What Are Cookies</Link> article on Cookie Consent website.
                </p>
                <h1>
                How We Use Cookies
                </h1>
                <p>
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
                </p>
                <h1>
                Disabling Cookies
                </h1>
                <p>
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser's "Help" option on how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies.
                </p>
                <h1>
                The Cookies We Set
                </h1>
                <h2>
                Account-related cookies
                </h2>
                <p>
                If you create an account with us, we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out, but in some cases, they may remain afterward to remember your site preferences when logged out.
                </p>
                <h2>
                Login related cookies
                </h2>
                <p>
                We use cookies when you are logged in to remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
                </p>
                <h2>
                Site preferences cookies
                </h2>
                <p>
                In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page affected by your preferences.
                </p>


                <h1>
                    Terms and Conditions
                </h1>

                <p>These terms and conditions outline the basic rules and guidelines for the use of TokenTrivia's Website</p>
                <p>By accessing this website, you are implicitly accepting the listd terms. </p>

                <h2>Licensing</h2>
                <p>All intellectual property rights are reserved, but feel free to reach out and request any material from the developers. TokenTrivia is primarily for your own personal use.</p>

                <h2>Your Privacy</h2>
                <p>We take your privacy concern with seriousness. Please read Cooky Policy for further info.</p>

                <h2>Reservation of Rights</h2>
                <p>We reserve the right to request that you remove all links or any particular link to our Website.</p>

                <h2>Removal of links from our website</h2>
                <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment by using the "Feedback"-section when logged in. We will consider requests to remove links but we are not obligated to or so or to respond to you directly. This function is reserved members.</p>

                <h2>Refunds and Lost Blockchain transactions</h2>
                <p>TokenTrivia is not responsible for any lost transactions. We do not offer refunds for any transactions.</p>

                <h2>Disclaimer about Questions Displayed in Quizzes</h2>
                <p>We do not ensure that the information on this website is updated or correct.</p>
                <p>We will listen to feedback on questions, but the owners of the application have sole responsibility for the content of the questions.</p>

                <p>We do not recommend gambling-addicts to use the site. For more info please call [12344 Placeholder Number]. For professional help, refer to [12345 Placeholder Number]</p>

            </div>
        </main>
    )
}