export interface SliderConfig {
  containerId: string;
  btnPreviousSlideId?: string;
  btnNextSlideId?: string;
}

export interface SliderStateData extends SliderConfig {
  totalSlides: number;
  slideWidth: number;
  maxOffSet: number;
  currentOffsetX: number;
  touchStartX: number;
  touchDeltaX: number;
}

export interface SliderElements {
  container: HTMLDivElement;
  btnPrevious: HTMLButtonElement;
  btnNext: HTMLButtonElement;
  items: NodeListOf<HTMLLIElement>;
}

export interface SliderStateManager {
  createState(config: SliderConfig): void;
}

export interface SliderInstance {
  createSlider(): void;
}
