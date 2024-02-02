export async function getUserId(client) {
    const { data: User, error } = await client.auth.getUser()

    if (error) throw error

    return User.user.id
}