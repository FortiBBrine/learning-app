package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.relation.RelationDto
import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RelationRepository
import me.fortibrine.learningapp.repository.UserRepository
import me.fortibrine.learningapp.service.RelationService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/relations")
class RelationController (
    private val userRepository: UserRepository,
    private val relationRepository: RelationRepository,
    private val relationService: RelationService
) {

    @GetMapping("/notmy")
    fun getAllNotMyRelations(
        @AuthenticationPrincipal principal: User
    ): List<RelationDto> {
        return userRepository.findUsersNotInRelation(principal).map {
            relationService.getRelation(it)
        }
    }

    @GetMapping
    fun allRelations(
        @AuthenticationPrincipal principal: User
    ): List<RelationDto> {
        val relation = relationRepository.findByTarget(principal) ?: return emptyList()
        return relation.users.map {
            relationService.getRelation(it)
        }
    }

    @PostMapping
    fun add(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ) {
        val relation = relationRepository.findByTarget(principal) ?: Relation(target = principal)
        relation.users.add(userRepository.findByUsername(username) ?: return)
        relationRepository.save(relation)
    }

    @DeleteMapping
    fun delete(
        @RequestParam(name = "username") username: String,

        @AuthenticationPrincipal principal: User
    ) {
        val relation = relationRepository.findByTarget(principal) ?: Relation(target = principal)
        relation.users.remove(userRepository.findByUsername(username) ?: return)
        relationRepository.save(relation)
    }

}
