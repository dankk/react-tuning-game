import StringRow from "./components/StringRow";

function App() {
  const noteList = ["E", "A", "D", "G", "B", "e"];

  return (
    <div className="mt-32 flex justify-center">
      <div className="text-center flex flex-col space-y-2">
        {noteList.map((note, i) => (
          <StringRow key={i} note={note} />
        ))}
      </div>
    </div>
  );
}

export default App;
