import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useNote from "../app/useNote";
import { noteList, tunings } from "../features/notes/notes";
import { changeNote, setInitialNotes } from "../features/notes/notesSlice";

function StringRows(props: StringRowsProps) {
  const { round, setRound, score, setScore } = props;
  const [toGuess, setToGuess] = useState<number[]>([]);
  const difficulty = useAppSelector((state) => state.slider);
  const dispatch = useAppDispatch();

  const handleSetNotes = useCallback(() => {
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
  }, [round]);

  useEffect(() => {
    handleSetNotes();
  }, [round]);

  const notes = useAppSelector((state) => state.notes?.selectedNotes);
  if (!notes) return <>...</>;

  return (
    <div className="text-center flex flex-col space-y-2">
      <span className="text-xl">Difficulty: {difficulty}</span>
      <span className="text-xl">Round: {round}</span>
      <span className="text-xl">Score: {score}</span>
      {Object.entries(notes).map(([stringIndex, noteIndex]) =>
        toGuess.includes(parseInt(stringIndex)) ? (
          <GuessStringRow
            key={stringIndex}
            correctNoteIndex={tunings.standard[parseInt(stringIndex)]}
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
      <SubmitButton setRound={setRound} setScore={setScore} />
    </div>
  );
}

type StringRowsProps = {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

function SubmitButton(props: {
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setRound, setScore } = props;
  const notes = useAppSelector((state) => state.notes);

  const handleSubmit = () => {
    if (!notes) return;
    const selectedNotesArray = Object.values(notes.selectedNotes);
    const correctNotesArray = Object.values(notes.correctNotes);
    const isCorrect = selectedNotesArray.every(
      (val, i) => val === correctNotesArray[i]
    );
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setRound((r: number) => r + 1);
  };

  return (
    <div className="justify-center">
      <button
        className="w-36 border py-2 hover:bg-sky-100 rounded-md cursor-pointer mt-6"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

function GuessStringRow(props: GuessStringRowProps) {
  const { noteIndex, stringIndex, correctNoteIndex } = props;

  const { playNote } = useNote(noteIndex);
  return (
    <div className="flex relative">
      <div className="flex justify-center space-x-1">
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
      <HintButton noteIndex={correctNoteIndex} />
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

function HintButton(props: { noteIndex: number }) {
  const { noteIndex } = props;
  const { playNote } = useNote(noteIndex);
  return (
    <div className="absolute right-[-80px]">
      <button
        className="w-16 border rounded cursor-pointer py-2 hover:bg-sky-100"
        onClick={() => playNote()}
      >
        Hint
      </button>
    </div>
  );
}

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
