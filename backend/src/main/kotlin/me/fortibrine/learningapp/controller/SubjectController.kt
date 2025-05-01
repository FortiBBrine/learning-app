package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/subjects")
@RestController
class SubjectController (
    private val userRepository: UserRepository
) {

    @GetMapping
    fun getMySubjectList(
        @AuthenticationPrincipal principal: User
    ): List<String> = principal.subjects.toList()

    @PostMapping
    fun changeSubjectList(
        @RequestBody
        request: List<String>,

        @AuthenticationPrincipal principal: User,
    ): ResponseEntity<Void> {
        principal.subjects = request.toMutableSet()
        userRepository.save(principal)

        return ResponseEntity.status(HttpStatus.CREATED)
            .build()
    }

}
