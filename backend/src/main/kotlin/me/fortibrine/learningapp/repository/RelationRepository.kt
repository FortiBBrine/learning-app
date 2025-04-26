package me.fortibrine.learningapp.repository

import jakarta.transaction.Transactional
import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface RelationRepository: JpaRepository<Relation, Long> {
    fun findBySource(source: User): List<Relation>

    @Modifying
    @Query("DELETE FROM Relation r WHERE r.source = :source AND r.target.username = :username")
    @Transactional
    fun delete(
        @Param("source") source: User,
        @Param("username") username: String
    )

    @Query(
        "SELECT u FROM AppUser u WHERE u <> :user AND u NOT IN " +
            "(SELECT r.target FROM Relation r WHERE r.source = :user)")
    fun findNotInRelation(@Param("user") user: User): List<User>

    @Modifying
    @Query("INSERT INTO Relation (source, target) " +
            "SELECT :principal, u FROM AppUser u WHERE u.username = :username"
    )
    @Transactional
    fun addRelation(
        @Param("principal") principal: User,
        @Param("username") username: String
    )

    fun existsBySourceAndTarget_Username(source: User, targetUsername: String): Boolean

}
