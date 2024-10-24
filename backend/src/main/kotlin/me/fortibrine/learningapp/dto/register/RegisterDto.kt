package me.fortibrine.learningapp.dto.register

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class RegisterDto (
    @field:Email(message = "Please provide a valid email address")
    val email: String,

    @field:NotBlank(message = "Please provide a valid password")
    val username: String,

    @field:Size(min = 8, max = 32, message = "Password must contain at least 8 characters")
    val password: String,
)