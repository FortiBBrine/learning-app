package me.fortibrine.learningapp.service

import me.fortibrine.learningapp.model.AppUser
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService (
    private val userRepository: UserRepository
) {

    fun findById(id: String): AppUser? = userRepository.findByIdOrNull(id)
    fun findByUsername(username: String): AppUser? = userRepository.findByUsername(username)
    fun existsByName(name: String): Boolean = userRepository.existsByUsername(name)
    fun save(user: AppUser): AppUser = userRepository.save(user)

}