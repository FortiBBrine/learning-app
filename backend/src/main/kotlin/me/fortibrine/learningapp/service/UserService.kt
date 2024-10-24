package me.fortibrine.learningapp.service

import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService (
    private val userRepository: UserRepository
) {

    fun findById(id: String): User? = userRepository.findByIdOrNull(id)
    fun findByUsername(username: String): User? = userRepository.findByUsername(username)
    fun existsByName(name: String): Boolean = userRepository.existsByUsername(name)
    fun save(user: User): User = userRepository.save(user)

}