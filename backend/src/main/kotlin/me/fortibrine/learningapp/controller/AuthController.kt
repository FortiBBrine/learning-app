package me.fortibrine.learningapp.controller

import jakarta.validation.Valid
import me.fortibrine.learningapp.dto.login.LoginRequestDto
import me.fortibrine.learningapp.dto.login.LoginResponseDto
import me.fortibrine.learningapp.dto.login.LoginValidator
import me.fortibrine.learningapp.dto.register.RegisterRequestDto
import me.fortibrine.learningapp.dto.register.RegisterResponseDto
import me.fortibrine.learningapp.dto.register.RegisterValidator
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.service.HashService
import me.fortibrine.learningapp.service.TokenService
import me.fortibrine.learningapp.service.UserService
import org.slf4j.LoggerFactory
import org.springframework.validation.BindingResult
import org.springframework.validation.FieldError
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class AuthController (
    private val hashService: HashService,
    private val tokenService: TokenService,
    private val userService: UserService,
    private val loginValidator: LoginValidator,
    private val registerValidator: RegisterValidator
) {

    private val logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("/login")
    fun login(
        @Valid
        @RequestBody
        payload: LoginRequestDto,

        bindingResult: BindingResult
    ): RegisterResponseDto {

        logger.info(payload.toString())

        loginValidator.validate(payload, bindingResult)

        if (bindingResult.hasErrors()) {
            return RegisterResponseDto(
                result = mapOf(
                    *bindingResult.
                    allErrors
                        .map { (it as FieldError).field to it.defaultMessage }
                        .toTypedArray()
                ),
                token = null,
            )
        }

        val user = userService.findByUsername(payload.username.replace(" ", "")) as User

        return RegisterResponseDto(
            result = mapOf(),
            token = tokenService.createToken(user),
        )
    }

    @PostMapping("/register")
    fun register(
        @Valid
        @RequestBody
        payload: RegisterRequestDto,

        bindingResult: BindingResult
    ): LoginResponseDto {

        logger.info(payload.toString())

        registerValidator.validate(payload, bindingResult)

        if (bindingResult.hasErrors()) {
            return LoginResponseDto(
                result = mapOf(
                    *bindingResult.
                    allErrors
                        .map { (it as FieldError).field to it.defaultMessage }
                        .toTypedArray()
                ),
                token = null,
            )
        }

        val user = User(
            email = payload.email,
            username = payload.username.replace(" ", ""),
            password = hashService.hashBcrypt(payload.password),
        )

        val savedUser = userService.save(user)

        return LoginResponseDto(
            result = mapOf(),
            token = tokenService.createToken(savedUser),
        )
    }

}