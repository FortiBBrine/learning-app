package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.chat.ChatMessageDto
import me.fortibrine.learningapp.model.ChatMessage
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.ChatMessageRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import java.security.Principal
import java.time.LocalDateTime

@Controller
class ChatController (
    private val simpMessagingTemplate: SimpMessagingTemplate,
    private val chatMessageRepository: ChatMessageRepository,
    private val userRepository: UserRepository
) {
    @MessageMapping("/send-private")
    fun sendPrivateMessage(
        @Payload message: ChatMessageDto,
        principal: Principal
    ) {

        val sender = userRepository.findByUsername(principal.name)
        val receiver = userRepository.findByUsername(message.receiver)

        if (sender == null) {
            println("Sender not found: ${principal.name}")
            return
        }

        if (receiver == null) {
            println("Receiver not found: ${message.receiver}")
            return
        }

        val chatMessage = ChatMessage(
            content = message.content,
            timestamp = LocalDateTime.now(),
            sender = sender,
            receiver = receiver
        )

        chatMessageRepository.save(chatMessage)

        message.sender = sender.username
        message.timestamp = LocalDateTime.now()

        simpMessagingTemplate.convertAndSendToUser(
            message.receiver,
            "/queue/private",
            message
        )
    }

    @GetMapping("/api/v1/messages")
    @ResponseBody
    fun getMessages(
        @RequestParam(name = "target") target: String,

        @AuthenticationPrincipal principal: User
    ): List<ChatMessageDto> {
        return chatMessageRepository.findByUser(
            principal,
            userRepository.findByUsername(target) ?: return listOf()
        ).map {
            ChatMessageDto(
                content = it.content,
                sender = it.sender.username,
                receiver = it.receiver.username,
                timestamp = it.timestamp
            )
        }
    }

}