package me.fortibrine.learningapp.dto.user

import me.fortibrine.learningapp.model.Role

data class SettingUserDto (
    val name: String? = null,
    val email: String? = null,
    val subjects: List<String>? = null,
    val role: Role? = null,
)
