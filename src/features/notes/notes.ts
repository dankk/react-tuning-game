const toneList = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const octList = [2, 3, 4, 5];

export const noteList = octList.reduce((notes: any, oct) => {
  return [...notes, ...toneList.map((n) => ({ note: n, octave: oct }))];
}, []);

export const tunings = {
  standard: [28, 23, 19, 14, 9, 4],
};
