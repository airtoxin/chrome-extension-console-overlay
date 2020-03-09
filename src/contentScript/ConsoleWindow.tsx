import React, { useEffect, useState } from "react";
import { EventEmitter } from "events";

type Props = {
  logger: EventEmitter
};

export const ConsoleWindow: React.FunctionComponent<Props> = ({ logger }) => {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    logger.on("log", (messages: Object[]) => {
      setLogs(logs.concat(messages.map(m => m.toString())));
    });
  }, [logger, logs]);

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
    >
      console log
      {logs.map(log => <p>{log}</p>)}
    </div>
  );
};
