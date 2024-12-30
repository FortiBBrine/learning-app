package me.fortibrine.learningapp.service

import me.fortibrine.learningapp.dto.controller.RelationDto
import me.fortibrine.learningapp.model.SubjectList
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.SubjectRepository
import org.springframework.stereotype.Service

@Service
class RelationService (
    private val subjectRepository: SubjectRepository
) {

    fun getRelation(user: User): RelationDto {

        val subjectList = subjectRepository.findByTarget(user)
            ?: SubjectList(target = user, subjects = mutableSetOf())

        return RelationDto(
            name = user.name,
            username = user.username,
            email = user.email,
            subjects = subjectList.subjects.toList()
        )
    }

}
