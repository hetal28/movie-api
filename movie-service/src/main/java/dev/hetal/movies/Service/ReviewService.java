package dev.hetal.movies.Service;

import dev.hetal.movies.Repo.ReviewRepository;
import dev.hetal.movies.model.Movie;
import dev.hetal.movies.model.Review;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId){
        System.out.println("In insert review method");
        Review review = reviewRepository.insert(new Review(reviewBody));
        System.out.println(review);

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();
        return review;

    }

    public void deleteReview(String reviewId, String imdbId) throws Exception {
        System.out.println("In delete review method");
        System.out.println(reviewId);
        ObjectId reviewObjectId = new ObjectId(reviewId);

        Optional<Review> review = reviewRepository.findById(reviewObjectId);

        if (review.isEmpty()) {
            System.out.println("Not found");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review Not Found");
        }
        //System.out.println(reviewObjectId);
        reviewRepository.deleteById(reviewObjectId);
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().pull("reviewIds", reviewObjectId))
                .all();
        return;
    }
}
