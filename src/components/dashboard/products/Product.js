import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageByUrl, fetchImagesUrls } from '@/services/ImageService';

export default function Product({ KeyIndex, ProdInfo, client }) {

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

        </div>
    );
}