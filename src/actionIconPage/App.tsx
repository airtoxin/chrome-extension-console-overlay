import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
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
          <tr>
            <td>console.trace</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div
                style={{ width: "1em", height: "1em", backgroundColor: "red" }}
              />
            </td>
          </tr>
          <tr>
            <td>console.debug</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div
                style={{ width: "1em", height: "1em", backgroundColor: "red" }}
              />
            </td>
          </tr>
          <tr>
            <td>console.log</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div
                style={{ width: "1em", height: "1em", backgroundColor: "red" }}
              />
            </td>
          </tr>
          <tr>
            <td>console.info</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div
                style={{ width: "1em", height: "1em", backgroundColor: "red" }}
              />
            </td>
          </tr>
          <tr>
            <td>console.warn</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div
                style={{ width: "1em", height: "1em", backgroundColor: "red" }}
              />
            </td>
          </tr>
          <tr>
            <td>console.error</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div
                style={{ width: "1em", height: "1em", backgroundColor: "red" }}
              />
            </td>
          </tr>
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
