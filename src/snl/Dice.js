import React from 'react';

const getRandom = (min, max) => {
  return (Math.floor(Math.random()*100 % max) + min);
};

export const Dice = ({ onThrow }) => {
  const throwDice = () => {
    onThrow(getRandom(1, 6));
  };
  
  return (
    <div className="snl-dice">
      <button onClick={throwDice}>Throw Dice</button>      
    </div>
  );
};