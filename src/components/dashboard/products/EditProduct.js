import styles from '@/styles/components/dashboard/EditProduct.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, TreeSelect } from 'antd';
import { formatToTreeData } from '@/utils/CategoryHandler'
import { fetchCategories } from '@/services/CategoryService'
import { postImage, postImageUrl, deleteImage, deleteImageUrl, fetchImagesUrls  } from '@/services/ImageService'
import { getUserId } from '@/services/UserService'
import { updateProduct } from '@/services/ProductService'

export default function EditProduct({product, client, productImages, emitRefresh}) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState(''); 
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState(''); 
    const [productCategoryId, setProductCategoryId] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [mappedTree, setMappedTree] = useState([]);
    const [imageDisplay, setImageDisplay] = useState([]);
    const [shouldRemoveImage, setShouldRemoveImage] = useState(false);
    const [originalImageUrls, setOriginalImageUrls] = useState([]);

    // Open add product panel
    async function openEditProductPanel() {
        setLoading(true);
        setForm();
        try {
            const imageUrls = await fetchImagesUrls(client, product.id);
            console.log(imageUrls)
            if (imageUrls && imageUrls.length > 0) {
                setOriginalImageUrls(imageUrls);
                console.log(imageUrls[0].url)
            }
            else {
                openNotificationError("Produktet mangler bilde", "Bildene kunne ikke hentes")
            }
        }
        catch (error) {
            console.error('Error fetching product image:', error.message);
            openNotificationError("Noe gikk galt", "Bildene kunne ikke hentes for produktet")
        }
        setOpen(true);
        setLoading(false);
    }

    function setForm() {
        console.log(product)
        setProductName(product.product_name);
        setProductDescription(product.product_description);
        setProductPrice(product.price);
        setProductStock(product.quantity);
        setProductCategoryId(product.category_id);
        setUploadedImages([]);
        setImageDisplay(productImages);
        
    }

    // Handle upload image
    async function handleUploadImage(e)  {
        if(uploadedImages.length < 1) {
            try {
            const imageFile = e.target.files[0];
            setUploadedImages([...uploadedImages, imageFile])
            setImageDisplay([...imageDisplay, URL.createObjectURL(imageFile)])
            setShouldRemoveImage(true)
            }
            catch(error) {
                openNotificationError("Noe gikk galt", "Bildene ble ikke lastet opp")
            }
        }
        else {
            openNotificationError("PS", "Du kan ikke laste opp flere enn 1 bilde")
        }
    }

    function removeImage(index) {
        let newImages = uploadedImages
        newImages.splice(index, 1)
        let newImageDisplay = imageDisplay
        newImageDisplay.splice(index, 1)
        setUploadedImages([...newImages])
        setImageDisplay([...newImageDisplay])
        setShouldRemoveImage(true)
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
            let fetchedCategories = await fetchCategories(client)
            let count = 0
            while (count < 4)
            {
                fetchedCategories = await fetchCategories(client)
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

    async function removeImageFromProduct() { //TODO: loop when there are allowed multiple images
        let hadOriginalImage = true;
        try {
            if(originalImageUrls.length === 0) {
                hadOriginalImage = false;
            }
            else {
                await deleteImage(client, originalImageUrls[0].url)

                await deleteImageUrl(client, product.id)
            }
        }
        catch(error) {
            console.log(error)
            if(hadOriginalImage) {
                openNotificationError("Noe gikk galt", "Bildet ble ikke fjernet fra produktet")
            }
            else {
                console.log("Produktet hadde ikke bilde fra før, men det ble lagt til et nå.")
            }
        }
    }

    async function executeUpdateProduct() {
        try{
            const productId = await updateProduct(client, product.id,
                productName, productDescription, productPrice, productStock, productCategoryId
                )

            if(shouldRemoveImage) {
                await removeImageFromProduct()
            }


            if(uploadedImages.length > 0) {

                for(let i = 0; i < uploadedImages.length; i++) {
                    const image = uploadedImages[i]
                    const userId = await getUserId(client)
                    const imageId = await postImageUrl(client, userId, productId)
                    const response = await postImage(client, image, imageId, userId)
                }
            }
            setOpen(false)
            openNotificationSuccess("Produktet ble endret", "Produktet ble oppdatert i databasen")
            emitRefresh()
 
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

        if(productCategoryId === product.category_id && 
            productName === product.product_name && 
            productDescription === product.product_description && 
            productPrice === product.price && 
            productStock === product.quantity && 
            !shouldRemoveImage) {
            openNotificationError("Ingen endringer", "Du må gjøre endringer for å oppdatere produktet")
            return;
        }

        setLoading(true);

        try {
            await executeUpdateProduct()
        }
        catch (error) {
            openNotificationError("Noe gikk galt", "Produktet ble ikke lagt til i databasen")
        }

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <button className={styles.editButton} onClick={openEditProductPanel}>
                Endre produkt
            </button>
            <div className={`${styles.panel} ${open ? styles.open : ''}`}>
                <span className={`${styles.closeButton} material-symbols-outlined`} onClick={() => setOpen(false)}>
                    close
                </span>
                <h1 className={styles.title}>Endre produkt</h1>
                <div className={styles.form}>
                    <div className={styles.left}>
                        <div className={styles.imageUploadContainer}>
                            {imageDisplay.length} / 1
                            {imageDisplay.length > 0 && (
                                <div className={styles.imageUpload}>
                                    {
                                        imageDisplay.map((image, index) => (
                                            <div key={index} className={styles.imageContainer}>
                                                <span className="material-symbols-outlined" 
                                                    onClick={() => removeImage(index)}>
                                                    close
                                                </span>
                                                <Image src={image} width={100} height={100} alt={`opplastet bilde ${index}`}/>
                                            </div>
                                        ))
                                    }

                                </div>
                            )}
                            
                            <div className={styles.imageUpload}>
                                <span className="material-symbols-outlined">
                                    Image
                                    <br />
                                    <input id="image" type="file" accept="image/jpeg" name="image" onChange={
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
                                dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                                style={{ width: '100%', marginBottom: '1rem' }}
                                treeData={mappedTree}
                                placeholder="Velg en kategori"
                                treeDefaultExpandAll
                                allowClear
                                showSearch
                                value={productCategoryId}
                                treeNodeFilterProp='title'
                                onChange={(value) => setProductCategoryId(value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <button className={styles.submitButton} onClick={handleSubmit}>
                                Oppdater produkt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Spin spinning={loading} fullscreen />
        </div>
    );
}