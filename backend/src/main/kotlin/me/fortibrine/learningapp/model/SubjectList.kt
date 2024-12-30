package me.fortibrine.learningapp.model

import jakarta.persistence.*

@Entity
data class SubjectList (

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:OneToOne(fetch = FetchType.EAGER)
    @field:JoinColumn(name = "target_id")
    var target: User? = null,

    @field:ElementCollection(fetch = FetchType.EAGER)
    var subjects: MutableSet<String> = mutableSetOf()

)
