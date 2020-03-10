import React from "react";
import { render } from "react-dom";
import { ConsoleWindow } from "./ConsoleWindow";
import EventEmitter from "events";

const consoleOverlayDiv = document.createElement("div");
document.body.appendChild(consoleOverlayDiv);

const ee = new EventEmitter();
window.console.table = (...messages: any[]) => {
  ee.emit("log", messages);
  console.log("@messages", messages);
};

render(<ConsoleWindow logger={ee} />, consoleOverlayDiv);
