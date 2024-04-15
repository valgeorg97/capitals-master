import React, { useState, useEffect } from 'react';
import { PORT } from '../constants';
import axios from 'axios';
import Spinner from '../components/Spinner';
import logo from '../assets/logo.png'

const Home = () => {
    const [question, setQuestion] = useState({});
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:${PORT}`)
            .then((res) => {
                setQuestion(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:${PORT}`, {
                country: question.country,
                userAnswer: userAnswer
            });
            const data = response.data;
            if (data.isCorrect) {
                setScore(score + 1);
            } else {
                alert(`Wrong answer, the capital of ${question.country} is ${question.capital}! Try again.`)
                setScore(0);
                setUserAnswer('');
            }
            setLoading(false);
            setUserAnswer('');
            setQuestion(data.question);
        } catch (error) {
            setLoading(false);
            console.error('Error submitting answer:', error);
        }
    };

    return (
         <div className="flex flex-col justify-start items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
                <img src={logo} alt="Logo" className="h-52 w-auto mb-4 self-center" />
                <div className="container shadow-xl max-w-lg mx-auto border border-gray-300 rounded-md px-4 py-8 bg-slate-50">
                    <div className="flex justify-center items-center mb-4">
                        <div className="font-bold text-xl">Total Points: {score}</div>
                    </div>
                {loading ? (
                    <div className="flex justify-center items-center mb-4">
                        <Spinner />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="mb-4">
                            <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">
                                Which is the capital of {question.country}?
                            </label>
                            <input
                                type="text"
                                id="answer"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center'>
                        <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-400 
                        hover:from-green-400 hover:to-blue-500 text-white px-4 py-2 rounded-md items-center flex">
                            Submit
                        </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Home;
