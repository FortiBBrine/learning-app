package me.fortibrine.learningapp.dto.login

data class LoginResponseDto (
    val accessToken: String,
    val refreshToken: String,
)
