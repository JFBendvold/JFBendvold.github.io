export async function fetchCategories(client) {
    let { data: Categories, error } = await client
    .from('Categories')
    .select('*')

    if (error) throw error

    return Categories
}