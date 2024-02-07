//TODO: add rls to ensure that users can only create products for their own location

export async function createProduct(client, salesLocationId, productName, productDescription, productPrice, productStock, productCategoryId) {
    const { data: CreatedProduct, error } = await client
    .from('Products')
    .insert([
        {
            sales_location_id: salesLocationId,
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

export async function updateProduct(client, productId, productName, productDescription, productPrice, productStock, productCategoryId) {
    const { data: UpdatedProduct, error } = await client
    .from('Products')
    .update({
        product_name: productName,
        product_description: productDescription,
        price: productPrice,
        quantity: productStock,
        category_id: productCategoryId
    })
    .eq('id', productId)
    .select()

    if (error) throw error

    return UpdatedProduct[0].id
}

export async function fetchProducts(client, location_id, lowerBound, upperBound) {
    const { data: Products, error } = await client
    .from('Products')
    .select('*')
    .order('updated_at', { ascending: false })
    .range(lowerBound, upperBound)
    .eq('sales_location_id', location_id)

    if (error) throw error

    return Products
}

export async function fetchProductAmount(client, search, location_id)
{
    let TotalCount
    if(search.length > 0){
        const { data: Count, error } = await client
        .from('Products')
        .select('id', { count: 'exact' })
        .eq('sales_location_id', location_id)
        .ilike('product_name', `%${search}%`)

        if (error) throw error

        TotalCount = Count.length
    }
    else {
        const { data: Count, error } = await client
      .from('Products')
      .select('id', { count: 'exact' })
      .eq('sales_location_id', location_id)

        if (error) throw error

        TotalCount = Count.length
    }

    return TotalCount

}

export async function fetchUserIdFromProductId(client, productId) {
    let { data: UserId, error } = await client
    .rpc('get_user_id_from_product_id', {
        product_id: productId
    })

    if (error) throw error

    return UserId
}

export async function unlistProduct(client, productId) {
    let { data, error } = await client
        .rpc('set_product_unlisted_at', {
        p_product_id: productId
    })
    if (error) throw error

    console.log("DATA")
    console.log(data)

}

export async function listProduct(client, productId) {
    const { data: UpdatedProduct, error } = await client
    .from('Products')
    .update({
        unlisted_at: null,
    })
    .eq('id', productId)
    .select()

    if (error) throw error

    return UpdatedProduct[0].id
}


export async function searchProducts(client, searchKeyword, location_id, lowerBound, upperBound) {
    const { data: Products, error } = await client
    .from('Products')
    .select('*')
    .order('updated_at', { ascending: false })
    .range(lowerBound, upperBound)
    .eq('sales_location_id', location_id)
    .ilike('product_name', `%${searchKeyword}%`)

    if (error) throw error

    return Products
}