
import {api} from "./api";

export type ScheduledLessonDto = {
    name: string | undefined,
    username: string | undefined,
    from: string | undefined,
    to: string | undefined,
    title: string | undefined,
    subject: string | undefined,
    online: boolean | undefined,
}

export async function getLessons(): Promise<ScheduledLessonDto[]> {
    const response = await api.get("/lessons");
    return response.data;
}
