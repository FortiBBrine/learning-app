package me.fortibrine.learningapp.dto.calendar

import java.sql.Timestamp

data class GetAllCalendarDto (
    val calendars: List<CalendarDto>
)

data class CalendarDto (
    val name: String,
    val username: String,
    val from: Timestamp,
    val to: Timestamp
)
