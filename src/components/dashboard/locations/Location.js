import styles from '@/styles/components/dashboard/Location.module.css'
import EditLocation from './EditLocation'
import { useEffect, useState } from 'react'
import { getImageByUrl, fetchImagesUrls } from '@/services/ImageService'
import Image from 'next/image'

export default function Location({ KeyIndex, LocationInfo, client, emitRefresh}) {

    const [status, setStatus] = useState(null)
    
    const [locationImages, setLocationImages] = useState('')

    const fetchLocationImages = async () => {
        try {
            let imagesUrlsFetched = await fetchImagesUrls(client, LocationInfo.id)
            console.log('Images fetched:', imagesUrlsFetched)

            if (imagesUrlsFetched && imagesUrlsFetched.length > 0) {
                let urls = []
                for (let i = 0; i < imagesUrlsFetched.length; i++) {
                    urls.push(await getImageByUrl(client, imagesUrlsFetched[i].url))
                }

                if (urls.length > 0) {
                    setLocationImages(urls)
                    console.log('Location images:', locationImages)
                }
                
            }
        }
        catch (error) {
            console.error('Error fetching location image:', error.message);
        }
    }

    useEffect(() => {
        const pendingStatus = LocationInfo.pending
        if (pendingStatus === 1) {
            setStatus('Verifisert utsalg')
        }
        else if(pendingStatus === 2) {
            setStatus('Ikke verifisert utsalg')
        }
        else {
            setStatus('Venter på verifisering')
        }
        try {
            fetchLocationImages();
        }
        catch (error) {
            console.error('Error fetching location image:', error.message);
        }
    }, [])

    useEffect(() => {
        fetchLocationImages();
    }, [LocationInfo])

    return (
        <div key={KeyIndex} className={styles.locationContainer}>
            {locationImages && locationImages.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt="Produktbilde"
                    width={100}
                    height={100}
                />
            ))}
            <h2>{LocationInfo.sales_location_name}</h2>
            <p><b>Beskrivelse: </b>{LocationInfo.sales_location_description}</p>
            <p><b>Adresse: </b>{LocationInfo.address}</p>
            <p><b>Postkode: </b>{LocationInfo.zip_code}</p>
            <p><b>Telefon: </b>{LocationInfo.sales_location_tlf}</p>
            <p><b>Lengdegrad: </b>{LocationInfo.lng}</p>
            <p><b>Breddegrad: </b>{LocationInfo.lat}</p>
            <p><b>Opprettet: </b>{LocationInfo.created_at}</p>
            {status && <p><b>Status: </b> {status}</p>}

            <EditLocation location={LocationInfo} locationImages={locationImages} client={client} emitRefresh={emitRefresh}/>
        </div>
    );
}
