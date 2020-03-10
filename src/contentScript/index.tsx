import React from "react";
import { render } from "react-dom";
import { ConsoleWindow } from "./ConsoleWindow";
import { proxyConsole } from "./proxyConsole";

const consoleOverlayDiv = document.createElement("div");
document.body.appendChild(consoleOverlayDiv);

const ee = proxyConsole();

render(<ConsoleWindow logger={ee} />, consoleOverlayDiv);
