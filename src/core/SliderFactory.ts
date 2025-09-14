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

  function addDOMListeners(): void {
    if (slider) {
      slider.btnNext.addEventListener("click", () => emitter.emit("click:btn-next-slide"));
      slider.btnPrevious.addEventListener("click", () => emitter.emit("click:btn-prev-slide"));
      slider.list.addEventListener("mousedown", (e) => emitter.emit("mousedown:slider-list", e));
      slider.anchorElements.forEach((anchor: HTMLAnchorElement) => {
        anchor.addEventListener("click", (e) => {
          if (stateManager.sliderIsDragging()) {
            e.preventDefault();
            e.stopPropagation();
            stateManager.updateDragging();
          }
        });
      });
      slider.list.addEventListener("touchstart", (e) => emitter.emit("touchstart:slider-list", e));
      slider.list.addEventListener("touchmove", (e) => emitter.emit("touchmove:slider-list", e));
      slider.list.addEventListener("touchend", (e) => emitter.emit("touchend:slider-list", e));
    }
  }

  if (slider) {
    addDOMListeners();
    SliderCore(slider, stateManager, emitter);
  }
}
