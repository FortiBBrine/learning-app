package me.fortibrine.learningapp.dto.user

import me.fortibrine.learningapp.model.Role

data class UserDto (
    val name: String,
    val username: String,
    val email: String,
    val subjects: List<String>,
    val rating: Double,
    val role: Role
)
