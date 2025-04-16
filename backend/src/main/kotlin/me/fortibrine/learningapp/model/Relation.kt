package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity
class Relation (

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:ManyToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "target_id", nullable = false)
    var source: User,

    @field:ManyToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "relation_id", nullable = false)
    var target: User,

    var rating: Int? = null
)
