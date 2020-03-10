import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import update from "immutability-helper";
import { Options } from "../options";
import { loadOptions, saveOptions } from "../storage";
import { LoggingOption } from "./LoggingOption";

function App() {
  const [options, setOptionsRaw] = useState<Options | null>(null);
  const setOptions = useCallback((newOptions: Options) => {
    setOptionsRaw(newOptions);
    saveOptions(newOptions);
  }, []);

  useEffect(() => {
    loadOptions().then(setOptionsRaw);
  }, []);

  if (options == null) return null;
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
