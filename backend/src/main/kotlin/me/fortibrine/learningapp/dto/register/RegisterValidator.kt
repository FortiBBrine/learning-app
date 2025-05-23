package me.fortibrine.learningapp.dto.register

import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.service.UserService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator

@Component
class RegisterValidator(
    private val userService: UserService
): Validator {
    override fun supports(clazz: Class<*>) = RegisterRequestDto::class.java == clazz

    override fun validate(target: Any, errors: Errors) {
        val payload = target as RegisterRequestDto

        if (SecurityContextHolder.getContext().authentication.principal is User) {
            errors.rejectValue("username", "", "Ви вже автентифіковані")
            return
        }

        if (userService.existsByName(payload.username)) {
            errors.rejectValue("username", "", "Користувач з таким іменем вже існує")
        }

    }

}