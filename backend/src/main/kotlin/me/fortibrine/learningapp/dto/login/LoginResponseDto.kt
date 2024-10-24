package me.fortibrine.learningapp.dto.login

data class LoginResponseDto(
    val result: Map<String, String?>,
    val token: String?,
)
