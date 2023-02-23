import { noteList } from "../features/notes/notes";
import { playSound } from "../utils/sound";

const useNote = (noteIndex: number) => {
  const noteName = `${noteList[noteIndex]?.note}${noteList[noteIndex]?.octave}`;

  const playNote = () => {
    if (!noteName) return;
    playSound(noteName);
  };

  return { noteName, playNote };
};

export default useNote;
