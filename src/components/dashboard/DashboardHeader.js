import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/components/DashboardHeader.module.css";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

export default function DashboardHeader() {
    const [user, setUser] = useState(null);

    // Supabase client
    const supabaseClient = useSupabaseClient();

    // Router
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        supabaseClient.auth.getUser().then((user) => {
            //console.log(user.data.user);
            setUser(user.data.user);
        }).catch((error) => {
            console.log(error);
        });
    }, [supabaseClient]);

    // Handle logout
    async function handleLogout() {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.log(error);
        } else {
            console.log('Logged out');
            router.push('/utselger');
        }
    }

    return (
        <header className={styles.header}>
            <p className={styles.headerTitle}>
                {user ? 'Velkommen tilbake, ' + user?.user_metadata.full_name : 'Hei, ukjent'}
            </p>
            <button className={styles.headerButton} onClick={handleLogout}>
                Logg ut
            </button>
        </header>
    );
}
