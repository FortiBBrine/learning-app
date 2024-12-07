package me.fortibrine.learningapp

import me.fortibrine.learningapp.model.Calendar
import me.fortibrine.learningapp.repository.CalendarRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.sql.Timestamp
import java.time.LocalDateTime

@Component
class CommandLineRunnerImpl(
    private val calendarRepository: CalendarRepository,
    private val userRepository: UserRepository
): CommandLineRunner {

    override fun run(vararg args: String) {
        /*
        val user = userRepository.findByUsername("sashasteblevets") ?: return

        println(user)
        calendarRepository.save(Calendar(
            user = user,
            timestamp = Timestamp.valueOf(LocalDateTime.now()),
            target = userRepository.findByUsername("Kamren") ?: return
        ))
         */
    }

}