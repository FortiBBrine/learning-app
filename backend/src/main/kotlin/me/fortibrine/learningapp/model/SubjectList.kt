package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity
class SubjectList (

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:OneToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "target_id", nullable = false)
    var target: User,

    @field:ElementCollection(fetch = FetchType.EAGER)
    var subjects: MutableSet<String> = mutableSetOf()

)
