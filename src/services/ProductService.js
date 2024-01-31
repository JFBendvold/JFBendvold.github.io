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

    return CreatedProduct
}
