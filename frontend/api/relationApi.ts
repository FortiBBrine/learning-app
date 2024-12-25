import {api} from "./api";

export type RelationDto = {
    name: string,
    email: string,
    username: string,
}

export async function getNotMyRelations(): Promise<RelationDto[]> {
    const response = await api.get("/relation/notmy");

    return response.data;
}

export async function getAllRelations(): Promise<RelationDto[]> {
    const response = await api.get("/relation/all");

    return response.data;
}

export async function deleteRelation(username: string): Promise<void> {
    const response = await api.post("/relation/remove", {
    }, {
        params: {
            username: username,
        }
    });

    return response.data;
}

export async function addRelation(username: string): Promise<void> {
    const response = await api.post("/relation/add", {}, {
        params: {
            username: username,
        }
    });

    return response.data;
}

