import {api} from "./api";

export type GetSubjectListDto = {
    subjects: string[]
};

export type ChangeSubjectListDto = {
    subjects: string[]
};

export async function getMySubjectList(): Promise<GetSubjectListDto> {
    const response = await api.get("/subjects");

    return response.data;
}

export async function changeSubjectList(subjects: string[]): Promise<void> {
    const response = await api.post("/subjects", {
        subjects: subjects
    });
}
