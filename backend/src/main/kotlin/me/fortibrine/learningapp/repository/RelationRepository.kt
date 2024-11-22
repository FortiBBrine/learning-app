package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RelationRepository: JpaRepository<Relation, Long> {
    fun findByTarget_Username(username: String): Relation?
    fun findByTarget(target: User): Relation?
}
