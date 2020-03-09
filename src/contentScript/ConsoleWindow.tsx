import React, { useEffect, useState } from "react";
import { EventEmitter } from "events";
import JSONTree from 'react-json-tree'

type Props = {
  logger: EventEmitter
};

type LogMessage = {
  id: number;
  message: any[];
}

export const ConsoleWindow: React.FunctionComponent<Props> = ({ logger }) => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  useEffect(() => {
    logger.on("log", (messages: any[]) => {
      const logMessages = messages.map(message => ({
        id: Math.random(),
        message
      }));

      setLogs(logs.concat(logMessages));
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
      {logs.map(log => (
        <JSONTree key={log.id} data={log.message}/>
      ))}
    </div>
  );
};
