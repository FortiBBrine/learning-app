package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.lesson.request.ScheduleRequestDto
import me.fortibrine.learningapp.mapper.ScheduleRequestMapper
import me.fortibrine.learningapp.mapper.UserMapper
import me.fortibrine.learningapp.model.ScheduledLesson
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RatingRepository
import me.fortibrine.learningapp.repository.ScheduleRequestRepository
import me.fortibrine.learningapp.repository.ScheduledLessonRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/schedules")
@RestController
class ScheduleRequestController(
    private val scheduleRequestRepository: ScheduleRequestRepository,
    private val scheduleRequestMapper: ScheduleRequestMapper,
    private val userRepository: UserRepository,
    private val scheduledLessonRepository: ScheduledLessonRepository,
    private val userMapper: UserMapper,
    private val ratingRepository: RatingRepository
) {

    @GetMapping
    fun getSchedules (
        @AuthenticationPrincipal principal: User,
    ): List<me.fortibrine.learningapp.dto.lesson.response.ScheduleRequestDto> {
        return scheduleRequestRepository
            .findByTarget(principal)
            .map { me.fortibrine.learningapp.dto.lesson.response.ScheduleRequestDto(
                id = it.id ?: 0,
                from = it.fromTime,
                to = it.toTime,
                online = it.online,
                title = it.title,
                subject = it.subject,
                source = userMapper.toDto(
                    it.source,
                    ratingRepository.findAverageRatingByTarget(it.source) ?: 0.0,
                    ),
                target = userMapper.toDto(
                    it.target,
                    ratingRepository.findAverageRatingByTarget(it.target) ?: 0.0,
                ),
            ) }
    }

    @PostMapping
    fun schedule (
        @RequestBody scheduleRequestDto: ScheduleRequestDto,

        @AuthenticationPrincipal principal: User
    ) {
        scheduleRequestRepository.save(scheduleRequestMapper.fromDto(
            scheduleRequestDto,
            principal,
            userRepository.findByUsername(scheduleRequestDto.target) ?: return
        ))
    }

    @PostMapping("/answer")
    fun answer (
        @RequestParam requestId: Long,
        @RequestParam answer: Boolean,

        @AuthenticationPrincipal principal: User
    ) {
        val request = scheduleRequestRepository.findById(requestId)
            .orElse(null) ?: return

        scheduleRequestRepository.deleteById(requestId)

        if (request.target.username != principal.username) return

        if (answer) {
            scheduledLessonRepository.save(ScheduledLesson(
                source = request.source,
                target = request.target,
                online = request.online,
                subject = request.subject,
                title = request.title,
                fromTime = request.fromTime,
                toTime = request.toTime,
            ))

            scheduledLessonRepository.save(ScheduledLesson(
                source = request.target,
                target = request.source,
                online = request.online,
                subject = request.subject,
                title = request.title,
                fromTime = request.fromTime,
                toTime = request.toTime,
            ))
        }

    }

}
