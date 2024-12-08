package me.fortibrine.learningapp.model

import jakarta.persistence.*
import java.sql.Timestamp

@Entity(name = "calendars")
class Calendar (
    @field:Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:ManyToOne(fetch = FetchType.EAGER)
    @field:JoinColumn(name = "user_id")
    var user: User? = null,

    var fromTime: Timestamp? = null,
    var toTime: Timestamp? = null,

    @field:ManyToOne(fetch = FetchType.EAGER)
    @field:JoinColumn(name = "target_id")
    var target: User? = null
)
