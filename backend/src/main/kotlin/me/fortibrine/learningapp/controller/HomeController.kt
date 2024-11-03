package me.fortibrine.learningapp.controller

import ch.qos.logback.core.model.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeController {

    @GetMapping("/")
    fun home(model: Model) = ""

}