export type RelationDto = {
    name: string,
    email: string,
    username: string,
}

export async function getNotMyRelations(token: string): Promise<RelationDto[]> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/relation/notmy", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
    return await res.json()
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

export async function deleteRelation(username: string, token: string): Promise<void> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/relation/remove?username=" + username, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
}

export async function addRelation(username: string, token: string): Promise<void> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/relation/add?username=" + username, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
}

