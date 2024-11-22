package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.controller.RelationDto
import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RelationRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/relation")
class RelationController (
    private val userRepository: UserRepository,
    private val relationRepository: RelationRepository
) {

    @GetMapping("/all")
    fun allRelations(
        @AuthenticationPrincipal principal: User
    ): List<RelationDto> {
        val relation = relationRepository.findByTarget(principal) ?: return emptyList()
        return relation.users.map { RelationDto(name = it.name) }
    }

    @PostMapping("/add")
    fun add(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ) {
        val relation = relationRepository.findByTarget(principal) ?: Relation(target = principal)
        relation.users.add(userRepository.findByUsername(username) ?: return)
        relationRepository.save(relation)
    }

    @PostMapping("/remove")
    fun remove(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ) {
        val relation = relationRepository.findByTarget(principal) ?: Relation(target = principal)
        relation.users.remove(userRepository.findByUsername(username) ?: return)
        relationRepository.save(relation)
    }

}
