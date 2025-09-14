import { Emitter } from "../types/index";

export function EventEmitterFactory<T extends Record<string, unknown[]>>(): Emitter<T> {
  let events: { [K in keyof T]?: ((...args: T[K]) => void)[] } = {};

  function on<K extends keyof T>(event: K, cb: (...args: T[K]) => void) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(cb);
  }

  function emit<K extends keyof T>(event: K, ...args: T[K]) {
    events[event]?.forEach((fn) => fn(...args));
  }

  return { on, emit };
}
