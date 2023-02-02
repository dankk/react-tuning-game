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
  initialState: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 },
  reducers: {
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

export const { changeNote } = notesSlice.actions;
export default notesSlice.reducer;
