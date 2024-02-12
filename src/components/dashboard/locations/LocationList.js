import styles from '@/styles/components/dashboard/LocationList.module.css'
import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { fetchLocationById } from '@/services/LocationService'
import Location from './Location'
import { Spin } from 'antd'


export default function LocationList({salesLocationId}) {
    const supabase = useSupabaseClient()

    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState(null)

    const fetchSelectedLocation = async () => {
        if (!salesLocationId) {
            setLoading(false)
            return
        }
        setLoading(true)
        try {
            const locations = await fetchLocationById(supabase, salesLocationId)
            console.log(locations[0])
            setLocation(locations[0])
            setLoading(false)
        }
        catch (error) {
            console.error('Error fetching location:', error.message)
        }
    }

    const handleChildRefresh = () => {
        fetchSelectedLocation()
    }

    useEffect(() => {
        fetchSelectedLocation()
    }, [])

    return (
        <div className={styles.locationListContainer}>
            <h1>Registrerte utsalgssteder</h1>

            {location && <Location KeyIndex={0} LocationInfo={location} client={supabase} emitRefresh={handleChildRefresh}/> }
            {loading && <Spin />}

        </div>
    );
}