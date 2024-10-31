package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.AppUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<AppUser, String> {

    fun findByUsername(username: String): AppUser?
    fun existsByUsername(username: String): Boolean
    fun findByEmail(email: String): AppUser?
//    fun existByUsername(username: String): Boolean
//    fun existByEmail(email: String): Boolean

}