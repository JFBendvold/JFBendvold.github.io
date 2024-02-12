import styles from '@/styles/components/dashboard/EditProduct.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin, Select } from 'antd';
import { postImage, postImageUrl, deleteImage, deleteImageUrl } from '@/services/ImageService'
import { getUserId } from '@/services/UserService'
import { fetchLocationTypes } from '@/services/LocationTypeService'
import { updateLocation } from '@/services/LocationService'
import { fetchImagesUrls } from '@/services/ImageService'

export default function EditLocation({location, client, locationImages, emitRefresh}) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    //RELATED TO IMAGES
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageDisplay, setImageDisplay] = useState([]);
    const [shouldRemoveImage, setShouldRemoveImage] = useState(false);

    //RELATED TO Location
    const [locationName, setLocationName] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [locationZipCode, setLocationZipCode] = useState('');
    const [locationPhone, setLocationPhone] = useState('');
    const [locationLng, setLocationLng] = useState('');
    const [locationLat, setLocationLat] = useState('');
    const [locationType, setLocationType] = useState('');
    const [locationTypes, setLocationTypes] = useState([])
    const [originalImageUrls, setOriginalImageUrls] = useState([])

    // Open add product panel
    async function openEditLocationPanel() {
        setLoading(true);
        setForm();
        try {
            const imageUrls = await fetchImagesUrls(client, location.id);
            console.log("Image urls: ")
            console.log(imageUrls)
            if (imageUrls && imageUrls.length > 0) {
                setOriginalImageUrls(imageUrls);
                console.log(imageUrls[0].url)
            }
            else {
                openNotificationError("Utsalget mangler bilde", "Bildene kunne ikke hentes")
            }
        }
        catch (error) {
            console.error('Error fetching product image:', error.message);
            openNotificationError("Noe gikk galt", "Bildene kunne ikke hentes for utsalget")
        }
        setOpen(true);
        setLoading(false);
    }

    function setForm() {
        console.log("Location: ")
        console.log(location)
        setLocationName(location.sales_location_name);
        setLocationDescription(location.sales_location_description);
        setLocationAddress(location.address);
        setLocationZipCode(location.zip_code);
        setLocationPhone(location.sales_location_tlf);
        setLocationLng(location.lng);
        setLocationLat(location.lat);
        setLocationType(location.type_id);
        setImageDisplay(locationImages)
        setUploadedImages([]);
    }

    // Handle upload image
    async function handleUploadImage(e)  {
        if(uploadedImages.length === 0 && imageDisplay.length !== 1) { //TODO: handle when there are allowed multiple images
            try {
            const imageFile = e.target.files[0]
            console.log(imageFile)
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

    useEffect(() => {
        setAllLocationTypes()
    }, [])


    async function setAllLocationTypes() {
        try {
            const fetchedTypes = await fetchLocationTypes(client)
            setLocationTypes(fetchedTypes)
        }
        catch(error) {
            openNotificationError("Noe gikk galt", "Typene kunne ikke hentes for utsalgsstedene")
        }   
    }

    async function removeImageFromLocation() { //TODO: loop when there are allowed multiple images
        let hadOriginalImage = true;
        try {
            if(originalImageUrls.length === 0) {
                hadOriginalImage = false;
            }
            else {
                await deleteImage(client, originalImageUrls[0].url)

                await deleteImageUrl(client, location.id)
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

    async function executeUpdateLocation() {
        try{
            const locationId = await updateLocation(client, {
                id: location.id,
                sales_location_name: locationName,
                sales_location_description: locationDescription,
                address: locationAddress,
                zip_code: locationZipCode,
                sales_location_tlf: locationPhone,
                lng: locationLng,
                lat: locationLat,
                type_id: locationType
            })

            if(shouldRemoveImage) {
                await removeImageFromLocation()
            }

            if(uploadedImages.length > 0) {

                for(let i = 0; i < uploadedImages.length; i++) {
                    const image = uploadedImages[i]
                    const userId = await getUserId(client)
                    const imageId = await postImageUrl(client, userId, locationId)
                    const response = await postImage(client, image, imageId, userId)
                    openNotificationSuccess("Bilde lastet opp", "Bildet lastes opp.. Vent litt for å se endringene")
                }
            }
            setOpen(false)
            openNotificationSuccess("Utsalget ble endret", "Utsalget ble oppdatert i databasen")
            emitRefresh()
 
        }
        catch(error) {
            console.log(error)
            openNotificationError("Noe gikk galt", "Utsalget ble ikke oppdatert i databasen")
        }
    }

    // Executes actions for when the user submits the form for adding a new product
    async function handleSubmit(e) {
        e.preventDefault();

        if (locationName === '') {
            openNotificationError('Navn mangler', 'Du må skrive inn et navn for utsalget');
            return;
        }

        if (locationAddress === '') {
            openNotificationError('Adresse mangler', 'Du må skrive inn en adresse for utsalget');
            return;
        }

        if (locationZipCode === '') {
            openNotificationError('Postkode mangler', 'Du må skrive inn en postkode for utsalget');
            return;
        }

        if (locationPhone === '') {
            openNotificationError('Telefonnummer mangler', 'Du må skrive inn et telefonnummer for utsalget');
            return;
        }

        if (locationLng === '') {
            openNotificationError('Lengdegrad mangler', 'Du må skrive inn en lengdegrad for utsalget');
            return;
        }

        if (locationLat === '') {
            openNotificationError('Breddegrad mangler', 'Du må skrive inn en breddegrad for utsalget');
            return;
        }

        if (locationType === '') {
            openNotificationError('Utsalgstype mangler', 'Du må velge en type for utsalget');
            return;
        }
        console.log("Location: ")
        console.log(location)


        if(locationName === location.sales_location_name && 
            locationDescription === location.sales_location_description && 
            locationAddress === location.address && 
            locationZipCode === location.zip_code && 
            locationPhone === location.sales_location_tlf && 
            locationLng === location.lng && 
            locationLat === location.lat && 
            locationType === location.type_id && !shouldRemoveImage) {
            openNotificationError("Ingen endringer", "Du må gjøre endringer for å oppdatere produktet")
            return;
        }

        setLoading(true);

        try {
            console.log("Execute update location")
            await executeUpdateLocation()
        }
        catch (error) {
            openNotificationError("Noe gikk galt", "Produktet ble ikke lagt til i databasen")
        }

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <button className={styles.editButton} onClick={openEditLocationPanel}>
                Endre utsalg
            </button>
            <div className={`${styles.panel} ${open ? styles.open : ''}`}>
                <span className={`${styles.closeButton} material-symbols-outlined`} onClick={() => setOpen(false)}>
                    close
                </span>
                <h1 className={styles.title}>Endre utsalg</h1>
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
                    {location && <div className={styles.right}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Navn på utsalget</label>
                            <input className={styles.input} type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Beskrivelse</label>
                            <textarea className={styles.input} value={locationDescription} onChange={(e) => setLocationDescription(e.target.value)} />
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Adresse</label>
                            <input className={styles.input} type="text" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} />
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Postkode</label>
                            <input className={styles.input} type="text" value={locationZipCode} onChange={(e) => setLocationZipCode(e.target.value)} />
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Telefon</label>
                            <input className={styles.input} type="text" value={locationPhone} onChange={(e) => setLocationPhone(e.target.value)} />
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Lengdegrad</label>
                            <input className={styles.input} type="text" value={locationLng} onChange={(e) => setLocationLng(e.target.value)} />
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Breddegrad</label>
                            <input className={styles.input} type="text" value={locationLat} onChange={(e) => setLocationLat(e.target.value)} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Type utsalg</label>
                            <Select value={locationType} onChange={(value) => setLocationType(value)}>
                                {locationTypes && locationTypes.map((type, index) => (
                                    <Select.Option key={index} value={type.id}>
                                        {type.type_name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className={styles.inputContainer}>
                            <button className={styles.submitButton} onClick={handleSubmit}>
                                Oppdater utsalg
                            </button>
                        </div>
                    </div> }
                </div>
            </div>
            <Spin spinning={loading} fullscreen />
        </div>
    );
}