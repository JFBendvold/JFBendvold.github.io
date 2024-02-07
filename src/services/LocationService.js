export async function fetchLocationsByEstablishmentId(client, establishmentId) {
    const { data: Locations, error } = await client.from("Sales_locations").select("*").eq("establishment_id", establishmentId)

    if (error) throw error

    return Locations
}