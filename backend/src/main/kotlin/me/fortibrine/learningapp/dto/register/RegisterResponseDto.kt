package me.fortibrine.learningapp.dto.register

data class RegisterResponseDto(
    val result: Map<String, String?>,
    val token: String?
)
