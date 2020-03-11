import React, { useState } from "react";
import { ChromePicker } from "react-color";

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
  const [isVisibleColorPicker, setIsVisibleColorPicker] = useState(false);

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
          tabIndex={0}
          onBlur={() => setIsVisibleColorPicker(false)}
          style={{
            display: "flex",
            alignItems: "center",
            outline: "none"
          }}
        >
          {isVisibleColorPicker ? (
            <ChromePicker
              disableAlpha={false}
              color={backgroundColor}
              onChange={({ rgb: { r, g, b, a } }) =>
                onChangeBackgroundColor(`rgba(${r},${g},${b},${a})`)
              }
            />
          ) : (
            <div
              style={{
                width: "1rem",
                height: "1rem",
                margin: "0.5rem",
                border: "solid 1px",
                backgroundColor: backgroundColor
              }}
              onClick={() => setIsVisibleColorPicker(true)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
