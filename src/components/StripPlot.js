import React from 'react';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import StripSeries from './StripSeries';
import Axis from './Axis';
import Label from './Label';

const datumByCity = (city, data) => {
  return _.find(data, (o) => o.city === city);
}

function StripPlot(props) {
  const {
    dimensions,
    yOffset,
    data,
    dataKey,
    title,
    min,
    max,
    options,
    highlight,
    match, 
    mouseOverHandler,
    mouseOutHandler
  } = props,

  { margin, width } = dimensions,
  { subhead } = options,
  
  scale = scaleLinear()
    .domain([min, max])
    .range([margin.left, width - margin.right]),

  highlightDatum = datumByCity(highlight, data),
  matchDatum = datumByCity(match, data);

  return (
    data &&
    <g
      transform={`translate(0,${yOffset})`}
    >
      <text
        x={margin.left}
        y={margin.top}
        style={{
          fontFamily: "Calibri, Verdana, sans-serif",
          fontWeight: "bold",
          fontSize: 15,
          stroke: "none",
          fill: "#222"
        }}
      >
        <tspan>{title}</tspan>
        {
          subhead &&
          <tspan
            dx={10}
            style={{
              fontWeight: "normal",
              fontSize: 14,
            }}
          >{subhead}</tspan>
        }
      </text>
      
      <Axis
        dimensions={dimensions}
        scale={scale}
        options={options} />

      <StripSeries
        data={data}
        dataKey={dataKey}
        scale={scale}
        dimensions={dimensions}
        activeCity={highlight}
        matchCity={match}
        mouseOverHandler={mouseOverHandler}
        mouseOutHandler={mouseOutHandler} />
      {
        highlight &&
        <Label
          isLeft={highlightDatum[dataKey] < matchDatum[dataKey]}
          scale={scale}
          datum={highlightDatum}
          dataKey={dataKey}
          margin={margin}
          options={options} />
      }
      {
        match &&
        <Label
          isLeft={matchDatum[dataKey] < highlightDatum[dataKey]}
          scale={scale}
          datum={matchDatum}
          dataKey={dataKey}
          margin={margin}
          options={options} />
      }
    </g>
  );
}

export default StripPlot;