package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.user.SettingUserDto
import me.fortibrine.learningapp.dto.user.UserDto
import me.fortibrine.learningapp.mapper.UserMapper
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RatingRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/profile")
class ProfileController(
    private val userMapper: UserMapper,
    private val ratingRepository: RatingRepository,
    private val userRepository: UserRepository
) {

    @GetMapping
    fun getProfile(
        @AuthenticationPrincipal principal: User,
    ): UserDto =
        userMapper.toDto(principal, ratingRepository.findAverageRatingByTarget(principal) ?: 0.0)

    @PostMapping("/setting")
    fun settingProfile (
        @RequestBody payload: SettingUserDto,

        @AuthenticationPrincipal principal: User,
    ) {
        if (payload.name != null) principal.name = payload.name
        if (payload.email != null) principal.email = payload.email
        if (payload.subjects != null)
            principal.subjects = payload.subjects.toMutableSet()
        if (payload.role != null) principal.role = payload.role

        userRepository.save(principal)
    }

}