package me.fortibrine.learningapp.dto.user

data class UserDto (
    val name: String,
    val username: String,
    val email: String,
    val subjects: List<String>,
    val rating: Double
)
