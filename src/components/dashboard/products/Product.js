import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageByUrl, fetchImagesUrls } from '@/services/ImageService';
import { unlistProduct, listProduct } from '@/services/ProductService';
import EditProduct from './EditProduct';

export default function Product({ KeyIndex, ProdInfo, client, salesLocationId, onAction }) {

    const [productImages, setProductImages] = useState('');
    
    const fetchProductImages = async () => {
        try {
            let imagesUrlsFetched = await fetchImagesUrls(client, ProdInfo.id);

            if (imagesUrlsFetched && imagesUrlsFetched.length > 0) {
                let urls = []
                for (let i = 0; i < imagesUrlsFetched.length; i++) {
                    urls.push(await getImageByUrl(client, imagesUrlsFetched[i].url))
                }

                if (urls.length > 0) {
                    setProductImages(urls);
                }
                
            }
        }
        catch (error) {
            console.error('Error fetching product image:', error.message);
        }
    }

    const executeUnlistProduct = async () => {
        console.log('Unlisting product:', ProdInfo)
        try {
            const response = await unlistProduct(client, ProdInfo.id);
            onAction()
        }
        catch (error) {
            console.error('Error unlisting product:', error.message);
        }
    }

    const executeListProduct = async () => {
        console.log('Listing product:', ProdInfo)
        try {
            const response = await listProduct(client, ProdInfo.id);
            onAction()
        }
        catch (error) {
            console.error('Error listing product:', error.message);
        }
    }

    useEffect(() => {

        fetchProductImages();
    }, []);

    return (
        <div key={KeyIndex} className={`${styles.productItemContainer} ${ProdInfo.unlisted_at ? styles.unlisted : ''}`}>
            {
                productImages && productImages.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt="Produktbilde"
                        width={100}
                        height={100}
                    />
                ))
            }
            <p><b>Produktnavn:</b> {ProdInfo.product_name}</p>
            <p><b>Pris:</b> {ProdInfo.price} kr</p>
            <p><b>Beskrivelse:</b> {ProdInfo.product_description}</p>
            <p><b>Antall:</b> {ProdInfo.quantity === -1 ? 'Ubegrenset': ProdInfo.quantity + ' stk'}</p>
            {ProdInfo.unlisted_at != null&& <p><b>Annonse skjult: </b> {ProdInfo.unlisted_at} </p>}

            <div className={styles.buttonContainer}>
                {ProdInfo.unlisted_at != null && <button className={styles.productButtonList} onClick={() => executeListProduct()}>Gjenopprett produktannonse</button>}
                {ProdInfo.unlisted_at == null && <button className={styles.productButtonUnlist} onClick={() => executeUnlistProduct()}>Skjul produktannonse</button>}
                <EditProduct product={ProdInfo} client={client} salesLocationId={salesLocationId} productImages={productImages} onAction={onAction}/>
            </div>
        </div>
    );
}