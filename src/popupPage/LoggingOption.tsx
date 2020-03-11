import React from "react";

export const LoggingOption: React.FunctionComponent<{
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
