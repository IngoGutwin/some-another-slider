import type { SliderConfig, SliderElements, SliderStateData } from "../types/index";

export function SliderState({ containerId, btnPreviousSlideId, btnNextSlideId }: SliderConfig) {
  function createState(): SliderStateData {
    let container = document.querySelector<HTMLDivElement>(`#${containerId}`);

    if (!container) {
      throw new Error(`${containerId} is missing!`);
    }

    let btnPrevious = container?.querySelector<HTMLButtonElement>(`#${btnPreviousSlideId}`);
    let btnNext = container?.querySelector<HTMLButtonElement>(`#${btnNextSlideId}`);
    let list = container?.querySelector<HTMLUListElement>("ul");
    let items = list?.querySelectorAll<HTMLLIElement>("li");

    if (!btnPrevious || !btnNext || !list || !items) {
      throw new Error(`some of ${containerId} element is missing!`);
    }

    let state: SliderStateData = {
      totalSlides: items.length,
      slideWidth: items[0].offsetWidth,
      maxOffSet: -(items.length - 1) * items[0].offsetWidth,
      currentOffsetX: 0,
      touchDeltaX: 0,
      touchStartX: 0,
      containerId,
    };
    let dom: SliderElements = {
      container,
      btnNext,
      btnPrevious,
      items,
    };

    return { ...state, ...dom };
  }
  return {
    createState,
  };
}
