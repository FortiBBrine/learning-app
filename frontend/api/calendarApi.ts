export type Calendar = {
    name: string | undefined,
    username: string | undefined,
    from: string | undefined,
    to: string | undefined,
}

export type GetAllCalendarDto = {
    calendars: Calendar[]
}

export async function getAllCalendars(token: string): Promise<GetAllCalendarDto> {
    const res = await fetch("https://learning-app-1ll5.onrender.com/api/calendar/show/me", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
    const data: GetAllCalendarDto = await res.json()
    return data
}
