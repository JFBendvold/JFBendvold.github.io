import styles from '@/styles/components/dashboard/AddProduct.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, TreeSelect } from 'antd';
import { formatToTreeData } from '@/utils/CategoryHandler';

export default function AddProduct() {
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
    async function handleUploadImage()  {
        alert('Upload image');
        //TODO: Upload image
    }

    // Handle price change
    async function handlePriceChange(e) {
        const price = e.target.value;

        // Dont allow dot, only comma
        if (price.includes('.')) {
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

    async function fetchAllCategories() {
        let { data: Categories, error } = await supabase
    .from('Categories')
    .select('*')
        
    setCategories(Categories)


    if(error) {
        console.log(error)
    }
    else {
        console.log("Categories")
        console.log(Categories)
    }

    }

    async function setFetchedCategories() {
        await fetchAllCategories()
        let sorted = formatToTreeData(categories)
        let count = 3
        while (count < 4 && sorted.length == 0)
        {
            await fetchAllCategories()
            count++
        }
        console.log(sorted)
        setMappedTree(sorted)

    }

    // Handle submit
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

        // Insert product into database
        //TODO: Insert product into database

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
                            {uploadedImages.length > 0 ? (
                                <div className={styles.imageUpload}>
                                    <Image src={uploadedImages[0]} width={100} height={100} />
                                </div>
                            ) : (
                                <div className={styles.imageUpload} onClick={handleUploadImage}>
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                </div>
                            )}
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
                            {/* <button onClick={checkCurrent}>Fetch</button> */}
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