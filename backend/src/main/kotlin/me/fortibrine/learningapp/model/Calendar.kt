package me.fortibrine.learningapp.model

import jakarta.persistence.*
import java.sql.Timestamp

@Entity(name = "calendars")
class Calendar (
    @field:Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:OneToOne(fetch = FetchType.EAGER)
    @field:JoinColumn(name = "user_id")
    var user: User? = null,

    var timestamp: Timestamp? = null,

    @field:OneToOne(fetch = FetchType.EAGER)
    @field:JoinColumn(name = "target_id")
    var target: User? = null
)
