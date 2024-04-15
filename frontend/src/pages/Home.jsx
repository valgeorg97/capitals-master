import React, { useState } from 'react';
import { PORT } from '../constants';

const Home = () => {

    const [question, setQuestion] = useState({});
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);


  return (
    <div>
      home
    </div>
  )
}

export default Home
