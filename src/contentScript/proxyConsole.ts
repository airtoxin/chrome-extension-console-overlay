import EventEmitter from "events";

export const proxyConsole = (): EventEmitter => {
  const ee = new EventEmitter();
  console.trace = new Proxy(console.trace, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "trace", argArray);
      target(...argArray);
    }
  });
  console.debug = new Proxy(console.debug, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "debug", argArray);
      target(...argArray);
    }
  });
  console.info = new Proxy(console.info, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "info", argArray);
      target(...argArray);
    }
  });
  console.log = new Proxy(console.log, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "log", argArray);
      target(...argArray);
    }
  });
  console.warn = new Proxy(console.warn, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "warn", argArray);
      target(...argArray);
    }
  });
  console.error = new Proxy(console.error, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "error", argArray);
      target(...argArray);
    }
  });
  console.table = new Proxy(console.table, {
    apply(target, _thisArg, argArray) {
      ee.emit("console", "table", argArray);
      target(...argArray);
    }
  });

  return ee;
};
