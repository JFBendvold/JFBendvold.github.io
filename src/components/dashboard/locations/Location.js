import styles from '@/styles/components/dashboard/Location.module.css'
/**
     * id: "aa61b0be-e3e7-4554-be01-da917d92808c", created_at: "2024-01-31T08:41:57.883244+00:00", establishment_id: "53ff602d-e84f-42c1-911f-152d9bdfb36e", sales_location_description: "Dette er hyggelig", type_id: "ec605a2b-0dec-469e-9a7d-c645da6fb212", sales_location_name: "Gårdsutsalg av brunost", pending: 0, address: "Vollabakken 9 A", zip_code: 7030, lat: 63.4232594, … }
​
address: "Vollabakken 9 A"
​
created_at: "2024-01-31T08:41:57.883244+00:00"
​
establishment_id: "53ff602d-e84f-42c1-911f-152d9bdfb36e"
​
id: "aa61b0be-e3e7-4554-be01-da917d92808c"
​
lat: 63.4232594
​
lng: 10.4008389
​
pending: 0
​
sales_location_description: "Dette er hyggelig"
​
sales_location_name: "Gårdsutsalg av brunost"
​
sales_location_tlf: 48388283
​
type_id: "ec605a2b-0dec-469e-9a7d-c645da6fb212"
​
zip_code: 7030
     */

export default function Location({ KeyIndex, LocationInfo}) {
    return (
        <div key={KeyIndex} className={styles.locationContainer}>
            <h2>{LocationInfo.sales_location_name}</h2>
            <p><b>Beskrivelse: </b>{LocationInfo.sales_location_description}</p>
            <p><b>Adresse: </b>{LocationInfo.address}</p>
            <p><b>Postkode: </b>{LocationInfo.zip_code}</p>
            <p><b>Telefon: </b>{LocationInfo.sales_location_tlf}</p>
            <p><b>Lengdegrad: </b>{LocationInfo.lng}</p>
            <p><b>Breddegrad: </b>{LocationInfo.lat}</p>
            <p><b>Opprettet: </b>{LocationInfo.created_at}</p>
        </div>
    );
}
