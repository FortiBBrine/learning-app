package me.fortibrine.learningapp.repository

import me.fortibrine.learningapp.model.ScheduleRequest
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface ScheduleRequestRepository: JpaRepository<ScheduleRequest, Long> {
    fun findByTarget(target: User): List<ScheduleRequest>
}