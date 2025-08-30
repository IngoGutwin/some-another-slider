import type { SliderConfig, SliderInstance } from "../types/index";
import { SliderCore } from "./SliderCore";
import { SliderState } from "./SliderState";

export function SliderFactory(sliderConfig: SliderConfig): SliderInstance {
  function createSlider(): void {
    let state = SliderState(sliderConfig).createState();
    SliderCore(state);
  }

  return {
    createSlider,
  };
}
