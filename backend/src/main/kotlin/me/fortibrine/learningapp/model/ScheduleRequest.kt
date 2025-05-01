package me.fortibrine.learningapp.model

import jakarta.persistence.*
import java.sql.Timestamp

@Entity
class ScheduleRequest (

    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:ManyToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "target_id", nullable = false)
    var source: User,

    @field:ManyToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "relation_id", nullable = false)
    var target: User,

    var title: String,
    var subject: String,
    var fromTime: Timestamp,
    var toTime: Timestamp,
    var online: Boolean
)