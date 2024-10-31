package me.fortibrine.learningapp.utils

import me.fortibrine.learningapp.model.AppUser
import org.springframework.security.core.Authentication

fun Authentication.toUser() = principal as AppUser
