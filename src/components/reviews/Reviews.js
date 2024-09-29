import { useRef } from 'react';
import api from '../../api/axiosConfig';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import {v4 as uuidv4} from "uuid"
import {Button} from 'react-bootstrap';

//import custom hook
import useGet from '../hooks/useGet';

const Reviews = () => {    
    const navigate = useNavigate();
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    const {data: movie, error, isloading, reviews, setMovieReviews} = useGet(`/api/v1/movies/imdb/${movieId}`)

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try{
            const response = await api.post("/api/v1/movies/reviews", {reviewBody:rev.value, imdbId:movieId});
             console.log("In addReview: ")
            if(response.status === 200){
                setMovieReviews([...reviews, {id: response.data.id, body: response.data.body}]);
                rev.value = "";
                navigate(`/Reviews/${movieId}`);
            }
            if(response.status === 400){
                throw Error("Bad request!!");
            }
            if(response.status === 404){
                throw Error("Resource to save your data is not available!!");
            }
            if(response.status === 500){
                throw Error("System couldn't save your review!!");
            }
        }catch(err){
            console.error("Error occured in adding a Review: " + err);
        }
    }

    const deleteReview = async (reviewId) => {
        console.log("In deleteReview: " + reviewId);
        try{
            const response = await api.delete("/api/v1/movies/reviews", {data:{reviewId:reviewId, imdbId:movieId}});
            if(response.status === 200){
                const updatedReviews = [...reviews].filter((review) => review.id !== reviewId)
                setMovieReviews(updatedReviews);
                navigate(`/Reviews/${movieId}`);
            }
        }catch(err){
            console.error("Error occured in deleting a Review: " + err);
        }
    }

  return (
    <>
        {isloading && <div>Loading the content...</div>}
        {error && <div>{Error}</div>}
        {movie && (
        <Container>
            <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row key={uuidv4()}>
                                    <Col sm={10}>{r.body}</Col>
                                    <Col sm={2}><Button variant='outline-info' onClick={() => deleteReview(r.id)}>Delete</Button></Col>
                                </Row>
                                
                                <Row key={`hr_${uuidv4()}`}>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
        </Container>
    )} 
    </>       
  )
}

export default Reviews
