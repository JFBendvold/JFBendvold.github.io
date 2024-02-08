export async function postImage(client, image, imageId, userId){ //TODO: COMMMENTs

    const { data: UploadedImage, error } = await client.storage.from('imgs').upload(userId + "/" + imageId, image)

    if (error) throw error
    return UploadedImage
}

export async function deleteImage(client, url) {
    const { data, error } = await client
        .storage
        .from('imgs')
        .remove([url])

    if (error) throw error
    return data
}

export async function deleteImageUrl(client, productId) {
    const { error } = await client
    .from('Images')
    .delete()
    .eq('parent_id', productId)

    if (error) throw error

    return true;
}

export async function getImage(client, imageId, userId) {
    const { data: Image, error } = await client.storage.from('imgs').getPublicUrl(userId + "/" + imageId)

    if (error) throw error
    return Image.publicUrl
}

export async function getImageByUrl(client, url) {
    const { data: Image, error } = await client.storage.from('imgs').getPublicUrl(url)

    if (error) throw error
    return Image.publicUrl
}

export async function postImageUrl(client, userId, productId) {
    const {data: AddedURL, error } = await client.from('Images').insert([{url: userId + "/", parent_id: productId}]).select()

    if (error) throw error

    return AddedURL[0].id

}

export async function fetchImagesUrls(client, productId) {
    let { data: Images, error } = await client
    .from('Images')
    .select("*")
    .eq('parent_id', productId)

    if (error) throw error

    return Images
}