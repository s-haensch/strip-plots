import React from 'react';

function Legend(props) {
  const {x, y} = props;
  const fontStyle = {
    fontFamily: "Calibri, Verdana, sans-serif",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: 0.1,
    stroke: "none",
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={15}
        style={{
          stroke: "#ffffff",
          strokeWidth: 3,
        }}
      ></line>
      <line
        x1={90}
        y1={0}
        x2={90}
        y2={15}
        style={{
          stroke: "#0FAD0F",
          strokeWidth: 3,
        }}
      ></line>
      <text
        x={6}
        y={14}
        style={fontStyle}
      >
        selected city
      </text>
      <text
        x={96}
        y={14}
        style={fontStyle}
      >
        closest match
      </text>
    </g>
  );
}

export default Legend;