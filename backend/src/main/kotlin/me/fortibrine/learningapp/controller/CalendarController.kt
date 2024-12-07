package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.calendar.CalendarDto
import me.fortibrine.learningapp.dto.calendar.GetAllCalendarDto
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.CalendarRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/calendar")
@RestController
class CalendarController (
    private val calendarRepository: CalendarRepository
) {

    @GetMapping("/all")
    fun getMyCalendar(
        @AuthenticationPrincipal principal: User
    ): GetAllCalendarDto {
        val calendars = calendarRepository.findByUser(principal)

        return GetAllCalendarDto(
            calendars = calendars
                .filter { it.target != null }
                .filter { it.timestamp != null }
                .map { calendar ->
                    return@map CalendarDto(
                        username = calendar.target!!.username,
                        timestamp = calendar.timestamp!!
                    )
                }
        )
    }

}
