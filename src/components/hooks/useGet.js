import api from '../../api/axiosConfig';
import {useEffect, useState} from 'react';

const useGet = (url) => {  
    const[data, setData] = useState(null);
    const[error, setError] = useState(null);
    const[isloading, setIsLoading] = useState(true);
    const[reviews, setReviews] = useState();

    const setMovieReviews = (reviewIds) => {
        setReviews(reviewIds);
    }

    useEffect(() => {
        const getMovieData = async() => {
        try{
            const res = await api.get(url);
            if(res.status === 404){
                throw Error('could not fetch the data for that resource');
            }
            if(res.status === 400){
                throw Error("URL to fetch the resource is not available");
            }
            setData(res.data);
            setReviews(res.data.reviewIds)
            setError(null);
            setIsLoading(false);
        }catch(err){
            console.error("Error occured in useGet hook: " + err);
            setError(err);
            setIsLoading(false);
        }
    }
    getMovieData();
    },[url])
    
    return {data, error, isloading, reviews, setMovieReviews}    
}

export default useGet;