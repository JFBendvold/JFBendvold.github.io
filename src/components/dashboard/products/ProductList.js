import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Spin } from 'antd';
import { fetchProducts, fetchProductAmount, searchProducts } from '@/services/ProductService';
import Product from './Product';
import AddProduct from './AddProduct';

export default function ProductList({salesLocationId}) {
    const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState("");
    const [currentLower, setCurrentLower] = useState(0);
    const [upperBound, setUpperBound] = useState(1);

    useEffect(() => {
        setSelectedLocationId(salesLocationId)
    }, [])

    const nextPage = () => {
        setCurrentLower(currentLower + 10)
    }

    const prevPage = () => {
        if (currentLower - 10 < 0) {
            setCurrentLower(0)
        } else {
            setCurrentLower(currentLower - 10)
        }
    }


    const fetchAllProducts = async () => {
        if (!selectedLocationId) {
            setLoading(false); 
            return; 
        }
        setLoading(true)
        try {
            const fetchedUpperBound = await fetchProductAmount(supabase, search, selectedLocationId)
            setUpperBound(fetchedUpperBound)
            let prods;
            if(search.length > 0){
                prods = await searchProducts(supabase, search, selectedLocationId, currentLower, currentLower + 9)
                setCurrentLower(0)
            }
            else{
                prods = await fetchProducts(supabase, selectedLocationId, currentLower, currentLower + 9)
            }
           
            setProducts(prods)
            setLoading(false)
        }
        catch (error) {
            console.error('Error fetching products:', error.message);
        }
    }

    const searchForProducts = async (searchKeyword) => {
        setSearch(searchKeyword)
        setLoading(true)
        try {
            const products = await searchProducts(supabase, searchKeyword, selectedLocationId, currentLower, currentLower + 9)
            setProducts(products)
            setLoading(false)
        }
        catch (error) {
            console.error('Error fetching products:', error.message);
        }
    }

    const handleChildRefresh = async () => {
        await fetchAllProducts()
    };


    //Re-fetches the current items when 
    useEffect(() => {
        fetchAllProducts()
    }, [selectedLocationId, upperBound, currentLower, search])

    //Resets the current lower bound when the location is changed
    useEffect(() => {
        setCurrentLower(0)
    }, [selectedLocationId])

    return (
        <div className={styles.productContainer}>
            <h1>Registrerte produkter</h1>
            <div>
                <label htmlFor="search">Søk opp produkt</label>
                <input type="text" id="search" name="search" onChange={(e) => searchForProducts(e.target.value)} />
            </div>
            <div className={styles.paginationContainer}>
                <p className={styles.intervalText}>{currentLower + 1} til {currentLower + 10}</p>
                <button onClick={prevPage} disabled={currentLower === 0}>Forrige</button>
                <button onClick={nextPage} disabled={currentLower + 11 > upperBound}>Neste</button>
            </div>
            {loading && <Spin />}
            {products.length === 0 && !loading && <p>Ingen produkter</p>}
            {products.length > 0 && !loading && (
                <div className={styles.productList}>
                    {products.map((product, index) => (
                        <Product key={index} KeyIndex={index} ProdInfo={product} client={supabase} salesLocationId={selectedLocationId} emitRefresh={handleChildRefresh}/>
                    ))}
                </div>
            )}
            <AddProduct salesLocationId={`${selectedLocationId}`} emitRefresh={handleChildRefresh}/>
        </div>
    );
}