package me.fortibrine.learningapp.exception.handler

import jakarta.servlet.http.HttpServletRequest
import me.fortibrine.learningapp.dto.exception.ErrorDetail
import me.fortibrine.learningapp.dto.exception.ErrorResponse
import me.fortibrine.learningapp.exception.ValidationError
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.lang.Exception

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ValidationError::class)
    fun handleValidationError(
        exception: ValidationError,
        request: HttpServletRequest,
    ): ResponseEntity<ErrorResponse> {
        return ResponseEntity.badRequest()
            .body(ErrorResponse(
                error = ErrorDetail(
                    type = "VALIDATION_ERROR",
                    message = "Validation error",
                    status = HttpStatus.BAD_REQUEST.value(),
                    path = request.requestURI,
                    data = exception.errors
                )
            ))
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleNotReadableException(
        exception: HttpMessageNotReadableException,
        request: HttpServletRequest,
    ): ResponseEntity<ErrorResponse> {
        return ResponseEntity.badRequest()
            .body(ErrorResponse(
                error = ErrorDetail(
                    type = "INVALID_BODY",
                    message = "Invalid body",
                    status = HttpStatus.BAD_REQUEST.value(),
                    path = request.requestURI,
                    data = null
                )
            ))
    }

    @ExceptionHandler(Exception::class)
    fun handlerOtherException(
        exception: Exception,
        request: HttpServletRequest,
    ): ResponseEntity<ErrorResponse> {
        return ResponseEntity.badRequest()
            .body(ErrorResponse(
                error = ErrorDetail(
                    type = "INTERNAL_SERVER_ERROR",
                    message = "Internal Server Error",
                    status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    path = request.requestURI,
                    data = null
                )
            ))
    }

    @ExceptionHandler(InvalidBearerTokenException::class)
    fun handleInvalidTokenException(
        exception: Exception,
        request: HttpServletRequest,
    ): ResponseEntity<ErrorResponse> {
        return ResponseEntity.badRequest()
            .body(ErrorResponse(
                error = ErrorDetail(
                    type = "INVALID_TOKEN_ERROR",
                    message = "Invalid Token Error",
                    status = HttpStatus.UNAUTHORIZED.value(),
                    path = request.requestURI,
                    data = null
                )
            ))
    }

}