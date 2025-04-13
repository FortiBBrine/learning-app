package me.fortibrine.learningapp.exception.handler

import me.fortibrine.learningapp.dto.exception.ErrorResponse
import me.fortibrine.learningapp.dto.exception.ValidationErrorResponse
import me.fortibrine.learningapp.exception.ValidationError
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ValidationError::class)
    fun handleValidationError(exception: ValidationError): ResponseEntity<ValidationErrorResponse> {
        return ResponseEntity.badRequest()
            .body(ValidationErrorResponse(
                errors = exception.errors,
                message = "VALIDATION_ERROR"
            ))
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleException(exception: HttpMessageNotReadableException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.badRequest()
            .body(ErrorResponse("INVALID_BODY"))
    }

}