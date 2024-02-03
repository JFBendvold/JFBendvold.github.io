import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, Modal } from 'antd';
import { fetchProducts, fetchProductAmount } from '@/services/ProductService';
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
        const { data: EstablishmentsIds, error1 } = await supabase.from("Establishments").select("id")

        const { data, error } = await supabase.from("Sales_locations").select("*").eq("establishment_id", EstablishmentsIds[0].id)
        if (data && data.length > 0) {
            setLocationList(data);
            if(data[0].id){
                setSelectedLocationId(data[0].id);
                const fetchedUpperBound = await fetchProductAmount(supabase, data[0].id)
                setUpperBound(fetchedUpperBound)
            } 
        } else if (error) {
            console.error('Error fetching locations:', error.message);
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    // useEffect(() => {
    //     console.log(locationList)
    // }, [locationList]);

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
            // console.log("selectedLocationId is not set yet");
            setLoading(false); 
            return; 
        }
        setLoading(true)
        // console.log("Trying to fetch products for location: " + selectedLocationId)
        try {
            const prods = await fetchProducts(supabase, selectedLocationId, currentLower, currentLower + 9)
            setProducts(prods)
            setLoading(false)
        }
        catch (error) {
            console.error('Error fetching products:', error.message);
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [selectedLocationId])

    useEffect(() => {
        fetchAllProducts()
    }, [currentLower])

    // useEffect(() => {
    //     console.log(products)
    // }, [products]);

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
            <div className={styles.paginationContainer}>
                <p>{currentLower + 1} til {currentLower + 10}</p>
                {currentLower !== 0 && <button onClick={prevPage}>Forrige</button>}
                {currentLower + 10 <= upperBound && <button onClick={nextPage}>Neste</button> }
            </div>
            {loading && <Spin />}
            {products.length === 0 && !loading && <p>Ingen produkter registrert</p>}
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