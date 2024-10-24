package me.fortibrine.learningapp.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
class User (
    @field:Id
    var id: String? = null,
    var username: String = "",
    var password: String = "",
    var email: String = "",
    var roles: List<String> = listOf("ROLE_USER"),
)