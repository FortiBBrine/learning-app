package me.fortibrine.learningapp.dto.relation

data class RelationDto (
    val name: String,
    val username: String,
    val email: String,
    val subjects: List<String>,
    val rating: Double
)
