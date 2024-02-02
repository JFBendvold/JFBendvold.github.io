export async function postImage(client, image, imageId, userId){ //TODO: COMMMENTs

    const { data: UploadedImage, error } = await client.storage.from('imgs').upload(userId + "/" + imageId, image)

    if (error) throw error
    return UploadedImage
}

export async function getImage(client, imageId, userId) {
    const { data: Image, error } = await client.storage.from('imgs').getPublicUrl(userId + "/" + imageId)

    if (error) throw error
    return Image.publicUrl
}

export async function postImageUrl(client, userId, productId) {
    const {data: AddedURL, error } = await client.from('Images').insert([{url: userId + "/", parent_id: productId}]).select()

    if (error) throw error

    return AddedURL[0].id

}