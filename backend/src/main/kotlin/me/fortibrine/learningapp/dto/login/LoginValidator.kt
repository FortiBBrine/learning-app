package me.fortibrine.learningapp.dto.login

import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.service.HashService
import me.fortibrine.learningapp.service.UserService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator

@Component
class LoginValidator (
    private val userService: UserService,
    private val hashService: HashService
): Validator {

    override fun supports(clazz: Class<*>) = LoginRequestDto::class.java == clazz

    override fun validate(target: Any, errors: Errors) {
        val payload = target as LoginRequestDto
        val user = userService.findByUsername(payload.username)

        if (SecurityContextHolder.getContext().authentication.principal is User) {
            errors.rejectValue("username", "", "Ви вже автентифіковані")
            return
        }

        if (user == null) {
            errors.rejectValue("username", "", "Невірне ім’я користувача або пароль")
            return
        }

        if (!hashService.checkBcrypt(payload.password, user.password)) {
            errors.rejectValue("username", "", "Невірне ім’я користувача або пароль")
        }
    }

}