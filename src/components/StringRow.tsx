function StringRow(props: StringRowProps) {
  const { note } = props;

  return (
    <div className="flex flex-row space-x-1">
      <ChangeNoteButton dir="DOWN" />
      <div className="w-96 border py-2 hover:bg-sky-100 rounded-md">{note}</div>
      <ChangeNoteButton dir="UP" />
    </div>
  );
}

type StringRowProps = {
  note: string;
};

function ChangeNoteButton(props: ChangeNoteButtonProps) {
  const { dir } = props;

  const handleClick = () => {
    console.log("pressed", dir);
  };

  return (
    <div
      className="w-16 hover:bg-sky-100 flex flex-col justify-center items-center border rounded"
      onClick={handleClick}
    >
      <span>{dir == "UP" ? "->" : "<-"}</span>
    </div>
  );
}

type ChangeNoteButtonProps = {
  dir: "UP" | "DOWN";
};

export default StringRow;
