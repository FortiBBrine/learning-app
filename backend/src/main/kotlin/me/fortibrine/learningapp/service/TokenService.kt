package me.fortibrine.learningapp.service

import me.fortibrine.learningapp.model.User
import org.springframework.security.oauth2.jwt.*
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit

@Service
class TokenService (
    private val jwtDecoder: JwtDecoder,
    private val jwtEncoder: JwtEncoder,
    private val userService: UserService
) {

    fun createAccessToken(user: User): String {
        val jwsHeader = JwsHeader.with { "HS256" }.build()
        val claims = JwtClaimsSet.builder()
            .issuedAt(Instant.now())
            .expiresAt(Instant.now().plus(15L, ChronoUnit.MINUTES))
            .subject(user.username)
            .claim("userId", user.id)
            .claim("access", true)
            .build()
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).tokenValue
    }

    fun createRefreshToken(user: User): String {
        val jwsHeader = JwsHeader.with { "HS256" }.build()
        val claims = JwtClaimsSet.builder()
            .issuedAt(Instant.now())
            .expiresAt(Instant.now().plus(7L, ChronoUnit.DAYS))
            .subject(user.username)
            .claim("userId", user.id)
            .claim("access", false)
            .build()
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).tokenValue
    }

    fun parseAccessToken(token: String): User? {
        return try {
            val jwt = jwtDecoder.decode(token)
            val userId = jwt.claims["userId"] as Long

            if (jwt.claims["access"] as Boolean) {
                return null
            }

            userService.findById(userId)
        } catch (e: Exception) {
            null
        }
    }

    fun parseRefreshToken(token: String): User? {
        return try {
            val jwt = jwtDecoder.decode(token)
            val userId = jwt.claims["userId"] as Long

            if (!(jwt.claims["access"] as Boolean)) {
                return null
            }

            userService.findById(userId)
        } catch (e: Exception) {
            null
        }
    }

}