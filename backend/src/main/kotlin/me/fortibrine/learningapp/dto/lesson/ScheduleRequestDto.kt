package me.fortibrine.learningapp.dto.lesson

import com.fasterxml.jackson.annotation.JsonProperty
import java.sql.Timestamp

data class ScheduleRequestDto (
    @field:JsonProperty(access = JsonProperty.Access.READ_ONLY)
    val id: Long,
    @field:JsonProperty(access = JsonProperty.Access.READ_ONLY)
    val source: String,
    val target: String,
    val title: String,
    val subject: String,
    val from: Timestamp,
    val to: Timestamp,
    val online: Boolean
)
