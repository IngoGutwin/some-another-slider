# Slider

## A flexible and lightweight **Vanilla TypeScript slider module** with **no external dependencies**.\ It supports **click navigation**, **touch events**, and **drag & drop** for modern slider implementations.

---

## 📂 Project Structure

    src/
     ├── core/
     │   ├── EventEmitterFactory.ts   # Generic event system
     │   ├── SliderCore.ts            # Core slider logic
     │   ├── SliderFactory.ts         # Entry point for creating a slider
     │   ├── SliderStateManager.ts    # State management & DOM references
     │
     ├── types/
     │   └── index.ts                 # Shared type definitions
     │
     └── index.ts                     # Export of SliderFactory

---

## ⚙️ Installation

```bash
npm install
```

or

```bash
yarn install
```

---

## 🚀 Usage

Create the HTML structure:

```html
<div id="container-id">
  <button id="previous-btn">Previous</button>
  <button id="next-btn">Next</button>
  <ul>
    <li><a href="#">Slide 1</a></li>
    <li><a href="#">Slide 2</a></li>
    <li><a href="#">Slide 3</a></li>
  </ul>
</div>
```

TypeScript/JavaScript:

```ts
import { SliderFactory } from "./src";

SliderFactory({
  containerId: "container-id",
  btnPreviousSlideId: "previous-btn",
  btnNextSlideId: "next-btn",
  translateDuration: 300,
});
```

---

## 🔧 Configuration

`SliderFactory` accepts a **config object**:

---

Key Type Default Description

---

`containerId` string `"container-id"` ID of the slider container

`btnPreviousSlideId` string `"previous-btn"` ID of the button for previous
slide

`btnNextSlideId` string `"next-btn"` ID of the button for next slide

`translateDuration` number `300` Animation duration in
milliseconds

---

---

## 📡 Events

The event system is based on a generic **Emitter**
(`EventEmitterFactory`).\
Available events:

- `click:btn-next-slide`
- `click:btn-prev-slide`
- `mousedown:slider-list`
- `touchstart:slider-list`
- `touchmove:slider-list`
- `touchend:slider-list`

Example:

```ts
const slider = SliderFactory(config);

slider.on("click:btn-next-slide", () => {
  console.log("Next button clicked");
});
```

---

## 🛠 Development

- **Linting:** `npm run lint`
- **Build:** `npm run build`
- **Format:** `npm run format`

---

## 📜 License

MIT License -- free to use, modify and distribute.
