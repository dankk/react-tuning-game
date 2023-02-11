import { useAppDispatch, useAppSelector } from "./app/hooks";
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
        <button
          className="hover:bg-sky-100 font-bold py-2 px-4 border rounded"
          onClick={handleStart}
        >
          Start
        </button>
      ) : (
        <div className="text-center flex flex-col space-y-2">
          {Object.entries(notes).map(([k, v]) => (
            <StringRow key={k} note={v} stringIndex={k} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
