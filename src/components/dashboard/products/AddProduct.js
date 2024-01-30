import styles from '@/styles/components/dashboard/AddProduct.module.css';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, TreeSelect } from 'antd';

export default function AddProduct() {
    const supabase = useSupabaseClient();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // Open add product panel
    async function openAddProductPanel() {
        setLoading(true);

        //TODO: Fetch tags

        setOpen(true);
        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <button className={styles.addButton} onClick={openAddProductPanel}>
                <span className="material-symbols-outlined">
                    add
                </span>
            </button>
            <div className={`${styles.panel} ${open ? styles.open : ''}`}>
                <span className={`${styles.closeButton} material-symbols-outlined`} onClick={() => setOpen(false)}>
                    close
                </span>
                <h1 className={styles.title}>Legg til produkt</h1>
            </div>
            <Spin spinning={loading} fullscreen />
        </div>
    );
}