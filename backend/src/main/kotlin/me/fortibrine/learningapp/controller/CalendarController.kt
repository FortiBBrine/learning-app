package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.calendar.GetAllCalendarDto
import me.fortibrine.learningapp.mapper.CalendarMapper
import me.fortibrine.learningapp.model.Calendar
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.CalendarRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.sql.Timestamp
import java.time.Instant

@RequestMapping("/api/calendars")
@RestController
class CalendarController(
    private val calendarRepository: CalendarRepository,
    private val userRepository: UserRepository,

    private val calendarMapper: CalendarMapper
) {

    @PostMapping("/schedule/{username}")
    fun schedule(
        @PathVariable("username") username: String,

        @RequestParam("from") from: Timestamp,
        @RequestParam("to") to: Timestamp,

        @AuthenticationPrincipal principal: User
    ) {
        val targetUser = userRepository.findByUsername(username) ?: return

        calendarRepository.save(Calendar(
            user = principal,
            fromTime = from,
            toTime = to,
            target = targetUser
        ))
    }

    @GetMapping("/show")
    fun showCalendar(
        @AuthenticationPrincipal principal: User
    ): GetAllCalendarDto {

        val calendars = calendarRepository.findByUser(principal, Timestamp.from(Instant.now()))

        return GetAllCalendarDto(
            calendars = calendars
                .map { calendarMapper.toDto(it) }
        )
    }

    @GetMapping("/show/{username}")
    fun showCalendar(
        @PathVariable("username") username: String,

        @AuthenticationPrincipal principal: User
    ): GetAllCalendarDto {

        val calendars = calendarRepository.findByUser(
            userRepository.findByUsername(username) ?: return GetAllCalendarDto(
                emptyList()
            ), Timestamp.from(Instant.now())
        )

        return GetAllCalendarDto(
            calendars = calendars
                .map { calendarMapper.toDto(it) }
        )
    }

}
