export type LoggingOption = {
  use: boolean;
  backgroundColor: string;
};
export type LogType = "trace" | "debug" | "log" | "info" | "warn" | "error";

export type Options = {
  [logType in LogType]: LoggingOption;
};

export const initialValue: Options = {
  trace: {
    use: false,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  debug: {
    use: false,
    backgroundColor: "rgba(0,127,255,0.1)"
  },
  log: {
    use: true,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  info: {
    use: true,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  warn: {
    use: true,
    backgroundColor: "rgba(255,255,0,0.3)"
  },
  error: {
    use: true,
    backgroundColor: "rgba(255,0,0,0.1)"
  }
};
