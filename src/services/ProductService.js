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

export async function fetchProductAmount(client, search, location_id)
{
    let TotalCount
    if(search.length > 0){
        const { data: Count, error } = await client
        .from('Products')
        .select('id', { count: 'exact' })
        .eq('Sales_location_id', location_id)
        .ilike('product_name', `%${search}%`)

        if (error) throw error

        TotalCount = Count.length
    }
    else {
        const { data: Count, error } = await client
      .from('Products')
      .select('id', { count: 'exact' })
      .eq('Sales_location_id', location_id)

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

  return data;
}


export async function searchProducts(client, searchKeyword, location_id, lowerBound, upperBound) {
    const { data: Products, error } = await client
    .from('Products')
    .select('*')
    .order('updated_at', { ascending: false })
    .range(lowerBound, upperBound)
    .eq('Sales_location_id', location_id)
    .ilike('product_name', `%${searchKeyword}%`)

    if (error) throw error

    return Products
}