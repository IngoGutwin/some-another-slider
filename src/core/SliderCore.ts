import {
  Emitter,
  EmitterEvents,
  SliderElements,
  SliderStateData,
  StateManager,
} from "../types/index";

export function SliderCore(
  slider: SliderElements,
  stateManager: StateManager,
  emitter: Emitter<EmitterEvents>
): void {
  let sliderData: SliderStateData = stateManager.getSliderData();

  function render(animate: boolean = true): void {
    if (slider) {
      slider.list.style.transform = `translate3d(${sliderData.currentOffsetX}px, 0px, 0px)`;
      if (animate) {
        slider.list.style.transitionDuration = `${stateManager.config.translateDuration}ms`;
      } else {
        slider.list.style.transitionDuration = "0ms";
      }
    }
  }

  function goToNextSlide(): void {
    stateManager.calculateNextSlide();
    render(true);
  }

  function goToPrevSlide(): void {
    stateManager.calculatePreviousSlide();
    render(true);
  }

  function onDragEnd(e: Event): void {
    e.preventDefault();
    let deltaX: number | null = sliderData.dragDeltaX;
    if (!deltaX) {
      return;
    }
    if (deltaX > 0) {
      goToPrevSlide();
    } else {
      goToNextSlide();
    }
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
  }

  function getClientXofEvent(e: Event): number {
    let result = 0;
    if (e instanceof MouseEvent) {
      result = e.clientX;
    } else if (e instanceof TouchEvent) {
      result = e.touches[0].clientX;
    }
    return result;
  }

  function onDragMove(e: Event): void {
    let clientX = getClientXofEvent(e);
    stateManager.calculateDragDeltaX(clientX);
    stateManager.updateCurrentOffsetX();
    if (!sliderData.isDragging) {
      stateManager.updateDragging();
    }
    render(false);
  }

  function onDragStart(e: Event): void {
    e.preventDefault();
    let clientX = getClientXofEvent(e);
    stateManager.setDragStartX(clientX);
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
  }

  emitter.on("click:btn-next-slide", goToNextSlide);
  emitter.on("click:btn-prev-slide", goToPrevSlide);
  emitter.on("mousedown:slider-list", onDragStart);
  emitter.on("touchstart:slider-list", onDragStart);
  emitter.on("touchmove:slider-list", onDragMove);
  emitter.on("touchend:slider-list", onDragEnd);
}
