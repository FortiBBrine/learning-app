package me.fortibrine.learningapp.dto.register

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class RegisterRequestDto (
    @field:NotBlank(message = "Будь ласка, вкажіть електронну пошту")
    @field:Email(message = "Будь ласка, вкажіть коректну електронну адресу")
    val email: String,

    @field:NotBlank(message = "Будь ласка, вкажіть ім'я")
    @field:Size(min = 6, max = 32, message = "Довжина має бути від 6 до 32 символів")
    val name: String,

    @field:NotBlank(message = "Будь ласка, вкажіть ім'я користувача")
    @field:Size(min = 6, max = 32, message = "Довжина має бути від 6 до 32 символів")
    @field:Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Ім'я користувача може містити лише літери англійського алфавіту та цифри")
    val username: String,

    @field:Size(min = 8, max = 32, message = "Пароль має містити щонайманше 8 символів")
    val password: String,
)