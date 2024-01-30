import styles from '@/styles/utselger/dashboard.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProductList from '@/components/dashboard/products/ProductList';
import AddProduct from '@/components/dashboard/products/AddProduct';

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

    // Page variables
    const [expandedSalesLocations, setExpandedSalesLocations] = useState(false);

    // Get data from database
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);

        let establishment = await getEstablishment();
        await getSalesLocations(establishment.id);

        setLoading(false);
    }

    // Get establishment
    async function getEstablishment() {
        const { data: establishments, error } = await supabase.from('Establishments').select();

        if (error) {
            openNotificationError(error.message);
        } else {
            console.log(establishments);
            setEstablishment(establishments[0]);

            // If no establishment, open create establishment modal
            if (establishments.length === 0) {
                openCreateEstablishmentModal();
            }
        }

        return establishments[0];
    }

    // Get sales locations, with the establishment id
    async function getSalesLocations(estId) {
        await supabase.from('Sales_locations').select('*').eq('establishment_id', estId).then(({ data: salesLocations, error }) => {
            if (error) {
                openNotificationError(error.message);
            } else {
                console.log(salesLocations);
                setSalesLocations(salesLocations);
                setSelectedSalesLocation(salesLocations[0].id);
            }
        });
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

    // Navbar item click
    function navbarItemClick(nav) {
        setNav(nav);
        router.push(`/utselger/dashboard?nav=${nav}`);
    }

    return (
        <main className={styles.main}>
            <div className={styles.leftContainer}>
                <div className={styles.navbar}>
                    <div className={styles.navbarHeader} onClick={() => setExpandedSalesLocations(!expandedSalesLocations)}>
                        <h1 className={styles.navbarHeaderText}>{salesLocations ? salesLocations.find(salesLocation => salesLocation.id === selectedSalesLocation).sales_location_name : ''}</h1>
                        <span className={`material-symbols-outlined ${expandedSalesLocations ? styles.navbarHeaderIconExpanded : ''}`}>
                            {expandedSalesLocations ? 'expand_less' : 'expand_more'}
                        </span>
                    </div>
                    <div className={`${styles.navbarSalesLocations} ${expandedSalesLocations ? styles.navbarSalesLocationsExpanded : ''}`}>
                        {salesLocations ? salesLocations.map(salesLocation => (
                            <div className={`${styles.navbarSalesLocation} ${selectedSalesLocation === salesLocation.id ? styles.navbarSalesLocationSelected : ''}`} onClick={() => setSelectedSalesLocation(salesLocation.id)} key={salesLocation.id}>
                                <p className={styles.navbarSalesLocationText}>{salesLocation.sales_location_name}</p>
                            </div>
                        )) : ''}
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'dashboard' ? styles.active : ''}`} onClick={() => navbarItemClick('dashboard')}>
                        <span className="material-symbols-outlined">
                            grid_view
                        </span>
                        <p className={styles.navbarItemText}>Dashboard</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'location-settings' ? styles.active : ''}`} onClick={() => navbarItemClick('location-settings')}>
                        <span className="material-symbols-outlined">
                            storefront
                        </span>
                        <p className={styles.navbarItemText}>Utsalg</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'economy' ? styles.active : ''}`} onClick={() => navbarItemClick('economy')}>
                        <span className="material-symbols-outlined">
                            payments
                        </span>
                        <p className={styles.navbarItemText}>Økonomi</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'orders' ? styles.active : ''}`} onClick={() => navbarItemClick('orders')}>
                        <span className="material-symbols-outlined">
                            orders
                        </span>
                        <p className={styles.navbarItemText}>Ordre</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'products' ? styles.active : ''}`} onClick={() => navbarItemClick('products')}>
                        <span className="material-symbols-outlined">
                            inventory_2
                        </span>
                        <p className={styles.navbarItemText}>Produkter</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'employees' ? styles.active : ''}`} onClick={() => navbarItemClick('employees')}>
                        <span className="material-symbols-outlined">
                            group
                        </span>
                        <p className={styles.navbarItemText}>Ansatte</p>
                    </div>
                    <div className={`${styles.navbarItem} ${nav === 'settings' ? styles.active : ''}`} onClick={() => navbarItemClick('settings')}>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                        <p className={styles.navbarItemText}>Innstillinger</p>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <DashboardHeader />
                {nav === 'dashboard' ? (
                    <div className={styles.content}>
                        <h1>Dashboard</h1>
                    </div>
                ) : nav === 'location-settings' ? (
                    <div className={styles.content}>
                        <h1>Utsalg</h1>
                    </div>
                ) : nav === 'economy' ? (
                    <div className={styles.content}>
                        <h1>Økonomi</h1>
                    </div>
                ) : nav === 'orders' ? (
                    <div className={styles.content}>
                        <h1>Ordre</h1>
                    </div>
                ) : nav === 'products' ? (
                    <div className={styles.content}>
                        <ProductList />
                        <AddProduct />
                    </div>
                ) : nav === 'employees' ? (
                    <div className={styles.content}>
                        <h1>Ansatte</h1>
                    </div>
                ) : nav === 'settings' ? (
                    <div className={styles.content}>
                        <h1>Innstillinger</h1>
                    </div>
                ) : ''}
            </div>
            <Spin spinning={loading} fullscreen />
        </main>
    )
}