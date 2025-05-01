package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.user.UserDto
import me.fortibrine.learningapp.mapper.UserMapper
import me.fortibrine.learningapp.model.Rating
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RatingRepository
import me.fortibrine.learningapp.repository.RelationRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/relations")
class RelationController(
    private val relationRepository: RelationRepository,
    private val userMapper: UserMapper,
    private val ratingRepository: RatingRepository,
    private val userRepository: UserRepository
) {

    @GetMapping("/suggestions")
    fun suggestions(
        @AuthenticationPrincipal principal: User
    ): List<UserDto> {
        return relationRepository.findNotInRelation(principal).map {
            val rating = ratingRepository.findAverageRatingByTarget(it) ?: 0.0
            return@map userMapper.toDto(it, rating)
        }
    }

    @GetMapping
    fun allRelations(
        @AuthenticationPrincipal principal: User
    ): List<UserDto> {
        val relations = relationRepository.findBySource(principal)
        return relations.map {
            val rating = ratingRepository.findAverageRatingByTarget(it.target) ?: 0.0
            return@map userMapper.toDto(it.target, rating)
        }
    }

    @PostMapping
    fun add(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ) {
        if (!relationRepository.existsBySourceAndTarget_Username(principal, username)) {
            relationRepository.addRelation(principal, username)
        }
    }

    @DeleteMapping
    fun delete(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ): Unit = relationRepository.delete(principal, username)

    @PostMapping("/rating")
    fun setRating(
        @RequestParam(name = "username") username: String,
        @RequestParam(name = "rating") rating: Int,

        @AuthenticationPrincipal principal: User
    ) {
        if (rating < 1 || rating > 5) return

        if (ratingRepository.findBySourceAndTarget_Username(principal, username) == null) {
            ratingRepository.save(Rating(
                source = principal,
                target = userRepository.findByUsername(username) ?: return,
                rating = rating,
            ))
        } else {
            ratingRepository.updateRating(principal, username, rating)
        }

    }

}
