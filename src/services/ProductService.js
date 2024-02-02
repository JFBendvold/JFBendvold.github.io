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

export async function fetchProducts(client) {
    const { data: Products, error } = await client
    .from('Products')
    .select('*')

    if (error) throw error

    return Products
}

export async function fetchUserIdFromProductId(client, productId) {
    let { data: UserId, error } = await supabase
    .rpc('get_user_id_from_product_id', {
        product_id: productId
    })

    if (error) throw error

    return UserId
}
