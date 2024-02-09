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

/*
name 
description
address
zipcode
tlf
long
lat
type_id
*/
export async function updateLocation(client, newLocationInfo) {
    const { data: UpdatedLocation, error } = await client
    .from('Sales_locations')
    .update(newLocationInfo)
    .eq('id', newLocationInfo.id)
    .select()

    if (error) throw error

    return UpdatedLocation[0].id
}