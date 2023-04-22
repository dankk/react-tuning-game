import { createSlice } from "@reduxjs/toolkit";

interface NoteState {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

type InitialState = {
  selectedNotes: NoteState;
  correctNotes: NoteState;
} | null;

export const notesSlice = createSlice({
  name: "notes",
  initialState: null as InitialState,
  reducers: {
    setInitialNotes: (state, action) => {
      return Object.assign({}, action.payload);
    },
    changeNote: (state, action) => {
      if (!state) return state;
      const stringIndex: keyof NoteState = action.payload.stringIndex;
      switch (action.payload.direction) {
        case "UP":
          return {
            ...state,
            selectedNotes: {
              ...state.selectedNotes,
              [stringIndex]: state.selectedNotes[stringIndex] + 1,
            },
          };
        case "DOWN":
          return {
            ...state,
            selectedNotes: {
              ...state.selectedNotes,
              [stringIndex]: state.selectedNotes[stringIndex] - 1,
            },
          };
        default:
          return state;
      }
    },
  },
});

export const { changeNote, setInitialNotes } = notesSlice.actions;
export default notesSlice.reducer;
