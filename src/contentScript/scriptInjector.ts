import { onChangeOptions } from "../storage";
import {
  CHANGE_OPTIONS_MESSAGE_TYPE,
  PING_MESSAGE_TYPE,
  PONG_MESSAGE_TYPE,
  SCRIPT_ID
} from "../constants";

const injectScriptFile = function(file: string) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file);
  document.body.appendChild(script);
};

const injectOrReplaceScript = (scriptText: string) => {
  const oldScript = document.getElementById(SCRIPT_ID);
  if (oldScript) {
    document.body.removeChild(oldScript);
  }

  const script = document.createElement("script");
  script.setAttribute("id", SCRIPT_ID);
  script.setAttribute("type", "text/javascript");
  document.body.appendChild(script);

  script.textContent = scriptText;
};

injectScriptFile(chrome.extension.getURL("/contentScript.bundle.js"));

onChangeOptions(options => {
  injectOrReplaceScript(`
  (() => {
    const pinger = setInterval(() => {
      window.postMessage({
        type: "${PING_MESSAGE_TYPE}"
      });
    }, 300);

    window.addEventListener("message", event => {
      if (event.data && event.data.type === "${PONG_MESSAGE_TYPE}") {
        clearInterval(pinger);
        window.postMessage({
          type: "${CHANGE_OPTIONS_MESSAGE_TYPE}",
          options: ${JSON.stringify(options)}
        }, "*");
      }
    });
  })();
  `);
}, true);
