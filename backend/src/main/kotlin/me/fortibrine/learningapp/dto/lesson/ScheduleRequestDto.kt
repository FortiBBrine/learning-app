package me.fortibrine.learningapp.dto.lesson

import java.sql.Timestamp

data class ScheduleRequestDto (
    val id: Long = 0,
    val source: String = "",
    val target: String,
    val title: String,
    val subject: String,
    val from: Timestamp,
    val to: Timestamp,
    val online: Boolean
)
