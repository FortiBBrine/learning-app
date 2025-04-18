package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.relation.RelationDto
import me.fortibrine.learningapp.mapper.RelationMapper
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RelationRepository
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
    private val relationMapper: RelationMapper
) {

    @GetMapping("/suggestions")
    fun suggestions(
        @AuthenticationPrincipal principal: User
    ): List<RelationDto> {
        return relationRepository.findNotInRelation(principal).map {
            val rating = relationRepository.findAverageRatingByTarget(it) ?: 0.0
            return@map relationMapper.toDto(it, rating)
        }
    }

    @GetMapping
    fun allRelations(
        @AuthenticationPrincipal principal: User
    ): List<RelationDto> {
        val relations = relationRepository.findBySource(principal)
        return relations.filter { it.show }.map {
            val rating = relationRepository.findAverageRatingByTarget(it.target) ?: 0.0
            return@map relationMapper.toDto(it, rating)
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

    @PostMapping("/hide")
    fun hide(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ): Unit = relationRepository.hideRelation(principal, username)

    @PostMapping("/rating")
    fun setRating(
        @RequestParam(name = "username") username: String,
        @RequestParam(name = "rating") rating: Int,

        @AuthenticationPrincipal principal: User
    ) {
        if (rating < 1 || rating > 5) return

        relationRepository.updateRating(principal, username, rating)
    }

}
