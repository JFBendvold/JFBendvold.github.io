import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, Modal } from 'antd';
import { fetchProducts, fetchProductAmount, searchProducts } from '@/services/ProductService';
import { fetchEstablishmentsIds } from '@/services/EstablishmentService';
import { fetchLocationsByEstablishmentId } from '@/services/LocationService';
import Product from './Product';

export default function ProductList() {
    const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState("");
    const [currentLower, setCurrentLower] = useState(0);
    const [upperBound, setUpperBound] = useState(1);

    const fetchLocations = async () => {
        try {
            const establishmentIds = await fetchEstablishmentsIds(supabase)

            const locations = await fetchLocationsByEstablishmentId(supabase, establishmentIds[0].id)
        
        if (locations && locations.length > 0) {
            setLocationList(locations);
            if(locations[0].id){
                setSelectedLocationId(locations[0].id);
            } 
        }
        }
        catch (error) {
            console.error('Error fetching:', error.message);
        }
    }

    const test = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user) 
    }

    useEffect(() => {
        console.log('Fetching user')
        test()
        fetchLocations()
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


    const fetchAllProducts = async () => { //TODO: reset count
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

    useEffect(() => {
        fetchAllProducts()
    }, [selectedLocationId, upperBound, currentLower, search])


    return (
        <div className={styles.productContainer}>
            <h1>Registrerte produkter</h1>
            {locationList.length > 0 && (
                <div>
                    <label htmlFor="location">Velg utsalgssted</label>
                    <select name="location" id="location" onChange={(e) => setSelectedLocationId(e.target.value)}>
                        {locationList.map((location, index) => (
                            <option key={index} value={location.id}>{location.sales_location_name}</option>
                        ))}
                    </select>
                </div>
            )}
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
                        <Product key={index} KeyIndex={index} ProdInfo={product} client={supabase}/>
                    ))}
                </div>
            )}
        </div>
    );
}