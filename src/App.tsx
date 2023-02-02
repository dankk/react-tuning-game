import { useAppSelector } from "./app/hooks";
import StringRow from "./components/StringRow";

function App() {
  const notes = useAppSelector((state) => state.notes);

  return (
    <div className="mt-32 flex justify-center">
      <div className="text-center flex flex-col space-y-2">
        {Object.entries(notes).map(([k, v]) => (
          <StringRow key={k} note={v} stringIndex={k} />
        ))}
      </div>
    </div>
  );
}

export default App;
