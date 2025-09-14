import type { SliderConfig, SliderElements, SliderStateData, StateManager } from "../types/index";

export function SliderStateManager({
  containerId,
  btnPreviousSlideId,
  btnNextSlideId,
  translateDuration,
}: SliderConfig): StateManager {
  let container = document.querySelector<HTMLDivElement>(`#${containerId}`);

  if (!container) {
    throw new Error(`${containerId} is missing!`);
  }

  let btnPrevious = container.querySelector<HTMLButtonElement>(`#${btnPreviousSlideId}`);
  let btnNext = container.querySelector<HTMLButtonElement>(`#${btnNextSlideId}`);
  let list = container.querySelector<HTMLUListElement>("ul");

  if (!btnPrevious || !btnNext || !list) {
    throw new Error(`some of ${containerId} element is missing!`);
  }

  let slides = list.querySelectorAll<HTMLLIElement>("li");
  let anchorElements = list.querySelectorAll<HTMLAnchorElement>("a");

  let totalSlides = (slides: NodeListOf<HTMLLIElement>) => slides.length;
  let slideWidth = (slides: NodeListOf<HTMLLIElement>) => slides[0].offsetWidth;
  let maxOffSet = (slides: NodeListOf<HTMLLIElement>) =>
    -(totalSlides(slides) - 1) * slideWidth(slides);

  let calculateNextOffsetX = (currentOffsetX: number, slideWidth: number) =>
    currentOffsetX - slideWidth;
  let calculatePrevOffsetX = (currentOffsetX: number, slideWidth: number) =>
    currentOffsetX + slideWidth;

  let config: SliderConfig = { translateDuration, containerId };
  let data: SliderStateData = {
    prevOffsetX: calculatePrevOffsetX(0, slideWidth(slides)),
    currentOffsetX: 0,
    nextOffsetX: calculateNextOffsetX(0, slideWidth(slides)),
    dragStartX: 0,
    dragDeltaX: 0,
    isDragging: false,
    totalSlides: totalSlides(slides),
    slideWidth: slideWidth(slides),
    maxOffSet: maxOffSet(slides),
  };
  let dom: SliderElements = {
    container,
    btnNext,
    btnPrevious,
    list,
    slides,
    anchorElements,
  };

  let isNextSlide = (): boolean => {
    if (data.nextOffsetX === data.maxOffSet - data.slideWidth) {
      return false;
    }
    return true;
  };
  let isPrevSlide = (): boolean => {
    if (data.prevOffsetX >= data.slideWidth) {
      return false;
    }
    return true;
  };

  function calculateNextSlide(): void {
    if (data.dragDeltaX !== 0 && Math.abs(data.dragDeltaX) < data.slideWidth / 3) {
      data.currentOffsetX = data.nextOffsetX + data.slideWidth;
      return;
    }
    if (!isNextSlide()) {
      data.currentOffsetX = data.maxOffSet;
      return;
    }
    data.currentOffsetX = data.nextOffsetX;
    data.nextOffsetX = calculateNextOffsetX(data.currentOffsetX, data.slideWidth);
    data.prevOffsetX = calculatePrevOffsetX(data.currentOffsetX, data.slideWidth);
  }

  function calculatePreviousSlide(): void {
    if (data.dragDeltaX !== 0 && Math.abs(data.dragDeltaX) < data.slideWidth / 3) {
      data.currentOffsetX = data.nextOffsetX + data.slideWidth;
      return;
    }
    if (!isPrevSlide()) {
      data.currentOffsetX = data.prevOffsetX + data.nextOffsetX;
      return;
    }
    data.currentOffsetX = data.prevOffsetX;
    data.nextOffsetX = calculateNextOffsetX(data.currentOffsetX, data.slideWidth);
    data.prevOffsetX = calculatePrevOffsetX(data.currentOffsetX, data.slideWidth);
  }

  function updateCurrentOffsetX(): void {
    data.currentOffsetX = data.nextOffsetX + data.slideWidth + data.dragDeltaX;
  }

  function updateDragging(): void {
    data.isDragging = data.isDragging ? false : true;
  }

  function sliderIsDragging(): boolean {
    return data.isDragging;
  }

  function setDragStartX(clientX: number): void {
    data.dragStartX = clientX;
  }

  function calculateDragDeltaX(clientX: number): void {
    data.dragDeltaX = clientX - data.dragStartX;
  }

  function getDOMElements(): SliderElements {
    return dom;
  }

  function getSliderData(): SliderStateData {
    return data;
  }

  return {
    config,
    data,
    getSliderData,
    getDOMElements,
    calculateNextSlide,
    calculatePreviousSlide,
    updateCurrentOffsetX,
    setDragStartX,
    calculateDragDeltaX,
    updateDragging,
    sliderIsDragging,
  };
}
