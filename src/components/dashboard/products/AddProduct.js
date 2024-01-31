import styles from '@/styles/components/dashboard/AddProduct.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, TreeSelect } from 'antd';
import { formatToTreeData } from '@/utils/CategoryHandler'
import { createProduct } from '@/services/ProductService'
import { fetchCategories } from '@/services/CategoryService';

export default function AddProduct({salesLocationId}) {
    const supabase = useSupabaseClient();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]); 
    // Form data
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState(''); // Can be empty
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState(''); // -1 = unlimited
    const [productCategoryId, setProductCategoryId] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [mappedTree, setMappedTree] = useState([]);

    // Open add product panel
    async function openAddProductPanel() {
        setLoading(true);

        //TODO: Fetch tags

        setOpen(true);
        setLoading(false);
    }

    // Handle upload image
    async function handleUploadImage(e)  {
        if(uploadedImages.length < 3) {
            const imageFile = e.target.files[0];
            setUploadedImages([...uploadedImages, URL.createObjectURL(imageFile)])
        }
        else {
            openNotificationError("PS", "Du kan ikke laste opp flere enn 3 bilder")
        }
    }

    // Handle price change
    async function handlePriceChange(e) {
        const price = e.target.value;

        // Ensures that the user is required to enter a number with comma, not a dot
        if (price.includes('.')) {
            openNotificationError('Ugyldig pris', 'Tips: forsøk å bruk komma i stedet for punktum');
            return;
        }

        if (price < -1) {
            setProductPrice(-1);
        } else {
            setProductPrice(price);
        }
    }

    useEffect(() => {
        setFetchedCategories()
    }, [])


    async function setFetchedCategories() {
        try {
            let fetchedCategories = await fetchCategories(supabase)
            let count = 0
            while (count < 4)
            {
                fetchedCategories = await fetchCategories(supabase)
                if (fetchedCategories && fetchedCategories.length > 0) {
                    break;
                }
                count++
            }

            if (fetchedCategories && fetchedCategories.length > 0) {
                let sorted = formatToTreeData(fetchedCategories);
                setMappedTree(sorted);
            } else {
                openNotificationError("Noe gikk galt", "Kategoriene kunne ikke hentes for produktene")
            }
        }
        catch(error) {
            openNotificationError("Noe gikk galt", "Kategoriene kunne ikke hentes for produktene")
        }   

    }

    async function addProduct() {
        try{
            console.log("Sales location id")
            const response = await createProduct(supabase,
                salesLocationId, productName, productDescription, productPrice, productStock, productCategoryId
                )

            if (response) {
                openNotificationSuccess("Vellykket", "Produktet ble lagt til i databasen")
            }
        }
        catch(error) {
            console.log(error)
            openNotificationError("Noe gikk galt", "Produktet ble ikke lagt til i databasen")
        }
    }

    // Executes actions for when the user submits the form for adding a new product
    async function handleSubmit(e) {
        e.preventDefault();

        if (productName === '') {
            openNotificationError('Produktnavn mangler', 'Du må skrive inn et produktnavn');
            return;
        }

        if (productPrice === '') {
            openNotificationError('Produktpris mangler', 'Du må skrive inn en produktpris');
            return;
        }

        if (productStock === '') {
            openNotificationError('Produktlager mangler', 'Du må skrive inn antall på lager');
            return;
        }

        if (productCategoryId === '') {
            openNotificationError('Produktkategori mangler', 'Du må velge en produktkategori');
            return;
        }

        setLoading(true);

        try {
            await addProduct()
        }
        catch (error) {
            openNotificationError("Noe gikk galt", "Produktet ble ikke lagt til i databasen")
        }

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
                <h1 className={styles.title}>Legg til et nytt produkt</h1>
                <div className={styles.form}>
                    <div className={styles.left}>
                        <div className={styles.imageUploadContainer}>
                            {uploadedImages.length > 0 && (
                                <div className={styles.imageUpload}>
                                    {uploadedImages.map((image, index) => (
                                        <Image key={index} src={image} width={10} height={10} layout="fixed" alt="uploaded image"/>
                                    ))}
                                </div>
                            )}
                            
                                <div className={styles.imageUpload}>
                                    <span className="material-symbols-outlined">
                                        Image
                                        <br />
                                        <input id="image" type="file" accept="image/jpeg, image/png" name="image" onChange={
                                            (e) => {
                                                handleUploadImage(e)
                                            }
                                        }/>
                                    </span>
                                </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Produktnavn</label>
                            <input className={styles.input} type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Beskrivelse</label>
                            <textarea className={styles.input} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Pris</label>
                            <input className={styles.input} type="number" value={productPrice} onChange={(e) => handlePriceChange(e)} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Antall på lager (-1 = ubegrenset)</label>
                            <input className={styles.input} type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Kategori</label>
                            <TreeSelect
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                style={{ width: '100%', marginBottom: '1rem' }}
                                treeData={mappedTree}
                                placeholder="Velg en kategori"
                                treeDefaultExpandAll
                                allowClear
                                showSearch
                                onChange={(value) => setProductCategoryId(value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <button className={styles.submitButton} onClick={handleSubmit}>
                                Legg til produkt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Spin spinning={loading} fullscreen />
        </div>
    );
}