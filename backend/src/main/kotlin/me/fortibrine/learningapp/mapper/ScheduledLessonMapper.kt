package me.fortibrine.learningapp.mapper

import me.fortibrine.learningapp.dto.lesson.ScheduledLessonDto
import me.fortibrine.learningapp.model.ScheduledLesson
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface ScheduledLessonMapper {

    @Mapping(source = "target.name", target = "name")
    @Mapping(source = "target.username", target = "username")
    @Mapping(source = "fromTime", target = "from")
    @Mapping(source = "toTime", target = "to")
    fun toDto(lesson: ScheduledLesson): ScheduledLessonDto

}