import { useState } from "react";
import StartScreen from "./components/StartScreen";
import StringRows from "./components/StringRows";

function App() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const handleStart = () => setStarted(true);

  return (
    <div className="mt-32 flex justify-center">
      {!started ? (
        <StartScreen handleStart={handleStart} />
      ) : (
        <StringRows
          round={round}
          setRound={setRound}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
}

export default App;
