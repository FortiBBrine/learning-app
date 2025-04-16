package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.ChatMessage
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ChatMessageRepository : JpaRepository<ChatMessage, Long> {
    @Query("SELECT m FROM ChatMessage m WHERE (m.sender = :sender AND m.receiver = :receiver) OR (m.sender = :receiver AND m.receiver = :sender) ORDER BY m.timestamp")
    fun findByUser(sender: User, receiver: User): List<ChatMessage>
}