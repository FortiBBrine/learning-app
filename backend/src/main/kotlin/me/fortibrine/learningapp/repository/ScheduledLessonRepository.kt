package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.ScheduledLesson
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.sql.Timestamp

@Repository
interface ScheduledLessonRepository: JpaRepository<ScheduledLesson, Long> {
    fun findBySource(user: User): List<ScheduledLesson>
    fun findByTarget(user: User): List<ScheduledLesson>

    @Query("SELECT c FROM ScheduledLesson c WHERE c.source = :source AND c.fromTime > :fromTime ORDER BY c.fromTime")
    fun findBySource(
        @Param("source") source: User,
        @Param("fromTime") from: Timestamp
    ): MutableList<ScheduledLesson>
}
