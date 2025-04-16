package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity
class User (
    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,
    var name: String = "",
    var username: String = "",
    var password: String = "",
    var email: String = "",

    @field:ElementCollection(fetch = FetchType.EAGER)
    var roles: List<String> = listOf("ROLE_USER"),

    @field:ElementCollection(fetch = FetchType.EAGER)
    var subjects: MutableSet<String> = mutableSetOf()

)
