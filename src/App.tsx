import { useAppDispatch, useAppSelector } from "./app/hooks";
import StartScreen from "./components/StartScreen";
import StringRows from "./components/StringRows";
import { tunings } from "./features/notes/notes";
import { setInitialNotes } from "./features/notes/notesSlice";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);
  const difficulty = useAppSelector((state) => state.slider);

  const handleStart = () => {
    dispatch(setInitialNotes(tunings.standard));
  };

  return (
    <div className="mt-32 flex justify-center">
      {!notes ? (
        <StartScreen handleStart={handleStart} />
      ) : (
        <StringRows difficulty={difficulty} />
      )}
    </div>
  );
}

export default App;
