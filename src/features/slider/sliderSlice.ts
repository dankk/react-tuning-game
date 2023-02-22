import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: 1,
  reducers: {
    setSliderValue: (state, action) => {
      switch (action.payload.type) {
        case "SET_SLIDER_VALUE":
          return action.payload.value;
        default:
          return state;
      }
    },
  },
});

export const { setSliderValue } = sliderSlice.actions;
export default sliderSlice.reducer;
