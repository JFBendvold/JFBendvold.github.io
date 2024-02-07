import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageByUrl, fetchImagesUrls } from '@/services/ImageService';
import { unlistProduct } from '@/services/ProductService';
import EditProduct from './EditProduct';

export default function Product({ KeyIndex, ProdInfo, client, salesLocationId }) {

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

    //TODO: add later when RLS is decided on - which users should be able to unlist products?
    const executeUnlistProduct = async () => {
        console.log('Unlisting product:', ProdInfo)
        try {
            const response = await unlistProduct(client, ProdInfo.id);
        }
        catch (error) {
            console.error('Error unlisting product:', error.message);
        }
    }

    useEffect(() => {
        fetchProductImages();
    }, []);

    return (
        <div key={KeyIndex} className={styles.productItemContainer}>
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
            <div className={styles.buttonContainer}>
                <button className={styles.productButton} onClick={() => executeUnlistProduct()}>Skjul produktannonse</button>
                <EditProduct product={ProdInfo} client={client} salesLocationId={salesLocationId} productImages={productImages} />
            </div>
        </div>
    );
}