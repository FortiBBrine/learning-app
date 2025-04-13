
import {api} from "./api";

export type Calendar = {
    name: string | undefined,
    username: string | undefined,
    from: string | undefined,
    to: string | undefined,
}

export type GetAllCalendarDto = {
    calendars: Calendar[]
}

export async function getAllCalendars(): Promise<GetAllCalendarDto> {
    const response = await api.get("/calendars/show")
    return response.data;
}
