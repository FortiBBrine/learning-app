package me.fortibrine.learningapp.utils

import me.fortibrine.learningapp.model.User
import org.springframework.security.core.Authentication

fun Authentication.toUser() = principal as User
