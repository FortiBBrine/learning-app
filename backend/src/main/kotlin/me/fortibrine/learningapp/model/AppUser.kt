package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity
class AppUser (
    @field:Id
    @field:GeneratedValue(strategy = GenerationType.UUID)
    var id: String? = null,
    var username: String = "",
    var password: String = "",
    var email: String = "",

    @field:ElementCollection
    var roles: List<String> = listOf("ROLE_USER"),
)
