export async function postImage(client, image, productId, userId){ //TODO: COMMMENTs

    const { data: UploadedImage, error } = await client.storage.from('imgs').upload(userId + "/" + productId, image)

    if (error) throw error
    return UploadedImage
}

export async function postImageUrl(client, userId, productId) {
    const {data: AddedURL, error } = await client.from('Images').insert([{url: userId + "/", parent_id: productId}]).select()

    if (error) throw error

    return AddedURL[0].id

}