import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import StartScreen from "./components/StartScreen";
import StringRows from "./components/StringRows";
import { tunings } from "./features/notes/notes";
import { setInitialNotes } from "./features/notes/notesSlice";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);
  const difficulty = useAppSelector((state) => state.slider);
  const [toGuess, setToGuess] = useState<number[]>([]);

  const handleStart = () => {
    const toGuess = Array.from({ length: difficulty }).map((x, i, arr) => {
      let newIndex = Math.floor(Math.random() * 6);
      while (arr.includes(newIndex)) {
        newIndex = Math.floor(Math.random() * 6);
      }
      return newIndex;
    });

    const initialNotes = tunings.standard.map((noteIndex, i) => {
      if (toGuess.includes(i)) {
        return noteIndex + Math.floor(Math.random() * 11) - 5;
      }
      return noteIndex;
    });

    setToGuess(toGuess);
    dispatch(setInitialNotes(initialNotes));
  };

  return (
    <div className="mt-32 flex justify-center">
      {!notes ? (
        <StartScreen handleStart={handleStart} />
      ) : (
        <StringRows difficulty={difficulty} toGuess={toGuess} />
      )}
    </div>
  );
}

export default App;
