import React from 'react';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import StripSeries from './StripSeries';
import Axis from './Axis';

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
    highlight, 
    mouseOverHandler,
    mouseOutHandler
  } = props,

  { margin, width } = dimensions,
  
  scale = scaleLinear()
    .domain([min, max])
    .range([margin.left, width - margin.right]),

  datum = datumByCity(highlight, data);


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
        {title}
      </text>
      {highlight &&
        <text
          x={scale(datum[dataKey])}
          y={margin.top + 20}
          style={{
            fontFamily: "Calibri, Verdana, sans-serif",
            fontWeight: "normal",
            fontSize: 13,
            textAnchor: "middle",
            stroke: "none"
          }}
        >
          {`${highlight}: ${parseFloat(datum[dataKey]).toFixed(2)}`}
        </text>
      }

      <Axis
        dimensions={dimensions}
        scale={scale} />

      <StripSeries
        data={data}
        dataKey={dataKey}
        scale={scale}
        dimensions={dimensions}
        activeCity={highlight}
        mouseOverHandler={mouseOverHandler}
        mouseOutHandler={mouseOutHandler} />

    </g>
  );
}

export default StripPlot;