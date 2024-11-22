package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity(name = "relations")
class Relation (

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int? = null,

    @field:OneToOne(fetch = FetchType.EAGER)
    @field:JoinColumn(name = "target_id")
    var target: User? = null,

    @field:OneToMany(fetch = FetchType.EAGER)
    var users: MutableList<User> = mutableListOf()

)
