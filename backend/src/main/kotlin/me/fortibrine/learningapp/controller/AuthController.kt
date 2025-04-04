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
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController (
    private val hashService: HashService,
    private val tokenService: TokenService,
    private val userService: UserService,
    private val loginValidator: LoginValidator,
    private val registerValidator: RegisterValidator
) {

    @PostMapping("/login")
    fun login(
        @Valid
        @RequestBody
        payload: LoginRequestDto,

        bindingResult: BindingResult
    ): RegisterResponseDto {

        loginValidator.validate(payload, bindingResult)

        if (bindingResult.hasErrors()) {
            return RegisterResponseDto(
                result = bindingResult.fieldErrors.associate {
                    it.field to it.defaultMessage.orEmpty()
                },
            )
        }

        val user = userService.findByUsername(payload.username) as User

        return RegisterResponseDto(
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

        registerValidator.validate(payload, bindingResult)

        if (bindingResult.hasErrors()) {
            return LoginResponseDto(
                result = bindingResult.fieldErrors.associate {
                    it.field to it.defaultMessage.orEmpty()
                }
            )
        }

        val user = User(
            email = payload.email,
            name = payload.name,
            username = payload.username,
            password = hashService.hashBcrypt(payload.password),
        )

        val savedUser = userService.save(user)

        return LoginResponseDto(
            token = tokenService.createToken(savedUser),
        )
    }

}