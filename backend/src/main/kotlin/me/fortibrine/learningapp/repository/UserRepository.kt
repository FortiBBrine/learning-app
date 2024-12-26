package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
    fun existsByUsername(username: String): Boolean

    @Query("SELECT u FROM users u WHERE u NOT IN (SELECT r.users FROM relations r WHERE r.target = :user) AND u <> :user")
    fun findUsersNotInRelation(@Param("user") user: User): List<User>
}
