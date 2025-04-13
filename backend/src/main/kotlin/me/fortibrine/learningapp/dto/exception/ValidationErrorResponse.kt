package me.fortibrine.learningapp.dto.exception

data class ValidationErrorResponse(
    val message: String,
    val errors: Map<String, String>
)
