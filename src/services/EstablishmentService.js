export async function fetchEstablishmentsIds(client) {
    const { data: EstablishmentsIds, error } = await client.from("Establishments").select("id")

    if (error) throw error

    return EstablishmentsIds
}