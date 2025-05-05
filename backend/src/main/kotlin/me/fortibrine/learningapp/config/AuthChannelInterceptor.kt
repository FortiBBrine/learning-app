package me.fortibrine.learningapp.config

import me.fortibrine.learningapp.service.TokenService
import org.springframework.messaging.Message
import org.springframework.messaging.MessageChannel
import org.springframework.messaging.simp.stomp.StompCommand
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.messaging.support.ChannelInterceptor
import org.springframework.messaging.support.MessageHeaderAccessor
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException
import org.springframework.stereotype.Component
import java.security.Principal

@Component
class AuthChannelInterceptor(
    private val tokenService: TokenService
) : ChannelInterceptor {

    override fun preSend(message: Message<*>, channel: MessageChannel): Message<*> {
        val accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor::class.java)

        if (accessor?.command != StompCommand.CONNECT) return message

        val token = accessor.getFirstNativeHeader("Authorization")
            ?.substringAfter("Bearer ")
            ?: throw InvalidBearerTokenException("Token not found")

        val user = tokenService.parseAccessToken(token)
            ?: throw InvalidBearerTokenException("Invalid token")

        val auth = UsernamePasswordAuthenticationToken(
            Principal { user.username },
            null,
            user.roles.map { SimpleGrantedAuthority(it) }
        )

        accessor.user = auth

        println("WebSocket CONNECTED: ${accessor.sessionId}")
        println("username: ${accessor.user?.name}")

        return message
    }
}