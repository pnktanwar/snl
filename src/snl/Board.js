import React from 'react';

const Box = ({ num, gotoPos, playersPos }) => {
  const positions = [];
  const isStepper = gotoPos && gotoPos > 0;
  const isSnake = isStepper && (gotoPos < num);
  const isLadder = isStepper && (gotoPos > num);
  const totals = playersPos.filter(pos => pos === num);
  playersPos.forEach( (pos, playerNum) => {
    if ( pos === num ) {
      positions.push(
        <div key={playerNum} className={`player-pos player-${playerNum}`} style={{ 
          width: Math.floor(100/totals.length)+'%'
        }}></div>
      );
    }
  });
  return (
    <div className="box">
      <div className="box-player-pos">{ positions }</div>
      <div className={`box-num ${isStepper && 'stepper'} ${isSnake && 'snake'} ${isLadder && 'ladder'}`}>{ num } { isStepper && ` -> ${gotoPos}` }</div>
    </div>
  );
};

const Row = ({ num, start, steps, end, playersPos }) => {
  const boxes = Array(end - start + 1).fill().map( (n, idx) => {
    const boxNum = start + idx;
    return (
      <Box key={idx} num={boxNum} gotoPos={steps[boxNum]} playersPos={playersPos} />
    );
  });
  return (
    <div className={`snl-board-row ${num % 2 ? 'rev' : ''}`}>
      { boxes }
    </div>
  );
};

export const Board = ({ rows, cols, steps, playersPos }) => {
  const rowElems = Array(rows).fill().map( (n, idx) => ( 
    <Row key={idx} num={idx} start={idx*cols + 1} end={idx*cols + cols} steps={steps} playersPos={playersPos} />)
  );
  return (
    <div className="snl-board">
      { rowElems }
    </div>
  );
};
