import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useNote from "../app/useNote";
import { noteList } from "../features/notes/notes";
import { changeNote } from "../features/notes/notesSlice";

function StringRows(props: { difficulty: number }) {
  const { difficulty } = props;
  const notes = useAppSelector((state) => state.notes);
  const [stringsToGuess, setStringsToGuess] = useState<Number[]>();

  console.log(stringsToGuess);

  useEffect(() => {
    const toGuess = Array.from({ length: difficulty }).map((x, i, arr) => {
      let newIndex = Math.floor(Math.random() * 6);
      while (arr.includes(newIndex)) {
        newIndex = Math.floor(Math.random() * 6);
      }
      return newIndex;
    });
    setStringsToGuess(toGuess);
  }, [difficulty]);

  if (!notes || !stringsToGuess) return <>...</>;
  return (
    <div className="text-center flex flex-col space-y-2">
      <h1 className="text-xl mb-4">Difficulty: {difficulty}</h1>
      {Object.entries(notes).map(([stringIndex, noteIndex]) => (
        <StringRow
          key={stringIndex}
          noteIndex={noteIndex}
          stringIndex={stringIndex}
          toGuess={stringsToGuess.includes(parseInt(stringIndex))}
        />
      ))}
    </div>
  );
}

function StringRow(props: StringRowProps) {
  const { noteIndex, stringIndex, toGuess } = props;
  console.log(stringIndex, toGuess);
  const { playNote } = useNote(noteIndex);

  return (
    <div className="flex flex-row space-x-1 mx-auto">
      {toGuess && (
        <ChangeNoteButton
          stringIndex={stringIndex}
          dir="DOWN"
          noteIndex={noteIndex}
        />
      )}
      <div
        className="w-80 border py-2 hover:bg-sky-100 rounded-md cursor-pointer"
        onClick={playNote}
      >
        {noteList[noteIndex].note}
      </div>
      {toGuess && (
        <ChangeNoteButton
          stringIndex={stringIndex}
          dir="UP"
          noteIndex={noteIndex}
        />
      )}
    </div>
  );
}

type StringRowProps = {
  noteIndex: number;
  stringIndex: string;
  toGuess: boolean;
};

function ChangeNoteButton(props: ChangeNoteButtonProps) {
  const { stringIndex, dir, noteIndex } = props;
  const dispatch = useAppDispatch();

  const { playNote } = useNote(noteIndex + (dir == "UP" ? 1 : -1));

  const isDisabled =
    (dir == "DOWN" && noteIndex == 0) ||
    (dir == "UP" && noteIndex == noteList.length - 1);

  const disabledStyle = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:bg-sky-100";

  const handleClick = () => {
    if (isDisabled) return;
    playNote();
    dispatch(changeNote({ direction: dir, stringIndex }));
  };

  return (
    <button
      className={`w-16 flex flex-col justify-center items-center border rounded cursor-pointer ${disabledStyle}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <span>{dir == "UP" ? "->" : "<-"}</span>
    </button>
  );
}

type ChangeNoteButtonProps = {
  dir: "UP" | "DOWN";
  stringIndex: string;
  noteIndex: number;
};

export default StringRows;
