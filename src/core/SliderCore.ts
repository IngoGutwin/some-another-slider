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
    let deltaX: number = sliderData.dragDeltaX;
    if (deltaX > 0) {
      goToPrevSlide();
    } else {
      goToNextSlide();
    }
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
  }

  function onDragMove(e: Event): void {
    let clientX = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
    }
    stateManager.calculateDragDeltaX(clientX);
    stateManager.updateCurrentOffsetX();
    if (!sliderData.isDragging) {
      stateManager.updateDragging();
    }
    render(false);
  }

  function onDragStart(e: Event): void {
    let clientX = 0;
    if (e instanceof MouseEvent) {
      e.preventDefault();
      clientX = e.clientX;
    } else if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
    }
    stateManager.setDragStartX(clientX);
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
  }

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
      slider.list.addEventListener("touchstart", (e) => emitter.emit("touchstart:slider-list", e), {
        passive: true,
      });
      slider.list.addEventListener("touchmove", (e) => emitter.emit("touchmove:slider-list", e), {
        passive: true,
      });
      slider.list.addEventListener("touchend", (e) => emitter.emit("touchend:slider-list", e));
    }
  }

  addDOMListeners();

  emitter.on("click:btn-next-slide", goToNextSlide);
  emitter.on("click:btn-prev-slide", goToPrevSlide);
  emitter.on("mousedown:slider-list", onDragStart);
  emitter.on("touchstart:slider-list", onDragStart);
  emitter.on("touchmove:slider-list", onDragMove);
  emitter.on("touchend:slider-list", onDragEnd);
}
