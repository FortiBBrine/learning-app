package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.Calendar
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.sql.Timestamp

@Repository
interface CalendarRepository: JpaRepository<Calendar, Long> {
    fun findByUser(user: User): List<Calendar>
    fun findByTarget(user: User): List<Calendar>

    @Query("SELECT c FROM Calendar c WHERE c.user = :user AND c.fromTime > :fromTime ORDER BY c.fromTime")
    fun findByUser(
        @Param("user") user: User,
        @Param("fromTime") from: Timestamp
    ): MutableList<Calendar>
}
