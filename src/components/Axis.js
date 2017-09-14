import React from 'react';


function Axis(props) {
  const {dimensions, scale} = props,
    {margin, width, plotHeight} = dimensions;

  return (
    <g>
      <line
        x1={margin.left}
        y1={plotHeight - margin.bottom}
        x2={width - margin.right}
        y2={plotHeight - margin.bottom} />
      <line
        x1={margin.left}
        y1={plotHeight - margin.bottom}
        x2={margin.left}
        y2={plotHeight - margin.bottom + 8} />
      <line
        x1={width - margin.right}
        y1={plotHeight - margin.bottom}
        x2={width - margin.right}
        y2={plotHeight - margin.bottom + 8} />
      <text
        x={margin.left}
        y={plotHeight - margin.bottom + 18}
        style={{
          fontFamily: "Verdana, sans-serif",
          fontWeight: "normal",
          fontSize: 10,
          stroke: "none",
          textAnchor: "middle"
        }}
      >
        {scale.domain()[0]}
      </text>
      <text
        x={width - margin.right}
        y={plotHeight - margin.bottom + 18}
        style={{
          fontFamily: "Verdana, sans-serif",
          fontWeight: "normal",
          fontSize: 10,
          stroke: "none",
          textAnchor: "middle"
        }}
      >
        {scale.domain()[1]}
      </text>
    </g>
  );
}

export default Axis;