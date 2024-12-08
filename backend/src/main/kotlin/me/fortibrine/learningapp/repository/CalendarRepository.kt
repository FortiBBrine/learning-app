package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.Calendar
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CalendarRepository: JpaRepository<Calendar, Long> {
    fun findByUser(user: User): List<Calendar>
    fun findByTarget(user: User): List<Calendar>
}
