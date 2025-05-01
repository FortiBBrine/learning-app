package me.fortibrine.learningapp.mapper

import me.fortibrine.learningapp.dto.lesson.request.ScheduleRequestDto
import me.fortibrine.learningapp.model.ScheduleRequest
import me.fortibrine.learningapp.model.User
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface ScheduleRequestMapper {

    @Mapping(source = "request.online", target = "online")
    @Mapping(source = "source", target = "source")
    @Mapping(source = "target", target = "target")
    @Mapping(source = "request.title", target = "title")
    @Mapping(source = "request.subject", target = "subject")
    @Mapping(source = "request.from", target = "fromTime")
    @Mapping(source = "request.to", target = "toTime")
    @Mapping(source = "id", target = "id")
    fun fromDto(
        request: ScheduleRequestDto,
        source: User,
        target: User,
        id: Long? = null
    ): ScheduleRequest

}