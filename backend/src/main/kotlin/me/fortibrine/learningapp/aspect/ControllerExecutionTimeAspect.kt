package me.fortibrine.learningapp.aspect

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Aspect
@Component
class ControllerExecutionTimeAspect {

    private val logger = LoggerFactory.getLogger(this::class.java)

    @Around("execution(* me.fortibrine.learningapp.controller.*.*(..))")
    fun measureExecutionTime(joinPoint: ProceedingJoinPoint): Any? {
        val startTime = System.currentTimeMillis()

        try {
            return joinPoint.proceed()
        } finally {
            val executionTime = System.currentTimeMillis() - startTime
            logger.info(
                "Method ${joinPoint.signature.toShortString()} is executed at $executionTime ms",
                joinPoint.signature.toShortString(),
                executionTime
            )
        }
    }
}