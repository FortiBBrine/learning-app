package me.fortibrine.learningapp.mapper

import me.fortibrine.learningapp.dto.relation.RelationDto
import me.fortibrine.learningapp.model.Relation
import me.fortibrine.learningapp.model.User
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface RelationMapper {
    @Mapping(source = "relation.target.name", target = "name")
    @Mapping(source = "relation.target.username", target = "username")
    @Mapping(source = "relation.target.email", target = "email")
    @Mapping(source = "relation.target.subjects", target = "subjects")
    @Mapping(target = "rating", source = "rating")
    fun toDto(relation: Relation, rating: Double): RelationDto

    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.subjects", target = "subjects")
    @Mapping(target = "rating", source = "rating")
    fun toDto(user: User, rating: Double): RelationDto
}