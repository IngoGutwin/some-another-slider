export interface SliderConfig {
  containerId?: string;
  btnPreviousSlideId?: string;
  btnNextSlideId?: string;
  translateDuration: number;
}

export interface SliderStateData {
  prevOffsetX: number;
  currentOffsetX: number;
  nextOffsetX: number;
  dragStartX: number;
  dragDeltaX: number;
  isDragging: boolean;
  totalSlides: number;
  slideWidth: number;
  maxOffSet: number;
}

export interface SliderElements {
  container: HTMLDivElement;
  btnPrevious: HTMLButtonElement;
  btnNext: HTMLButtonElement;
  list: HTMLUListElement;
  slides: NodeListOf<HTMLLIElement>;
  anchorElements: NodeListOf<HTMLAnchorElement>;
}

export interface Slider {
  init(): void;
}

export interface SliderState {
  config: SliderConfig;
  dom: SliderElements;
  readonly data: SliderStateData;
}

export interface StateManager {
  config: SliderConfig;
  data: SliderStateData;
  getSliderData(): SliderStateData;
  getDOMElements(): SliderElements;
  calculateNextSlide(): void;
  calculatePreviousSlide(): void;
  updateCurrentOffsetX(): void;
  setDragStartX(clientX: number): void;
  calculateDragDeltaX(clientX: number): void;
  updateDragging(): void;
  sliderIsDragging(): boolean;
}

type EventMap = Record<string, unknown[]>;

export type Emitter<T extends EventMap> = {
  on: <K extends keyof T>(event: K, cb: (...args: T[K]) => void) => void;
  emit: <K extends keyof T>(event: K, ...args: T[K]) => void;
};

export interface EmitterEvents {
  [key: string]: unknown[];
  "click:btn-next-slide": [];
  "click:btn-prev-slide": [];
  "mousedown:slider-list": [MouseEvent];
  "mouseup:slider-list": [MouseEvent];
  "touchstart:slider-list": [TouchEvent];
  "touchmove:slider-list": [TouchEvent];
  "touchend:slider-list": [TouchEvent];
}
