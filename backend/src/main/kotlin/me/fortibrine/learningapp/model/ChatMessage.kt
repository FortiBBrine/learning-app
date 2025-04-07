package me.fortibrine.learningapp.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity(name = "messages")
class ChatMessage (
    @field:Id
    @field:GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = null,

    var content: String = "",
    var timestamp: LocalDateTime = LocalDateTime.now(),

    @field:ManyToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "sender_id", nullable = false)
    var sender: User,

    @field:ManyToOne(fetch = FetchType.EAGER, optional = false)
    @field:JoinColumn(name = "receiver_id", nullable = false)
    var receiver: User
)
