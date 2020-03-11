import React, { useEffect, useMemo, useState } from "react";
import { EventEmitter } from "events";
import {
  chromeLight,
  Inspector,
  InspectorNodeRenderer,
  ObjectLabel,
  ObjectRootLabel
} from "react-inspector";
import {
  CHANGE_OPTIONS_MESSAGE_TYPE,
  DEFAULT_BACKGROUND_COLOR,
  PING_MESSAGE_TYPE,
  PONG_MESSAGE_TYPE
} from "../constants";
import { LogType, Options } from "../options";
import { Resizable } from "re-resizable";

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
    <Resizable
      maxWidth="95vw"
      style={{
        position: "fixed",
        zIndex: 99999,
        right: 0,
        bottom: 0,
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
        overflowY: "scroll",
        paddingLeft: "0.5rem",
        borderLeft: "3px double lightgray"
      }}
      enable={{
        left: true
      }}
    >
      {shouldShow && (
        <>
          {filteredLogs.map(log => (
            <Inspector
              key={log.id}
              data={log.message}
              table={(log.eventType === "table") as any}
              theme={{
                ...chromeLight,
                BASE_BACKGROUND_COLOR:
                  options[log.eventType]?.backgroundColor ??
                  DEFAULT_BACKGROUND_COLOR
              }}
              nodeRenderer={NodeRenderer}
            />
          ))}
          <div style={{ display: "flex" }}>
            <button
              style={{ flex: 1 }}
              onClick={() =>
                setVisibility(
                  visibility === "visible" ? "invisible" : "visible"
                )
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
      )}
    </Resizable>
  );
};

const NodeRenderer: InspectorNodeRenderer = ({
  depth,
  name,
  data,
  isNonenumerable
}) => {
  return depth === 0 && Array.isArray(data) ? (
    <span>
      {data.map((d, i) => (
        <span style={{ paddingRight: "0.5rem" }} key={i}>
          <ObjectRootLabel name={name} data={d} />
        </span>
      ))}
    </span>
  ) : (
    <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
  );
};
