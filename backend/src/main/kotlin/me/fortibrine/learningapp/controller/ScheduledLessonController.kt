package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.lesson.ScheduledLessonDto
import me.fortibrine.learningapp.mapper.ScheduledLessonMapper
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.ScheduledLessonRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.sql.Timestamp
import java.time.Instant

@RequestMapping("/api/lessons")
@RestController
class ScheduledLessonController(
    private val lessonsRepository: ScheduledLessonRepository,
    private val userRepository: UserRepository,

    private val lessonsMapper: ScheduledLessonMapper
) {

    @GetMapping
    fun showLessons(
        @AuthenticationPrincipal principal: User
    ): List<ScheduledLessonDto> {

        val lessons = lessonsRepository.findBySource(principal, Timestamp.from(Instant.now()))

        return lessons
            .map { lessonsMapper.toDto(it) }
    }

    @GetMapping("/{username}")
    fun showLessons(
        @PathVariable("username") username: String,

        @AuthenticationPrincipal principal: User
    ): List<ScheduledLessonDto> {

        val lessons = lessonsRepository.findBySource(
            userRepository.findByUsername(username) ?: return emptyList(),
            Timestamp.from(Instant.now())
        )

        return lessons
            .map { lessonsMapper.toDto(it) }
    }

}
