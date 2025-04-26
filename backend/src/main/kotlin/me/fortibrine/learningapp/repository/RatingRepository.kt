package me.fortibrine.learningapp.repository

import jakarta.transaction.Transactional
import me.fortibrine.learningapp.model.Rating
import me.fortibrine.learningapp.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface RatingRepository: JpaRepository<Rating, Long> {

    @Modifying
    @Query("UPDATE Rating r SET r.rating = :rating WHERE r.source = :source AND r.target.username = :targetUsername")
    @Transactional
    fun updateRating(
        @Param("source") source: User,
        @Param("targetUsername") targetUsername: String,
        @Param("rating") rating: Int
    )

    @Query("SELECT ROUND(AVG(r.rating), 2) FROM Rating r WHERE r.target = :user")
    fun findAverageRatingByTarget(@Param("user") user: User): Double?

    fun findBySourceAndTarget_Username(source: User, targetUsername: String): Rating?

}