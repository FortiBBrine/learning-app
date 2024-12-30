package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.SubjectList
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SubjectRepository: JpaRepository<SubjectList, Long> {
    fun findByTarget(target: User): SubjectList?
}
