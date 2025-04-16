package me.fortibrine.learningapp.mapper

import me.fortibrine.learningapp.dto.relation.RelationDto
import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface RelationMapper {
    @Mapping(source = "target.name", target = "name")
    @Mapping(source = "target.username", target = "username")
    @Mapping(source = "target.email", target = "email")
    @Mapping(source = "target.subjects", target = "subjects")
    fun toDto(relation: Relation): RelationDto

    fun toDto(user: User): RelationDto
}