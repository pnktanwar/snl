import React, { useState } from 'react';
import { Board } from './Board';
import { Dice } from './Dice';
import './Styles.css';

const Title = () => (
  <div className="title">Snakes n Ladders</div>
);

const Winner = ({ winner }) => (
  <div className={`snl-winner player-${winner}`}>Winner: Player {winner+1}</div>
);

const Legends = ({ numPlayers }) => {
  const playerLegends = Array(numPlayers).fill().map( (n, idx) => (
    <div className="legendWrapper">
      <div className={`legend player-pos player-${idx}`}></div>
      <span>Player { idx + 1 }</span>
    </div>
  ));
  return (
    <div className='legends'>
      { playerLegends }
    </div>
  );
};

export const Game = ({ cols, rows, steps, numPlayers }) => {
  const [ winner, setWinner ] = useState(-1);
  const [ playersPos, setPlayerPos ] = useState(Array(4).fill(0));
  const [ currentTurn, setCurrentTurn ] = useState(0);
  const [ currentDiceVal, setCurrentDiceVal ] = useState(0);
  const onThrow = (diceNum) => {
    const max = cols*rows;
    const positions = [...playersPos];
    if ( positions[currentTurn] + diceNum <= max ) {
      positions[currentTurn] += diceNum;
    }

    if ( steps[positions[currentTurn]] ) {
      positions[currentTurn] = steps[positions[currentTurn]];
    }

    if ( positions[currentTurn] === max ) {
      setWinner(currentTurn);
    }
    setCurrentDiceVal(diceNum);
    setPlayerPos(positions);
    setCurrentTurn((currentTurn + 1)%numPlayers);
  };
  return (
    <div className="snl-game">
      <Title />
      <Board rows={cols} cols={rows} steps={steps} playersPos={playersPos} />
      { winner === -1 ? (
          <>
            <div className="snl-dice-turn-player">Player {currentTurn+1} throw pending...</div>
            <Dice onThrow={onThrow} />
            { currentDiceVal > 0 && <div className="snl-dice-throw">Last player throw: { currentDiceVal }</div> }            
          </>
        ) : (
          <Winner winner={winner} />
        )
      }
      <Legends numPlayers={numPlayers} />
    </div>
  );
};