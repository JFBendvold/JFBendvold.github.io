import styles from '@/styles/utselger/registrer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError } from '@/utils/Notifications';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { fromAddress } from 'react-geocode';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

export default function Registrer() {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    // Process information
    const [processStep, setProcessStep] = useState(0);
    const [types, setTypes] = useState([
        { id: 1, name: 'Gårdsutsalg' },
        { id: 2, name: 'Gartneri' },
        { id: 3, name: 'Fiskeutsalg' },
        { id: 4, name: 'Bakstutsalg' },
        { id: 5, name: 'Tekstilutsalg' },
        { id: 6, name: 'Antikvitetsutsalg' },
        { id: 7, name: 'Kunstutsalg' },
        { id: 8, name: 'Andre utsalg' }
    ]);
    const [selectExpanded, setSelectExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Personal information
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');

    // Establishment information
    const [establishmentName, setEstablishmentName] = useState('MVP AS');
    const [establishmentAccountNumber, setEstablishmentAccountNumber] = useState('1234.56.78901');

    // Company information
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCoordinates, setCompanyCoordinates] = useState({ lat: 63.4305, lng: 10.3951 });
    const [companyZip, setCompanyZip] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    // Legal information
    const [terms, setTerms] = useState(false);

    // Fetch types from Supabase
    useEffect(() => {
        async function fetchTypes() {
            const { data, error } = await supabaseClient
                .from('Sales_location_types')
                .select('*');
            if (error) {
                console.log(error);
            } else {
                console.log(data);
                setTypes(data);
            }
        }
        fetchTypes();
    }, []);

    // When changing personal phone, change establishment phone if empty
    function changePhone(newPhone) {
        if (companyPhone === '' || companyPhone === phone) {
            setCompanyPhone(newPhone);
        }
        setPhone(newPhone);
    }

    // When selecting a type, close the select
    useEffect(() => {
        setSelectExpanded(false);
    }, [companyType]);

    // Next step from personal information
    function nextStepPersonal() {
        // Check if all fields are filled
        if (firstName === '' || lastName === '' || phone === '' || dob === '' || address === '' || zip === '') {
            openNotificationError('Feil', 'Fyll inn alle feltene');
        } else {
            setProcessStep(1);
        }
    }

    // Next step from establishment information
    function nextStepEstablishment() {
        // Check if all fields are filled
        if (establishmentName === '') {
            openNotificationError('Feil', 'Fyll inn alle feltene');
        } else {
            setProcessStep(2);
        }
    }

    // Next step from company information
    function nextStepCompany() {
        // Check if all fields are filled
        if (companyName === '' || companyType === '' || companyAddress === '' || companyZip === '' || companyPhone === '' || companyDescription === '') {
            openNotificationError('Feil', 'Fyll inn alle feltene');
        } else {
            // Next step
            let address = companyAddress + ' ' + companyZip;
            fromAddress(address).then(response => {
                console.log(response);
                setCompanyCoordinates(response.results[0].geometry.location);
            }).catch(error => {
                console.log(error);
            });
            setProcessStep(3);
        }
    }

    // Set coordinates
    function setCoordinates(event) {
        console.log(event);
        setCompanyCoordinates(event.latLng.toJSON());
    }

    // Submit application
    async function submitApplication() {
        setLoading(true);
        if (!terms) {
            openNotificationError('Feil', 'Du må godta vilkårene og betingelsene for å sende inn søknaden');
            setLoading(false);
            return;
        }

        // Check if all fields are filled
        
        // Update user information
        const { data: user, error: userError } = await supabaseClient.auth.updateUser({
            data: {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                dob: dob,
                address: address,
                zip: zip
            },
            phone: phone
        })

        if (userError) {
            openNotificationError(userError.message);
            setLoading(false);
            return;
        }

        // Insert establishment
        const { data: establishment, error: establishmentError } = await supabaseClient.from('Establishments').insert([
            {
                establishment_name: establishmentName,
                account_number: establishmentAccountNumber,
                seller_id: user.id
            }
        ]);

        if (establishmentError) {
            openNotificationError(establishmentError.message);
            setLoading(false);
            return;
        }

        // Insert company
        const { data: company, error: companyError } = await supabaseClient.from('Sales_locations').insert([
            {
                sales_location_name: companyName,
                type_id: types.find(type => type.type_name === companyType).id,
                address: companyAddress,
                lat: companyCoordinates.lat,
                lng: companyCoordinates.lng,
                zip_code: companyZip,
                sales_location_tlf: companyPhone,
                description: companyDescription,
                establishment_id: establishment[0].id
            }
        ]);

        if (companyError) {
            openNotificationError(companyError.message);
            return;
        }


        setLoading(false);
        router.push('/utselger/dashboard');
    }



    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <Image src="/icons/Logo.svg" alt="Logo" width={98} height={98} priority />
                </Link>
                <Link href="/">
                    Avbryt
                </Link>
            </header>
            {processStep === 0 && // Personal information
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Fortell oss litt mer om deg selv
                    </h1>
                    <form className={styles.form}>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                                <label htmlFor="firstName">Fornavn</label>
                                <input type="text" id="firstName" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Fornavn" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="lastName">Etternavn</label>
                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Etternavn" />
                            </div>
                        </div>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                                <label htmlFor="phone">Telefonnummer</label>
                                <input type="text" id="phone" name="phone" value={phone} 
                                onChange={e => changePhone(e.target.value)}
                                placeholder="Telefonnummer" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="dob">Fødselsdato</label>
                                <input type="date" id="dob" name="dob" value={dob} onChange={e => setDob(e.target.value)} placeholder="Fødselsdato" />
                            </div>
                        </div>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                                <label htmlFor="address">Adresse</label>
                                <input type="text" id="address" name="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresse" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="zip">Postnummer</label>
                                <input type="text" id="zip" name="zip" value={zip} onChange={e => setZip(e.target.value)} placeholder="Postnummer" />
                            </div>
                        </div>
                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.button} onClick={nextStepPersonal}>
                                Neste
                            </button>
                        </div>
                    </form>
                </section>
            }
            {processStep === 1 && // Establishment information
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Fortell oss litt om din bedrift
                    </h1>
                    <form className={styles.form}>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                                <label htmlFor="establishmentName">Navn</label>
                                <input type="text" id="establishmentName" name="establishmentName" value={establishmentName} onChange={e => setEstablishmentName(e.target.value)} placeholder="Navn" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="establishmentAccountNumber">Kontonummer</label>
                                <input type="text" id="establishmentAccountNumber" name="establishmentAccountNumber" value={establishmentAccountNumber} onChange={e => setEstablishmentAccountNumber(e.target.value)} placeholder="Kontonummer" />
                            </div>
                        </div>
                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(0)}>
                                Tilbake
                            </button>
                            <button type="button" className={styles.button} onClick={nextStepEstablishment}>
                                Neste
                            </button>
                        </div>
                    </form>
                </section>
            }
            {processStep === 2 && // Company information
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Fortell oss litt om utsalgsstedet
                    </h1>
                    <form className={styles.form}>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                                <label htmlFor="companyName">Navn</label>
                                <input type="text" id="companyName" name="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Navn" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="companyType">Type</label>
                                <div className={styles.selectWrapper}>
                                    <div className={styles.select} onClick={() => setSelectExpanded(!selectExpanded)}>
                                        <span>{companyType === '' ? 'Velg type' : companyType}</span>
                                        <span className="material-symbols-outlined">
                                            {selectExpanded ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </div>
                                    {selectExpanded &&
                                        <div className={styles.selectOptions}>
                                            {types.map(type => (
                                                <div className={styles.selectOption} key={type.id} onClick={() => setCompanyType(type.type_name)}>
                                                    {type.type_name}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                                <label htmlFor="companyAddress">Adresse</label>
                                <input type="text" id="companyAddress" name="companyAddress" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} placeholder="Adresse" />
                            </div>
                            <div className={styles.inputColumn}>
                                <label htmlFor="companyZip">Postnummer</label>
                                <input type="text" id="companyZip" name="companyZip" value={companyZip} onChange={e => setCompanyZip(e.target.value)} placeholder="Postnummer" />
                            </div>
                        </div>
                        <div className={styles.inputRow}>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="companyPhone">Telefonnummer</label>
                                <input type="text" id="companyPhone" name="companyPhone" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} placeholder="Telefonnummer" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="companyDescription">Beskrivelse</label>
                                <input type="text" id="companyDescription" name="companyDescription" value={companyDescription} onChange={e => setCompanyDescription(e.target.value)} placeholder="Beskrivelse" />
                            </div>
                        </div>
                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(1)}>
                                Tilbake
                            </button>
                            <button type="button" className={styles.button} onClick={nextStepCompany}>
                                Neste
                            </button>
                        </div>
                    </form>
                </section>
            }
            {processStep === 3 && // Pinpoint location on map
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Plasser utsalgsstedet på kartet
                    </h1>
                    <form className={styles.form}>
                        <div className={styles.mapContainer}>
                            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                                <Map 
                                center={companyCoordinates} 
                                zoom={15} 
                                className={styles.map}
                                fullscreenControl={false}
                                streetViewControl={false}
                                keyboardShortcuts={false}
                                >
                                    <Marker position={companyCoordinates}
                                    onDragEnd={e => setCoordinates(e)}
                                    draggable={true}
                                    />
                                </Map>
                            </APIProvider>
                        </div>
                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(2)}>
                                Tilbake
                            </button>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(4)}>
                                Neste
                            </button>
                        </div>
                    </form>
                </section>
            }
            {processStep === 4 && // Confirm information
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Bekreft søknaden din
                    </h1>
                    <form className={styles.form}>
                        <div className={styles.box}>
                            <h2 className={styles.boxTitle}>
                                Personlig informasjon
                            </h2>
                            <div className={styles.boxContent}>
                                <p className={styles.boxText}>
                                    {firstName} {lastName}
                                </p>
                                <p className={styles.boxText}>
                                    {phone}
                                </p>
                                <p className={styles.boxText}>
                                    {dob}
                                </p>
                                <p className={styles.boxText}>
                                    {address}, {zip}
                                </p>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <h2 className={styles.boxTitle}>
                                Bedriftsinformasjon
                            </h2>
                            <div className={styles.boxContent}>
                                <p className={styles.boxText}>
                                    {establishmentName}
                                </p>
                                <p className={styles.boxText}>
                                    {establishmentAccountNumber}
                                </p>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <h2 className={styles.boxTitle}>
                                Utsalgsstedinformasjon
                            </h2>
                            <div className={styles.boxContent}>
                                <p className={styles.boxText}>
                                    {companyName}
                                </p>
                                <p className={styles.boxText}>
                                    {companyType}
                                </p>
                                <p className={styles.boxText}>
                                    {companyAddress}, {companyZip}
                                </p>
                                <p className={styles.boxText}>
                                    {companyPhone}
                                </p>
                                <p className={styles.boxText}>
                                    {companyDescription}
                                </p>
                            </div>
                        </div>
                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(3)}>
                                Tilbake
                            </button>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(5)}>
                                Neste
                            </button>
                        </div>
                    </form>
                </section>
            }
            {processStep === 5 && // Terms and conditions
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Vilkår og betingelser
                    </h1>
                    <form className={styles.form}>
                        <div className={styles.checkboxWrapper}>
                            <div className={styles.checkbox} onClick={() => setTerms(!terms)}>
                                <span className="material-symbols-outlined">
                                    {terms ? 'check_box' : 'check_box_outline_blank'}
                                </span>
                            </div>
                            <span className={styles.checkboxText}>
                                Jeg godtar vilkårene og betingelsene for å være utselger hos Lokal
                            </span>
                        </div>
                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.button} onClick={() => setProcessStep(4)}>
                                Tilbake
                            </button>
                            <button type="button" className={styles.button} onClick={submitApplication}>
                                Send inn
                            </button>
                        </div>
                    </form>
                </section>
            }
            <Spin spinning={loading} fullscreen/>
        </main>
    )
}