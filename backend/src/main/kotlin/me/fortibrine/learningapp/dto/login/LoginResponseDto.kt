package me.fortibrine.learningapp.dto.login

data class LoginResponseDto(
    val result: Map<String, String?> = mapOf(),
    val token: String? = null,
)
