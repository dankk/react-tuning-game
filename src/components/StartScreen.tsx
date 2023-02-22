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
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Default range
      </label>
      <input
        id="default-range"
        type="range"
        onChange={(event) => handleSliderChange(event.target.value)}
        value={sliderValue}
        min="1"
        max="6"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />

      <button
        className="hover:bg-sky-100 font-bold py-2 px-4 border rounded"
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
