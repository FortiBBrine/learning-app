export type RelationDto = {
    name: string,
    email: string,
    username: string,
}

export async function getAllRelations(token: string): Promise<RelationDto[]> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/relation/all", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
    return await res.json()
}
