import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, Modal } from 'antd';
import { fetchProducts } from '@/services/ProductService';
import Product from './Product';

export default function ProductList() {
    const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const fetchAllProducts = async () => {
        setLoading(true)
        const prods = await fetchProducts(supabase)
        setProducts(prods)
        setLoading(false)
    }

    // Fetch products

    useEffect(() => {
        fetchAllProducts()
    }, [])

    useEffect(() => {
        console.log(products)
    }, [products]);

    return (
        <div className={styles.productContainer}>
            <h1>Registrerte produkter</h1>
            {loading && <Spin />}
            {products.length === 0 && !loading && <p>Ingen produkter registrert</p>}
            {products.length > 0 && !loading && (
                <div className={styles.productList}>
                    {products.map((product, index) => (
                        <Product key={index} KeyIndex={index} ProdInfo={product}/>
                    ))}
                </div>
            )}
        </div>
    );
}