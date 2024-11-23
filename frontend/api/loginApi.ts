
export type LoginResponseDto = {
    result: {
        username: string | undefined,
        password: string | undefined
    },
    token: null
}

export async function login(username: string, password: string): Promise<LoginResponseDto> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return await res.json()
}
