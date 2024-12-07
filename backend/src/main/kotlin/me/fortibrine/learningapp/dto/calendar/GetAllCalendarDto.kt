package me.fortibrine.learningapp.dto.calendar

import java.sql.Timestamp

data class GetAllCalendarDto (
    val calendars: List<CalendarDto>
)

data class CalendarDto (
    val username: String,
    val timestamp: Timestamp
)
