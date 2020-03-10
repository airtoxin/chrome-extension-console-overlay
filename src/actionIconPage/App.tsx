import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import update from "immutability-helper";
import { initialValue } from "../options";
import { loadOptions, saveOptions } from "./storageUtils";

const LoggingOption: React.FunctionComponent<{
  logType: string;
  use: boolean;
  onChangeUse: (nextUse: boolean) => void;
  backgroundColor: string;
  onChangeBackgroundColor: (nextBackgroundColor: string) => void;
}> = ({
  logType,
  use,
  onChangeUse,
  backgroundColor,
  onChangeBackgroundColor
}) => {
  return (
    <tr>
      <td>console.{logType}</td>
      <td>
        <input
          type="checkbox"
          checked={use}
          onChange={event => onChangeUse(event.currentTarget.checked)}
        />
      </td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: backgroundColor
            }}
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={event =>
              onChangeBackgroundColor(event.currentTarget.value)
            }
          />
        </div>
      </td>
    </tr>
  );
};

function App() {
  const [options, setOptionsRaw] = useState(initialValue);
  const setOptions = useCallback((newOptions: typeof options) => {
    setOptionsRaw(newOptions);
    saveOptions(newOptions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadOptions().then(setOptionsRaw);
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th />
            <th>use</th>
            <th>background</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(options).map(
            ([logType, { use, backgroundColor }]) => (
              <LoggingOption
                key={logType}
                logType={logType}
                use={use}
                onChangeUse={nextUse =>
                  setOptions(
                    update(options, { [logType]: { use: { $set: nextUse } } })
                  )
                }
                backgroundColor={backgroundColor}
                onChangeBackgroundColor={nextBackgroundColor =>
                  setOptions(
                    update(options, {
                      [logType]: {
                        backgroundColor: { $set: nextBackgroundColor }
                      }
                    })
                  )
                }
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
