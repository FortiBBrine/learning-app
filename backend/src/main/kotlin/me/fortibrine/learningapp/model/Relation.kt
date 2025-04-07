package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity(name = "relations")
class Relation (

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:OneToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "target_id", nullable = false)
    var target: User,

    @field:OneToMany(fetch = FetchType.EAGER)
    var users: MutableList<User> = mutableListOf()

)
