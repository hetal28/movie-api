package dev.hetal.movies.Service;

import dev.hetal.movies.Repo.MovieRepository;
import dev.hetal.movies.model.Movie;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies(){

        return movieRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
    }

    public Optional<Movie> getMovie(ObjectId id) {

        return movieRepository.findById(id);
    }

    public Optional<Movie> getMovieByImdbId(String imdbId){
        Optional<Movie> movie =  movieRepository.findMovieByImdbId(imdbId);
        System.out.println("Movie is: " + movie);
        return movie;
    }
}
