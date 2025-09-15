import { Emitter, EmitterEvents, SliderConfig, SliderElements, StateManager } from "../types/index";
import { EventEmitterFactory } from "./EventEmitterFactory";
import { SliderStateManager } from "./SliderStateManager";
import { SliderCore } from "./SliderCore";

const defaultConfig: SliderConfig = {
  containerId: "container-id",
  btnPreviousSlideId: "previous-btn",
  btnNextSlideId: "next-btn",
  translateDuration: 300,
};

export function SliderFactory(config: SliderConfig): void {
  if (!config) {
    config = defaultConfig;
  }
  let stateManager: StateManager = SliderStateManager(config);
  let slider: SliderElements | null = stateManager.getDOMElements();
  let emitter: Emitter<EmitterEvents> = EventEmitterFactory<EmitterEvents>();

  if (slider) {
    SliderCore(slider, stateManager, emitter);
  }
}
