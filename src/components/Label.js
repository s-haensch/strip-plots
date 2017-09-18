import React from 'react';


function Label (props) {
  const {isLeft, scale, datum, dataKey, margin} = props,
    position = scale(datum[dataKey]) + (isLeft ? -6 : 6);

  return(
    <g
      transform={`translate(${position},0)`}
    >
      <rect
        x={0}
      />

      <text
        y={margin.top + 20}
        style={{
          fontFamily: "Calibri, Verdana, sans-serif",
          fontWeight: "normal",
          fontSize: 13,
          textAnchor: isLeft ? "end" : "start",
          stroke: "none",
        }}
      >
        <tspan
          x={0}
          style={{
            fontSize: 13,
            letterSpacing: 0.7,
            fontWeight: "bold",
          }}
        >
          {`${datum.city}:`}
        </tspan>
        <tspan
          x={0}
          dy="1.2em"
        >
          {`${parseFloat(datum[dataKey]).toFixed(2)}`}
        </tspan>
      </text>
    </g>
  );
};

export default Label;