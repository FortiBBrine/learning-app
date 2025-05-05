package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.user.UserDto
import me.fortibrine.learningapp.mapper.UserMapper
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RatingRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/profile")
class ProfileController(
    private val userMapper: UserMapper,
    private val ratingRepository: RatingRepository
) {

    @GetMapping
    fun getProfile(
        @AuthenticationPrincipal principal: User,
    ): UserDto =
        userMapper.toDto(principal, ratingRepository.findAverageRatingByTarget(principal) ?: 0.0)


}