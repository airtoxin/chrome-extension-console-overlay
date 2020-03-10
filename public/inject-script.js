const injectScriptFile = function(file) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  document.body.appendChild(script);
};
const injectScript = function(scriptText) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.innerText = scriptText;
  document.body.appendChild(script);
};

// eslint-disable-next-line no-undef
injectScriptFile(chrome.extension.getURL('/contentScript.bundle.js'));
// eslint-disable-next-line no-undef
chrome.storage.sync.get(values => {
  injectScript(`
  setTimeout(() => {
    window.postMessage({
      type: "chrome-extension-console-overlay:changeOptions",
      options: ${JSON.stringify(values.options)}
    }, "*");
  }, 500);
  `);
});
// eslint-disable-next-line no-undef
chrome.storage.onChanged.addListener(changes => {
  injectScript(`
  window.postMessage({
    type: "chrome-extension-console-overlay:changeOptions",
    options: ${JSON.stringify(changes.options.newValue)}
  }, "*");
  `);
});
