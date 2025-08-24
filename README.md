# Some Another Slider

## A modern, lightweight, and fully customizable slider component built with TypeScript. Supports multiple content types (products, galleries) with touch gestures and smooth animations.

## Features

- Zero Dependencies - Pure TypeScript/JavaScript
- Touch & Mouse Support - Swipe gestures and button navigation
- Multiple Themes - Product slider, gallery, custom renderers
- High Performance - Optimized animations with requestAnimationFrame
- Accessible - Keyboard navigation and screen reader support
- TypeScript Ready - Full type definitions included
- Highly Configurable - Extensive configuration options

## Architecture

This slider is built with a modular architecture using proven design patterns:

Factory Pattern for creating different slider types
Strategy Pattern for customizable slide renderers
Observer Pattern for event-driven communication
State Pattern for managing slider states

See the complete **[system architecture and component relationships](docs/architecture.md)**

## Event Flow

Understand how touch and click events are processed:
**[Event Flow Sequences](docs/sequenceDiagram.md)**

## Project Structure

src/
├── core/
│ ├── SliderCore.ts # Main orchestrator
│ └── StateManager.ts # State management
├── handlers/
│ ├── InputManager.ts # Event coordination
│ ├── TouchHandler.ts # Touch gestures
│ └── ClickHandler.ts # Button clicks
├── renderers/
│ ├── SlideRenderer.ts # Base renderer
│ ├── ProductRenderer.ts # Product slides
│ └── GalleryRenderer.ts # Gallery slides
├── utils/
│ ├── AnimationEngine.ts # Smooth animations
│ ├── DOMManager.ts # DOM utilities
│ └── EventEmitter.ts # Event system
└── index.ts # Public API
