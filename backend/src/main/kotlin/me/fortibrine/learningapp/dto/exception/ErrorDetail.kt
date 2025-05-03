package me.fortibrine.learningapp.dto.exception

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.ZoneOffset
import java.time.ZonedDateTime

data class ErrorDetail(
    val type: String,
    val message: String,
    val status: Int,
    val path: String,
    @JsonFormat(pattern = "yyyy-dd-MM'T'HH:mm:ss.SSSZ")
    val timestamp: ZonedDateTime = ZonedDateTime.now(ZoneOffset.UTC),
    val data: Any?
)