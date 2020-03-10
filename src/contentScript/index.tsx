import React from "react";
import { render } from "react-dom";
import { ConsoleWindow } from "./ConsoleWindow";
import EventEmitter from "events";

const consoleOverlayDiv = document.createElement("div");
document.body.appendChild(consoleOverlayDiv);

const ee = new EventEmitter();
console.trace = new Proxy(console.trace, {
  apply(_target, _thisArg, argArray) {
    ee.emit("console", "trace", argArray);
  }
});
console.info = new Proxy(console.info, {
  apply(_target, _thisArg, argArray) {
    ee.emit("console", "info", argArray);
  }
});
console.log = new Proxy(console.log, {
  apply(_target, _thisArg, argArray) {
    ee.emit("console", "log", argArray);
  }
});
console.debug = new Proxy(console.debug, {
  apply(_target, _thisArg, argArray) {
    ee.emit("console", "debug", argArray);
  }
});
console.warn = new Proxy(console.warn, {
  apply(_target, _thisArg, argArray) {
    ee.emit("console", "warn", argArray);
  }
});
console.error = new Proxy(console.error, {
  apply(_target, _thisArg, argArray) {
    ee.emit("console", "error", argArray);
  }
});

render(<ConsoleWindow logger={ee} />, consoleOverlayDiv);
