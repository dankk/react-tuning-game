import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useNote from "../app/useNote";
import { noteList } from "../features/notes/notes";
import { changeNote } from "../features/notes/notesSlice";

function StringRows(props: { difficulty: number; toGuess: number[] }) {
  const { difficulty, toGuess } = props;
  const notes = useAppSelector((state) => state.notes);
  if (!notes) return <>...</>;

  return (
    <div className="text-center flex flex-col space-y-2">
      <h1 className="text-xl mb-4">Difficulty: {difficulty}</h1>
      {Object.entries(notes).map(([stringIndex, noteIndex]) =>
        toGuess.includes(parseInt(stringIndex)) ? (
          <GuessStringRow
            key={stringIndex}
            correctNoteIndex={noteIndex}
            noteIndex={noteIndex}
            stringIndex={stringIndex}
          />
        ) : (
          <StringRow
            key={stringIndex}
            noteIndex={noteIndex}
            stringIndex={stringIndex}
          />
        )
      )}
    </div>
  );
}

function GuessStringRow(props: GuessStringRowProps) {
  const { noteIndex, stringIndex } = props;

  const { playNote } = useNote(noteIndex);
  return (
    <div className="flex flex-row space-x-1 mx-auto">
      <ChangeNoteButton
        stringIndex={stringIndex}
        dir="DOWN"
        noteIndex={noteIndex}
      />
      <div
        className="w-80 border py-2 hover:bg-sky-100 rounded-md cursor-pointer"
        onClick={playNote}
      >
        ? {noteList[noteIndex].note}
      </div>
      <ChangeNoteButton
        stringIndex={stringIndex}
        dir="UP"
        noteIndex={noteIndex}
      />
    </div>
  );
}

type GuessStringRowProps = {
  correctNoteIndex: number;
  noteIndex: number;
  stringIndex: string;
};

function StringRow(props: StringRowProps) {
  const { noteIndex, stringIndex } = props;
  const { playNote } = useNote(noteIndex);

  return (
    <div className="flex flex-row space-x-1 mx-auto">
      <div
        className="w-80 border py-2 hover:bg-sky-100 rounded-md cursor-pointer"
        onClick={playNote}
      >
        {noteList[noteIndex].note}
      </div>
    </div>
  );
}

type StringRowProps = {
  noteIndex: number;
  stringIndex: string;
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
