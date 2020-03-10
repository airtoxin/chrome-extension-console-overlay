import React from "react";
import { render } from "react-dom";
import { ConsoleWindow } from "./ConsoleWindow";
import EventEmitter from "events";

const consoleOverlayDiv = document.createElement("div");
document.body.appendChild(consoleOverlayDiv);

const ee = new EventEmitter();
const original = window.console.log.bind(window.console.log);
window.console.log = (...messages: any[]) => {
  ee.emit("log", messages);
  original(...messages);
};

render(<ConsoleWindow logger={ee} />, consoleOverlayDiv);
