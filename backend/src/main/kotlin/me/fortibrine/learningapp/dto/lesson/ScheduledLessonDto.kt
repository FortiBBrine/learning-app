package me.fortibrine.learningapp.dto.lesson

import java.sql.Timestamp

data class ScheduledLessonDto (
    val name: String,
    val username: String,
    val from: Timestamp,
    val to: Timestamp,
    val title: String,
    val subject: String,
    val online: Boolean,
)