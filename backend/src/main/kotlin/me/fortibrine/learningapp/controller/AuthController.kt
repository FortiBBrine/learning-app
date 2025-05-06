package me.fortibrine.learningapp.controller

import jakarta.validation.Valid
import me.fortibrine.learningapp.dto.login.*
import me.fortibrine.learningapp.dto.register.RegisterRequestDto
import me.fortibrine.learningapp.dto.register.RegisterValidator
import me.fortibrine.learningapp.exception.ValidationError
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.UserRepository
import me.fortibrine.learningapp.service.HashService
import me.fortibrine.learningapp.service.TokenService
import me.fortibrine.learningapp.service.UserService
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val hashService: HashService,
    private val tokenService: TokenService,
    private val userService: UserService,
    private val loginValidator: LoginValidator,
    private val registerValidator: RegisterValidator,
    private val userRepository: UserRepository
) {

    @PostMapping("/login")
    fun login(
        @Valid
        @RequestBody
        payload: LoginRequestDto,

        bindingResult: BindingResult
    ): LoginResponseDto {

        loginValidator.validate(payload, bindingResult)

        if (bindingResult.hasErrors()) {
            throw ValidationError(bindingResult.fieldErrors.associate {
                it.field to it.defaultMessage.orEmpty()
            })
        }

        val user = userService.findByUsername(payload.username) as User
        val refreshToken = tokenService.createRefreshToken(user)

        user.tokens.add(refreshToken)
        userRepository.save(user)

        return LoginResponseDto(
            accessToken = tokenService.createAccessToken(user),
            refreshToken = refreshToken
        )
    }

    @PostMapping("/register")
    fun register(
        @Valid
        @RequestBody
        payload: RegisterRequestDto,

        bindingResult: BindingResult
    ): LoginResponseDto {

        registerValidator.validate(payload, bindingResult)

        if (bindingResult.hasErrors()) {
            throw ValidationError(bindingResult.fieldErrors.associate {
                it.field to it.defaultMessage.orEmpty()
            })
        }

        val user = User(
            email = payload.email,
            name = payload.name,
            username = payload.username,
            password = hashService.hashBcrypt(payload.password),
        )

        val savedUser = userService.save(user)

        val refreshToken = tokenService.createRefreshToken(savedUser)

        savedUser.tokens.add(refreshToken)
        userRepository.save(savedUser)

        return LoginResponseDto(
            accessToken = tokenService.createAccessToken(savedUser),
            refreshToken = refreshToken
        )
    }

    @PostMapping("/refresh")
    fun refresh(
        @RequestBody
        payload: RefreshRequestDto,
    ): RefreshResponseDto {
        val user = tokenService.parseRefreshToken(payload.refreshToken)
            ?: throw InvalidBearerTokenException("Invalid token")

        if (!user.tokens.contains(payload.refreshToken))
            throw InvalidBearerTokenException("Invalid token")

        return RefreshResponseDto(
            accessToken = tokenService.createAccessToken(user),
        )
    }

    @PostMapping("/logout")
    fun logout(
        @RequestBody
        payload: RefreshRequestDto,
    ) {
        val user = tokenService.parseRefreshToken(payload.refreshToken)
            ?: throw InvalidBearerTokenException("Invalid token")

        if (!user.tokens.contains(payload.refreshToken))
            throw InvalidBearerTokenException("Invalid token")

        user.tokens.remove(payload.refreshToken)
        userRepository.save(user)
    }

    @PostMapping("/logout/all")
    fun logoutEverywhere(
        @RequestBody
        payload: RefreshRequestDto
    ) {
        val user = tokenService.parseRefreshToken(payload.refreshToken)
            ?: throw InvalidBearerTokenException("Invalid token")

        user.tokens = mutableSetOf(payload.refreshToken)
        userRepository.save(user)
    }

}