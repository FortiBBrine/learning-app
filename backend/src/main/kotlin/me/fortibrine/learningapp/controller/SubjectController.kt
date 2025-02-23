package me.fortibrine.learningapp.controller

import me.fortibrine.learningapp.dto.subject.request.ChangeSubjectListDto
import me.fortibrine.learningapp.dto.subject.response.GetSubjectListDto
import me.fortibrine.learningapp.model.SubjectList
import me.fortibrine.learningapp.model.User
import me.fortibrine.learningapp.repository.SubjectRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/subject")
@RestController
class SubjectController (
    private val subjectRepository: SubjectRepository
) {

    @GetMapping("/view")
    fun getMySubjectList(
        @AuthenticationPrincipal principal: User
    ): GetSubjectListDto {
        val subjectList = subjectRepository.findByTarget(principal) ?:
            return GetSubjectListDto(emptyList())

        return GetSubjectListDto(subjectList.subjects.toList())
    }

    @PostMapping("/change")
    fun changeSubjectList(
        @RequestBody
        request: ChangeSubjectListDto,

        @AuthenticationPrincipal principal: User,
    ) {
        val subjectList = subjectRepository.findByTarget(principal)
            ?: SubjectList(target = principal, subjects = request.subjects.toMutableSet())

        subjectList.subjects = request.subjects.toMutableSet()

        subjectRepository.save(subjectList)
    }

}
