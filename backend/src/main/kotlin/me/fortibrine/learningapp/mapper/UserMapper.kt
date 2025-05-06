package me.fortibrine.learningapp.mapper

import me.fortibrine.learningapp.dto.user.UserDto
import me.fortibrine.learningapp.model.User
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface UserMapper {
    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.subjects", target = "subjects")
    @Mapping(source = "user.role", target = "role")
    @Mapping(target = "rating", source = "rating")
    fun toDto(user: User, rating: Double): UserDto
}