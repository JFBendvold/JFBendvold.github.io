import { getUserId } from "./UserService"

export async function createProduct(client, salesLocationId, productName, productDescription, productPrice, productStock, productCategoryId) {
    const { data: CreatedProduct, error } = await client
    .from('Products')
    .insert([
        {
            Sales_location_id: salesLocationId,
            product_name: productName,
            product_description: productDescription,
            price: productPrice,
            quantity: productStock,
            category_id: productCategoryId
        }
    ])
    .select()

    if (error) throw error

    return CreatedProduct[0].id
}

export async function fetchProducts(client, location_id, lowerBound, upperBound) {
    const { data: Products, error } = await client
    .from('Products')
    .select('*')
    .order('updated_at', { ascending: false })
    .range(lowerBound, upperBound)
    .eq('Sales_location_id', location_id)

    if (error) throw error

    return Products
}

export async function fetchProductAmount(client, location_id)
{
    const { data: TotalCount, error } = await client
  .from('Products')
  .select('id', { count: 'exact' })
  .eq('Sales_location_id', location_id)

    if (error) throw error

    return TotalCount.length

}

export async function fetchUserIdFromProductId(client, productId) {
    let { data: UserId, error } = await supabase
    .rpc('get_user_id_from_product_id', {
        product_id: productId
    })

    if (error) throw error

    return UserId
}
