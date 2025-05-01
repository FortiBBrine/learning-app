import {api} from "./api";

export async function getMySubjectList(): Promise<string[]> {
    const response = await api.get("/subjects");

    return response.data;
}

export async function changeSubjectList(subjects: string[]): Promise<void> {
    const response = await api.post("/subjects", subjects);
}
