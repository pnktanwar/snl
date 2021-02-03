import { Game } from './snl/Game';

const cols = 10;
const rows = 10;
const steps = {
  21: 43,
  28: 56,
  33: 16,
  45: 11,
  50: 82,
  53: 76,
  57: 8,
  63: 34,
  67: 96,
  75: 11,
  89: 59,
  99: 1
};

function App() {
  return (
    <div className="App">
      <Game numPlayers={4} cols={cols} rows={rows} steps={steps} />
    </div>
  );
}

export default App;
