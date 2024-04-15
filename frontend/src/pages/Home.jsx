import React, { useState, useEffect } from 'react';
import { PORT } from '../constants';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Home = () => {
    const [question, setQuestion] = useState({});
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        axios.get(`http://localhost:${PORT}`)
        .then((res) =>{
            setQuestion(res.data);
            setLoading(false);
        })
        .catch((err) =>{
            console.log(err);
            setLoading(false);
        })
    }, [])



  return (
    <div>
     {question.country} - {question.capital}
    </div>
  )
}

export default Home
