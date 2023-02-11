import { useAppDispatch } from "../app/hooks";
import { noteList } from "../features/notes/notes";
import { changeNote } from "../features/notes/notesSlice";

function StringRow(props: StringRowProps) {
  const { noteIndex, stringIndex } = props;

  return (
    <div className="flex flex-row space-x-1">
      <ChangeNoteButton
        stringIndex={stringIndex}
        dir="DOWN"
        noteIndex={noteIndex}
      />
      <div className="w-96 border py-2 hover:bg-sky-100 rounded-md cursor-pointer">
        {noteList[noteIndex].note}
      </div>
      <ChangeNoteButton
        stringIndex={stringIndex}
        dir="UP"
        noteIndex={noteIndex}
      />
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

  const isDisabled =
    (dir == "DOWN" && noteIndex == 0) ||
    (dir == "UP" && noteIndex == noteList.length - 1);

  const disabledStyle = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:bg-sky-100";

  const handleClick = () => {
    if (isDisabled) return;
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

export default StringRow;
