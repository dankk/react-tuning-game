import { useAppDispatch, useAppSelector } from "./app/hooks";
import StartScreen from "./components/StartScreen";
import StringRow from "./components/StringRow";
import { tunings } from "./features/notes/notes";
import { setInitialNotes } from "./features/notes/notesSlice";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  const handleStart = () => {
    dispatch(setInitialNotes(tunings.standard));
  };

  return (
    <div className="mt-32 flex justify-center">
      {!notes ? (
        <StartScreen handleStart={handleStart} />
      ) : (
        <div className="text-center flex flex-col space-y-2">
          {Object.entries(notes).map(([k, v]) => (
            <StringRow key={k} noteIndex={v} stringIndex={k} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
