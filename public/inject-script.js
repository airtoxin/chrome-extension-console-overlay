const injectScript = function(file) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  document.body.appendChild(script);
};

// eslint-disable-next-line no-undef
injectScript(chrome.extension.getURL('/contentScript.bundle.js'));
