import React from "react";
import { render } from "react-dom";
import { ConsoleWindow } from "./ConsoleWindow";
import EventEmitter from "events";

const consoleOverlayDiv = document.createElement("div");
document.body.appendChild(consoleOverlayDiv);

const ee = new EventEmitter();
console.log = new Proxy(console.log, {
  apply(target, thisArg, argArray) {
    ee.emit("log", argArray);
  }
});

render(<ConsoleWindow logger={ee} />, consoleOverlayDiv);
