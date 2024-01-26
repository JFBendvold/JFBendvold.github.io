import styles from '@/styles/utselger/registrer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError } from '@/utils/Notifications';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { fromAddress } from 'react-geocode';
import { Spin } from 'antd';

export default function Registrer() {
    // Supabase client
    const supabaseClient = useSupabaseClient();

    // Process information
    const [processStep, setProcessStep] = useState(0);
    const [selectExpanded, setSelectExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Personal information
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');

    // Establishment information
    const [establishmentName, setEstablishmentName] = useState('MVP AS');
    const [establishmentAccountNumber, setEstablishmentAccountNumber] = useState('');

    // Legal information
    const [terms, setTerms] = useState(false);

    // When changing personal email, change establishment email if empty
    function changeEmail(newEmail) {
        if (companyEmail === '' || companyEmail === email) {
            setCompanyEmail(newEmail);
        }
        setEmail(newEmail);
    }

    // When changing personal phone, change establishment phone if empty
    function changePhone(newPhone) {
        if (companyPhone === '' || companyPhone === phone) {
            setCompanyPhone(newPhone);
        }
        setPhone(newPhone);
    }

    // Next step from personal information
    function nextStepPersonal() {
        // Check if all fields are filled
        if (firstName === '' || lastName === '' || email === '' || confirmEmail === '' || phone === '' || dob === '' || address === '' || zip === '') {
            openNotificationError('Feil', 'Fyll inn alle feltene');
        } else if (email !== confirmEmail) {
            openNotificationError('Feil', 'E-postene er ikke like');
        } else if (!validateEmail(email)) {
            openNotificationError('Feil', 'E-posten er ikke gyldig');
        } else {
            setProcessStep(1);
        }
    }

    // Next step from establishment information
    function nextStepEstablishment() {
        // Check if all fields are filled
        if (establishmentName === '') {
            openNotificationError('Feil', 'Fyll inn navnet på bedriften');
        } else {
            setProcessStep(2);
        }
    }

    // Check if email is valid
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
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

        setLoading(false);
    }



    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <Image src="/icons/Logo.svg" alt="Logo" width={98} height={98} priority />
                </Link>
                <Link href="/utselger/login">
                    Er du allerede registrert?
                </Link>
            </header>
            {processStep === 0 && // Personal information
                <section className={styles.section}>
                    <h1 className={styles.title}>
                        Fortell oss litt om deg selv
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
                                <label htmlFor="email">E-post</label>
                                <input type="email" id="email" name="email" value={email} 
                                onChange={e => changeEmail(e.target.value)}
                                placeholder="E-post" />
                            </div>
                            <div className={styles.inputColumn}>
                            	<label htmlFor="confirmEmail">Bekreft e-post</label>
                                <input type="email" id="confirmEmail" name="confirmEmail" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} placeholder="Bekreft e-post" />
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
                            	<label htmlFor="establishmentAccountNumber">Kontonummer (Valgfritt)</label>
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
            {processStep === 2 && // Confirm information
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
                                    {email}
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
            {processStep === 3 && // Terms and conditions
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