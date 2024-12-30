package me.fortibrine.learningapp.dto.controller

data class RelationDto (
    val name: String,
    val username: String,
    val email: String,
    val subjects: List<String>
)
