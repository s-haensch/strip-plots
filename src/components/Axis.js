import React from 'react';


function Axis(props) {
  const
    { dimensions, scale, options, } = props,
    { margin, width, plotHeight } = dimensions,
    { suffix, midTick, midTickLabel, } = options,

    style={
      fontFamily: "Verdana, sans-serif",
      fontWeight: "normal",
      fontSize: 10,
      stroke: "none",
      textAnchor: "middle"
    };

  return (
    <g>
      {/* axis line */}
      <line
        x1={margin.left}
        y1={plotHeight - margin.bottom}
        x2={width - margin.right}
        y2={plotHeight - margin.bottom} />

      {/* ticks */}
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
      {
        midTick &&
        <line
          x1={width / 2}
          y1={plotHeight - margin.bottom}
          x2={width / 2}
          y2={plotHeight - margin.bottom + 8} />
      }

      {/* tick labels */}
      <text
        x={margin.left}
        y={plotHeight - margin.bottom + 18}
        style={style}
      >
        {`${scale.domain()[0]}${suffix ? suffix : ""}`}
      </text>
      <text
        x={width - margin.right}
        y={plotHeight - margin.bottom + 18}
        style={style}
      >
        {`${scale.domain()[1]}${suffix ? suffix : ""}`}
      </text>
      {
        midTick &&
        <text
          x={width/2}
          y={plotHeight - margin.bottom + 18}
          style={style}
        >
          { midTickLabel ? midTickLabel :
            `${(scale.domain()[1] - Math.abs(scale.domain()[0])) / 2}
            ${suffix ? suffix : ""}`}
        </text>
      }
    </g>
  );
}

export default Axis;