import React, { useCallback, useEffect, useState } from "react";
import { EventEmitter } from "events";
import { chromeLight, ObjectInspector } from "react-inspector";

type Props = {
  logger: EventEmitter;
};

type LogMessage = {
  id: number;
  message: any[];
};

export const ConsoleWindow: React.FunctionComponent<Props> = ({ logger }) => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const logMessageListener = useCallback(
    (message: any[]) => {
      setLogs(
        logs.concat([
          {
            id: Math.random(),
            message
          }
        ])
      );
    },
    [logs]
  );
  useEffect(() => {
    logger.on("log", logMessageListener);

    return () => void logger.off("log", logMessageListener);
  }, [logMessageListener, logger, logs]);

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
      {logs.map(log => (
        <ObjectInspector
          key={log.id}
          data={log.message}
          theme={{
            ...chromeLight,
            BASE_BACKGROUND_COLOR: "rgba(0, 0, 0, 0)"
          }}
        />
      ))}
    </div>
  );
};
