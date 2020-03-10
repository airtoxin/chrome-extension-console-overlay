import React, { useCallback, useEffect, useState } from "react";
import { EventEmitter } from "events";
import { chromeLight, ObjectInspector } from "react-inspector";

type Props = {
  logger: EventEmitter;
};

type LogMessage = {
  id: number;
  eventType: string;
  message: any[];
};

export const ConsoleWindow: React.FunctionComponent<Props> = ({ logger }) => {
  const [visibility, setVisibility] = useState<"initial" | "visible" | "invisible">("initial");
  const [logs, setLogs] = useState<LogMessage[]>([]);

  const consoleEventListener = useCallback(
    (eventType: string, message: any[]) => {
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
    },
    [logs]
  );

  useEffect(() => {
    logger.on("console", consoleEventListener);
    return () => void logger.off("log", consoleEventListener);
  }, [consoleEventListener, logger, logs]);

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
      {visibility === "visible" &&
        logs.map(log => (
          <ObjectInspector
            key={log.id}
            data={log.message}
            theme={{
              ...chromeLight,
              BASE_BACKGROUND_COLOR: "rgba(0, 0, 0, 0)"
            }}
          />
        ))}
      {visibility !== "initial" && (
        <button
          style={{ width: "100%" }}
          onClick={() => setVisibility(visibility === "visible" ? "invisible" : "visible")}
        >
          Toggle
        </button>
      )}
    </div>
  );
};
