package me.fortibrine.learningapp.exception

class ValidationError (
    val errors: Map<String, String>
) : RuntimeException("Validation failed")
