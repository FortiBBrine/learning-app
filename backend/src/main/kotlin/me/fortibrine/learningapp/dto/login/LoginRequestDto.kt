package me.fortibrine.learningapp.dto.login

import jakarta.validation.constraints.NotBlank

data class LoginRequestDto (
    @field:NotBlank(message = "Please provide not blank username")
    val username: String,
    val password: String,
)
