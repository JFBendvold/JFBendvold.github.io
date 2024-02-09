export async function fetchLocationsByEstablishmentId(client, establishmentId) {
    const { data: Locations, error } = await client.from("Sales_locations").select("*").eq("establishment_id", establishmentId)

    if (error) throw error

    return Locations
}
//TODO: COmment all
export async function fetchLocationById(client, locationId) {
    const { data: Location, error } = await client.from("Sales_locations").select("*").eq("id", locationId)

    if (error) throw error

    return Location
}