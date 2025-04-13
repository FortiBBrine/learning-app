import {api} from "./api";

export type RelationDto = {
    name: string,
    email: string,
    username: string,
    subjects: string[]
}

export async function getNotMyRelations(): Promise<RelationDto[]> {
    const response = await api.get("/relations/notmy");

    return response.data;
}

export async function getAllRelations(): Promise<RelationDto[]> {
    const response = await api.get("/relations");

    return response.data;
}

export async function deleteRelation(username: string): Promise<void> {
    const response = await api.delete("/relations", {
        params: {
            username: username,
        }
    });

    return response.data;
}

export async function addRelation(username: string): Promise<void> {
    const response = await api.post("/relations", {}, {
        params: {
            username: username,
        }
    });

    return response.data;
}

