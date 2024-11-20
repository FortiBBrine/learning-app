package me.fortibrine.learningapp.model

import jakarta.persistence.*
import me.fortibrine.learningapp.dto.controller.ContactDto

@Entity
class AppUser (
    @field:Id
    @field:GeneratedValue(strategy = GenerationType.UUID)
    var id: String? = null,
    var username: String = "",
    var password: String = "",
    var email: String = "",

    @field:ElementCollection
    var roles: MutableList<String> = listOf("ROLE_USER"),

    @field:ElementCollection
    var contacts: MutableList<String> = listOf()
)
