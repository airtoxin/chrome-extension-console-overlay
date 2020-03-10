import EventEmitter from "events";

export const proxyConsole = (): EventEmitter => {
  const ee = new EventEmitter();
  console.trace = new Proxy(console.trace, {
    apply(_target, _thisArg, argArray) {
      ee.emit("console", "trace", argArray);
    }
  });
  console.debug = new Proxy(console.debug, {
    apply(_target, _thisArg, argArray) {
      ee.emit("console", "debug", argArray);
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

  return ee;
};
