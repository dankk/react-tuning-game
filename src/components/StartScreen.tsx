import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSliderValue } from "../features/slider/sliderSlice";

function StartScreen(props: StartScreenProps) {
  const { handleStart } = props;

  const dispatch = useAppDispatch();
  const sliderValue = useAppSelector((state) => state.slider);

  const handleSliderChange = (value: string) => {
    dispatch(setSliderValue({ type: "SET_SLIDER_VALUE", value }));
  };

  return (
    <div className="flex flex-col justify-center space-y-4 w-full">
      <div className="text-center">
        <label htmlFor="default-range" className="">
          Difficulty: {sliderValue}
        </label>
      </div>
      <input
        id="default-range"
        type="range"
        onChange={(event) => handleSliderChange(event.target.value)}
        value={sliderValue}
        min="1"
        max="6"
        className="mx-auto w-48 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <button
        className="hover:bg-sky-100 font-bold py-2 border rounded w-32 mx-auto"
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}

type StartScreenProps = {
  handleStart: () => void;
};

export default StartScreen;
