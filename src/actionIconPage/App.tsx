import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const LoggingOption: React.FunctionComponent<{
  logType: string;
  use: boolean;
  backgroundColor: string;
}> = ({logType, use, backgroundColor}) => {
  return (
    <tr>
      <td>console.{logType}</td>
      <td>
        <input type="checkbox" checked={use}/>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{ width: "1em", height: "1em", backgroundColor: backgroundColor }}
          />
          <input type="text" value={backgroundColor}/>
        </div>
      </td>
    </tr>
  );
};

function App() {
  const [options, setOptions] = useState({
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
    },
  } as const);
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
          {Object.entries(options).map(([logType, { use, backgroundColor }]) => (
            <LoggingOption
              logType={logType}
              use={use}
              backgroundColor={backgroundColor}
            />
          ))}
        </tbody>
      </table>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
