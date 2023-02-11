import { useAppDispatch } from "../app/hooks";
import { noteList } from "../features/notes/notes";
import { changeNote } from "../features/notes/notesSlice";

function StringRow(props: StringRowProps) {
  const { noteIndex, stringIndex } = props;

  return (
    <div className="flex flex-row space-x-1">
      <ChangeNoteButton stringIndex={stringIndex} dir="DOWN" />
      <div className="w-96 border py-2 hover:bg-sky-100 rounded-md cursor-pointer">
        {noteList[noteIndex].note}
      </div>
      <ChangeNoteButton stringIndex={stringIndex} dir="UP" />
    </div>
  );
}

type StringRowProps = {
  noteIndex: number;
  stringIndex: string;
};

function ChangeNoteButton(props: ChangeNoteButtonProps) {
  const { stringIndex, dir } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeNote({ direction: dir, stringIndex }));
  };

  return (
    <div
      className="w-16 hover:bg-sky-100 flex flex-col justify-center items-center border rounded cursor-pointer"
      onClick={handleClick}
    >
      <span>{dir == "UP" ? "->" : "<-"}</span>
    </div>
  );
}

type ChangeNoteButtonProps = {
  dir: "UP" | "DOWN";
  stringIndex: string;
};

export default StringRow;
