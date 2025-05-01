
import {api} from "./api";
import {UserDto} from "./relationApi";

export type ScheduledLessonDto = {
    name: string | undefined,
    username: string | undefined,
    from: string | undefined,
    to: string | undefined,
    title: string | undefined,
    subject: string | undefined,
    online: boolean | undefined,
};

export type ScheduleRequestDto = {
    target: string;
    title: string;
    subject: string;
    from: string;
    to: string;
    online: boolean;
}

export type ScheduleRequestResponseDto = {
    id: number;
    source: UserDto,
    target: UserDto,
    subject: string;
    from: string;
    to: string;
    title: string;
    online: boolean;
}

export async function getLessons(): Promise<ScheduledLessonDto[]> {
    const response = await api.get("/lessons");
    return response.data;
}

export async function getScheduleRequests(): Promise<ScheduleRequestResponseDto[]> {
    const response = await api.get("/schedules");
    return response.data;
}

export async function sendScheduleRequest(scheduleRequestDto: ScheduleRequestDto): Promise<void> {
    const response = await api.post("/schedules", scheduleRequestDto);
}

export async function answerScheduleRequest(requestId: number, answer: boolean): Promise<void> {
    const response = await api.post("/schedules/answer", {}, {
        params: {
            requestId: requestId,
            answer: answer
        }
    });
}
