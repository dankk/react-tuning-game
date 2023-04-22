import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import StartScreen from "./components/StartScreen";
import StringRows from "./components/StringRows";
import { noteList, tunings } from "./features/notes/notes";
import { setInitialNotes } from "./features/notes/notesSlice";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes?.selectedNotes);
  const difficulty = useAppSelector((state) => state.slider);
  const [toGuess, setToGuess] = useState<number[]>([]);

  const handleStart = () => {
    const toGuess: number[] = [];

    while (toGuess.length < difficulty) {
      const randomStringIndex = Math.floor(Math.random() * 6);
      if (!toGuess.includes(randomStringIndex)) {
        toGuess.push(randomStringIndex);
      }
    }

    const initialNotes = tunings.standard.map((noteIndex, i) => {
      if (toGuess.includes(i)) {
        let newNoteIndex = noteIndex + Math.floor(Math.random() * 11) - 5;
        newNoteIndex = Math.max(newNoteIndex, 0);
        newNoteIndex = Math.min(newNoteIndex, noteList.length - 1);
        return newNoteIndex;
      }
      return noteIndex;
    });

    setToGuess(toGuess);
    dispatch(
      setInitialNotes({
        selectedNotes: initialNotes,
        correctNotes: tunings.standard,
      })
    );
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
