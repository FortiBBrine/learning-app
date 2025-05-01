package me.fortibrine.learningapp.dto.lesson.request

import java.sql.Timestamp

data class ScheduleRequestDto (
    val target: String,
    val title: String,
    val subject: String,
    val from: Timestamp,
    val to: Timestamp,
    val online: Boolean
)