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
        calendarRepository.save(Calendar(
            user = userRepository.findByUsername("sashasteblevets") ?: return,
            fromTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 9, 0)),
            toTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 10, 0)),
            target = userRepository.findByUsername("Kamren") ?: return
        ))

        calendarRepository.save(Calendar(
            user = userRepository.findByUsername("Kamren") ?: return,
            fromTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 9, 0)),
            toTime = Timestamp.valueOf(LocalDateTime.of(2024, 12, 13, 10, 0)),
            target = userRepository.findByUsername("sashasteblevets") ?: return
        ))
    }

}