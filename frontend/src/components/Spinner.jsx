import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Spinner = () => {
  return (
    <div className="flex justify-center w-16 h-16 m-8 rounded-full">
      <PacmanLoader color="#36d7b7" />
    </div>
  )
}

export default Spinner
