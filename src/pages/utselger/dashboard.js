import styles from '@/styles/utselger/dashboard.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { createBrowserClient } from '@supabase/ssr'
import { setKey } from 'react-geocode'

// Gets the auth session from Supabase
const fetchSession = async (client) => {
    const { data, error } = await client.auth.getSession()
    if (error) throw error
    return data
  } //TODO: change to prop passing

export default function Dashboard() {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const { confirm } = Modal;
    const [loading, setLoading] = useState(false);
    const [nav, setNav] = useState('dashboard'); // dashboard, location-settings, economy, orders, products, employees, settings

    // User variables
    const [establishment, setEstablishment] = useState(null);
    const [salesLocations, setSalesLocations] = useState(null);
    const [selectedSalesLocation, setSelectedSalesLocation] = useState(null); // id
    const [client] = useState(createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))
    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    
    const [authenticated, setAuthenticated] = useState(false)

    // Get data from database
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);

        try {
            const session = fetchSession(client)
            setAuthenticated(session !== null)
          } catch (error) {
            console.log(error)
            openNotificationWarning("Advarsel", "Vennligst prøv igjen senere.")
          }

        await getEstablishment();

        setLoading(false);
    }

    // Get establishment
    async function getEstablishment() {
        await supabase
            .from('Establishments')
            .select('*')
            .then(({ data: establishments, error }) => {
                if (error) {
                    openNotificationError(error.message)
                } else {
                    console.log(establishments);
                    setEstablishment(establishments[0])

                    // If no establishment, open create establishment modal
                    if (establishments.length === 0 && authenticated) {                       
                        openCreateEstablishmentModal()
                    }
                }
        });
    }

    // Get sales locations
    async function getSalesLocations() {
        //TODO: Get sales locations
    }

    // Open create establishment modal
    function openCreateEstablishmentModal() {
        confirm({
            title: 'Du er ikke registrert som utselger',
            icon: <ExclamationCircleOutlined />,
            content: 'Ønsker du å registrere deg som utselger?',
            okText: 'Registrer',
            cancelText: 'Avbryt',
            okButtonProps: {
                style: {
                    backgroundColor: '#84A59D',
                },
            },
            onOk() {
                Modal.destroyAll();
                router.push('/utselger/registrer');
            },
            onCancel() {
                Modal.destroyAll();
                router.push('/');
            },
        });
    }

    return (
        <main className={styles.main}>
            <div className={styles.leftContainer}>
                <div className={styles.navbar}>
                    <div className={`${styles.navbarItem} ${nav === 'dashboard' ? styles.active : ''}`} onClick={() => setNav('dashboard')}>
                        <span className="material-symbols-outlined">
                            grid_view
                        </span>
                        <p className={styles.navbarItemText}>Dashboard</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'location-settings' ? styles.active : ''}`} onClick={() => setNav('location-settings')}>
                        <span className="material-symbols-outlined">
                            storefront
                        </span>
                        <p className={styles.navbarItemText}>Utsalg</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'economy' ? styles.active : ''}`} onClick={() => setNav('economy')}>
                        <span className="material-symbols-outlined">
                            payments
                        </span>
                        <p className={styles.navbarItemText}>Økonomi</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'orders' ? styles.active : ''}`} onClick={() => setNav('orders')}>
                        <span className="material-symbols-outlined">
                            orders
                        </span>
                        <p className={styles.navbarItemText}>Ordre</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'products' ? styles.active : ''}`} onClick={() => setNav('products')}>
                        <span className="material-symbols-outlined">
                            inventory_2
                        </span>
                        <p className={styles.navbarItemText}>Produkter</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'employees' ? styles.active : ''}`} onClick={() => setNav('employees')}>
                        <span className="material-symbols-outlined">
                            group
                        </span>
                        <p className={styles.navbarItemText}>Ansatte</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'settings' ? styles.active : ''}`} onClick={() => setNav('settings')}>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                        <p className={styles.navbarItemText}>Innstillinger</p>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <DashboardHeader />
            </div>
            <Spin spinning={loading} fullscreen />
        </main>
    )
}