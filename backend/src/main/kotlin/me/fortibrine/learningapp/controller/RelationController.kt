package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.controller.AddRelationDto
import me.fortibrine.learningapp.dto.controller.RelationDto
import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.RelationRepository
import me.fortibrine.learningapp.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class RelationController (
    private val userRepository: UserRepository,
    private val relationRepository: RelationRepository
) {

    @GetMapping("/relation/all")
    fun allRelations(
        @AuthenticationPrincipal principal: User
    ): List<RelationDto> {
        val relation = relationRepository.findByTarget(principal) ?: return emptyList()
        return relation.users.map { RelationDto(it.username) }
    }

    @PostMapping("/relation/add")
    fun add(
        @RequestBody addRelationDto: AddRelationDto,

        @AuthenticationPrincipal principal: User
    ) {
        val relation = relationRepository.findByTarget(principal) ?: Relation(target = principal)
        relation.users.add(userRepository.findByUsername(addRelationDto.username) ?: return)
        relationRepository.save(relation)
    }

}
