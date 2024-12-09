package me.fortibrine.learningapp

import me.fortibrine.learningapp.model.Calendar
import me.fortibrine.learningapp.repository.CalendarRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.sql.Timestamp
import java.time.LocalDateTime

//@Component
class CommandLineRunnerImpl(
    private val calendarRepository: CalendarRepository,
    private val userRepository: UserRepository
): CommandLineRunner {

    override fun run(vararg args: String) {

        val user = userRepository.findByUsername("sashasteblevets") ?: return
        val target = userRepository.findByUsername("Samantha") ?: return

        calendarRepository.save(Calendar(
            user = user,
            fromTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 7, 0)),
            toTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 8, 0)),
            target = target
        ))

        calendarRepository.save(Calendar(
            user = target,
            fromTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 7, 0)),
            toTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 8, 0)),
            target = user
        ))
    }

}