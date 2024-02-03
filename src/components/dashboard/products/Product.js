import styles from '@/styles/components/dashboard/ProductList.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageByUrl } from '@/services/ImageService';

export default function Product({ KeyIndex, ProdInfo, client }) {

    const [productImages, setProductImages] = useState('');
    

    const fetchProductImages = async () => {
        console.log("ProdInfo.id")
        console.log(ProdInfo.id)
        let { data: Image, error } = await client
        .from('Images')
        .select("*")
        .eq('parent_id', ProdInfo.id)

        try {
        if (Image && Image.length > 0) {
            let urls = []
            for (let i = 0; i < Image.length; i++) {
                urls.push(await getImageByUrl(client, Image[i].url))
            }

            if (urls.length > 0) {
                setProductImages(urls);
            }
            
        }
        }
        catch (error) {
            console.error('Error fetching product image:', error.message);
        }

        if (error)
            console.error('Error fetching product image:', error.message);

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
            <p>Produktnavn: {ProdInfo.product_name}</p>
            <p>Pris: {ProdInfo.price}</p>
            <p>Beskrivelse: {ProdInfo.product_descpription}</p>
            <p>Antall: {ProdInfo.quantity}</p>

        </div>
    );
}