export type LoggingOption = {
  use: boolean;
  backgroundColor: string;
};
type LogType =
  | "trace"
  | "debug"
  | "log"
  | "info"
  | "warn"
  | "error"

export type Options = {
  [logType in LogType]: LoggingOption
};

export const initialValue: Options = {
  trace: {
    use: false,
    backgroundColor: "rgba(0,0,0,0)"
  },
  debug: {
    use: false,
    backgroundColor: "rgba(0,0,0,0)"
  },
  log: {
    use: true,
    backgroundColor: "rgba(0,0,0,0)"
  },
  info: {
    use: true,
    backgroundColor: "rgba(0,0,0,0)"
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
