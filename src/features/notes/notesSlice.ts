import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export const notesSlice = createSlice({
  name: "notes",
  initialState: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  reducers: {
    setInitialNotes: (state, action) => {
      return Object.assign({}, action.payload);
    },
    changeNote: (state, action) => {
      const stringIndex: keyof InitialState = action.payload.stringIndex;
      switch (action.payload.direction) {
        case "UP":
          return { ...state, [stringIndex]: state[stringIndex] + 1 };
        case "DOWN":
          return { ...state, [stringIndex]: state[stringIndex] - 1 };
        default:
          return state;
      }
    },
  },
});

export const { changeNote, setInitialNotes } = notesSlice.actions;
export default notesSlice.reducer;
