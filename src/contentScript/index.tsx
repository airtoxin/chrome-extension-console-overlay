import React from "react";
import { render } from "react-dom";
import { ConsoleWindow } from "./ConsoleWindow";

const consoleOverlayDiv = document.createElement("div");
document.body.appendChild(consoleOverlayDiv);

render(<ConsoleWindow />, consoleOverlayDiv);
