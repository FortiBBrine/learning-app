package me.fortibrine.learningapp.dto.chat

import java.time.LocalDateTime

data class ChatMessageDto (
    var content: String,
    var timestamp: LocalDateTime = LocalDateTime.now(),
    var sender: String = "",
    var receiver: String
)