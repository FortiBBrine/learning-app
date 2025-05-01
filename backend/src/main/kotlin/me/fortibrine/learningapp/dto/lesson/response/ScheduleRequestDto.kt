package me.fortibrine.learningapp.dto.lesson.response

import me.fortibrine.learningapp.dto.user.UserDto
import java.sql.Timestamp

data class ScheduleRequestDto (
    val id: Long,
    val source: UserDto,
    val target: UserDto,
    val title: String,
    val subject: String,
    val from: Timestamp,
    val to: Timestamp,
    val online: Boolean
)