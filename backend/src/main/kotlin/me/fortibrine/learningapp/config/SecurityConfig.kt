package me.fortibrine.learningapp.config

import me.fortibrine.learningapp.service.TokenService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class SecurityConfig (
    private val tokenService: TokenService
) {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        // Define public and private routes
        http.authorizeHttpRequests { request ->
            request
                .requestMatchers("/ws-chat/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
        }

        // Configure JWT
        http.oauth2ResourceServer { oauth2 ->
            oauth2.jwt(Customizer.withDefaults())
        }
        http.authenticationManager { auth ->
            val jwt = auth as BearerTokenAuthenticationToken
            val user = tokenService.parseToken(jwt.token) ?: throw InvalidBearerTokenException("Invalid token")
            UsernamePasswordAuthenticationToken(user, "", user.roles.map { SimpleGrantedAuthority(it) })
        }

        // Other configuration
        http.cors(Customizer.withDefaults())
        http.sessionManagement { httpSession ->
            httpSession.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }
        http.csrf {
            it.disable()
        }
        http.headers { headers ->
            headers.frameOptions { it.disable() }
            headers.xssProtection { it.disable() }
        }

        return http.build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()

        configuration.allowedOrigins = listOf(
            "http://localhost:3000",  // Dev
            "http://0.0.0.0:3000"
        )

        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowedHeaders = listOf("Authorization", "Content-Type")
        configuration.allowCredentials = true

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }


}