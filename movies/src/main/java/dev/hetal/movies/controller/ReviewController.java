package dev.hetal.movies.controller;

import com.sun.tools.jconsole.JConsoleContext;
import dev.hetal.movies.Service.ReviewService;
import dev.hetal.movies.model.Review;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/movies/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping()
    public ResponseEntity<?> addReview(@RequestBody Map<String, String> payload){
        System.out.println("Payload is: " + payload);
        if(payload.get("reviewBody") == null || payload.get("imdbId") == null) {
            return new ResponseEntity<String>("Bad Request", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteReview(@RequestBody Map<String, String> payload) throws Exception {

        if (payload.get("reviewId") == null || payload.get("imdbId") == null) {
            return new ResponseEntity<String>("Bad Request", HttpStatus.BAD_REQUEST);
        }
        try {
            reviewService.deleteReview(payload.get("reviewId"), payload.get("imdbId"));
        }
        catch(ResponseStatusException e){
            if(e.getStatusCode().equals(HttpStatus.NOT_FOUND))
            return new ResponseEntity<String>("Review not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity("Review was deleted", HttpStatus.OK);
    }
}
