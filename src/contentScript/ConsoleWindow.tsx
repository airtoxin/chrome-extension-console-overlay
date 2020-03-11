import React, { useEffect, useMemo, useState } from "react";
import { EventEmitter } from "events";
import { chromeLight, ObjectInspector } from "react-inspector";
import {
  CHANGE_OPTIONS_MESSAGE_TYPE,
  PING_MESSAGE_TYPE,
  PONG_MESSAGE_TYPE
} from "../constants";
import { LogType, Options } from "../options";

type Props = {
  logger: EventEmitter;
};

type LogMessage = {
  id: number;
  eventType: LogType;
  message: any[];
};

export const ConsoleWindow: React.FunctionComponent<Props> = ({ logger }) => {
  const [visibility, setVisibility] = useState<
    "initial" | "visible" | "invisible"
  >("initial");
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [options, setOptions] = useState<Options | null>(null);
  const [isReady, setIsReady] = useState(false);
  const filteredLogs = useMemo(
    () =>
      options == null ? [] : logs.filter(log => options[log.eventType].use),
    [logs, options]
  );
  const shouldShow = useMemo(
    () => visibility === "visible" && filteredLogs.length > 0,
    [filteredLogs.length, visibility]
  );

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.type === PING_MESSAGE_TYPE) {
        window.postMessage({ type: PONG_MESSAGE_TYPE }, "*");
        setIsReady(true);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  useEffect(() => {
    const listener = (eventType: LogType, message: any[]) => {
      setLogs(
        logs.concat([
          {
            id: Math.random(),
            eventType,
            message
          }
        ])
      );
      setVisibility("visible");
    };

    logger.on("console", listener);
    return () => void logger.off("console", listener);
  }, [logger, logs]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (
        event.data?.type === CHANGE_OPTIONS_MESSAGE_TYPE &&
        event.data.options
      ) {
        setOptions(event.data.options);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  if (options == null || !isReady) return null;
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 99999,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
        maxHeight: "100vh",
        overflowY: "scroll"
      }}
    >
      {
        shouldShow && (
          <>
            {filteredLogs.map(log => (
              <ObjectInspector
                key={log.id}
                data={log.message}
                theme={{
                  ...chromeLight,
                  BASE_BACKGROUND_COLOR:
                    options[log.eventType]?.backgroundColor ?? "rgba(0, 0, 0, 0)"
                }}
              />
            ))}
            <div style={{ display: "flex" }}>
              <button
                style={{ flex: 1 }}
                onClick={() =>
                  setVisibility(visibility === "visible" ? "invisible" : "visible")
                }
              >
                Toggle
              </button>
              <button
                style={{ flex: 1 }}
                onClick={() => {
                  setLogs([]);
                  setVisibility("initial");
                }}
              >
                Clear
              </button>
            </div>
          </>
        )
      }
    </div>
  );
};
