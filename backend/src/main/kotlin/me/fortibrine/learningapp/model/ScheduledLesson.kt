package me.fortibrine.learningapp.model

import jakarta.persistence.*
import java.sql.Timestamp

@Entity
class ScheduledLesson (
    @field:Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null,

    @field:ManyToOne(optional = false, fetch = FetchType.EAGER)
    @field:JoinColumn(name = "user_id", nullable = false)
    var source: User,

    var fromTime: Timestamp,
    var toTime: Timestamp,

    @field:ManyToOne(optional = false, fetch = FetchType.EAGER)
    @field:JoinColumn(name = "target_id", nullable = false)
    var target: User,

    var online: Boolean,
    var subject: String,
    var title: String
)
