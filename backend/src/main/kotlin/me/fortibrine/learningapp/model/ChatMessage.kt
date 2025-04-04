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

    @field:ManyToOne
    @field:JoinColumn(name = "sender_id")
    var sender: User? = null,

    @field:ManyToOne
    @field:JoinColumn(name = "receiver_id")
    var receiver: User? = null,
)
