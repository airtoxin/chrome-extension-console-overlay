import { onChangeOptions } from "./actionIconPage/storageUtils";

const injectScriptFile = function(file: string) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file);
  document.body.appendChild(script);
};
const scriptLoader = function(scriptText: string) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.innerText = scriptText;
  document.body.appendChild(script);
};

injectScriptFile(chrome.extension.getURL("/contentScript.bundle.js"));

onChangeOptions(options => {
  scriptLoader(`
  window.postMessage({
    type: "chrome-extension-console-overlay:changeOptions",
    options: ${JSON.stringify(options)}
  }, "*");
  `);
}, true);
