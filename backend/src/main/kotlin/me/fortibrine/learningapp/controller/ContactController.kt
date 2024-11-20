package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.controller.ContactDto
import me.fortibrine.learningapp.model.AppUser
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ContactController (
    private val userRepository: UserRepository
) {

    @GetMapping("/all")
    fun allContacts(): List<ContactDto> {
        val authentication = SecurityContextHolder.getContext().authentication ?: return emptyList()
        val principal = authentication.principal as AppUser

        return principal.contacts.map { ContactDto(it) }.toList()
    }

    @PostMapping
    fun addToContacts(username: String) {
        val authentication = SecurityContextHolder.getContext().authentication ?: return
        val principal = authentication.principal as AppUser

        principal.contacts.add(username)
        userRepository.save(principal)
    }

}
