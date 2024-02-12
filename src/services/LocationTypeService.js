export async function fetchLocationTypes(client) {
    let { data: LocationTypes, error } = await client
    .from('Sales_location_types')
    .select('*')

    if (error) throw error

    return LocationTypes
}
