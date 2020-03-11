import { DEFAULT_BACKGROUND_COLOR } from "./constants";

export type LoggingOption = {
  use: boolean;
  backgroundColor: string;
};
export type LogType =
  | "trace"
  | "debug"
  | "log"
  | "info"
  | "warn"
  | "error"
  | "table";

export type Options = {
  [logType in LogType]: LoggingOption;
};

export const initialValue: Options = {
  trace: {
    use: false,
    backgroundColor: DEFAULT_BACKGROUND_COLOR
  },
  debug: {
    use: false,
    backgroundColor: "rgba(0,127,255,0.1)"
  },
  log: {
    use: true,
    backgroundColor: DEFAULT_BACKGROUND_COLOR
  },
  info: {
    use: true,
    backgroundColor: DEFAULT_BACKGROUND_COLOR
  },
  warn: {
    use: true,
    backgroundColor: "rgba(255,255,0,0.3)"
  },
  error: {
    use: true,
    backgroundColor: "rgba(255,0,0,0.1)"
  },
  table: {
    use: true,
    backgroundColor: DEFAULT_BACKGROUND_COLOR
  }
};
