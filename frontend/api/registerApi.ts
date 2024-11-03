export type RegisterResponseDto = {
    result: {
        username: string | undefined,
        password: string | undefined,
        email: string | undefined
    },
    token: null
}

export async function register(
    email: string,
    username: string,
    password: string,
): Promise<RegisterResponseDto> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/register", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    return await res.json()
}
