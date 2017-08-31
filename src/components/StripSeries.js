import React from 'react';
import _ from 'lodash';


function stripLine(props, datum, index) {
  const {
    scale,
    dimensions,
    dataKey,
    activeStrip,
    mouseOverHandler,
    mouseOutHandler
  } = props;
  const {height, margin} = dimensions;


  return (
    <g>
      <line
        style={
          datum.city === activeStrip ?
          {
            strokeOpacity: 1,
            stroke: "white",
            strokeWidth: 3,
          } :
          {
            strokeOpacity: 0.25,
            stroke: "black",
            strokeWidth: 1,
          }
        }
        key={index}
        x1={scale(datum[dataKey])}
        y1={height - margin.bottom - 4}
        x2={scale(datum[dataKey])}
        y2={height - margin.bottom - (datum.city === activeStrip ? 27 : 24)} />
      <rect
        x={scale(datum[dataKey]) - 3}
        y={height - margin.bottom - 28}
        width={5}
        height={24}
        onMouseOver={function() {
            mouseOverHandler(
              scale(datum[dataKey]),
              datum.city,
              `${parseFloat(datum[dataKey]).toFixed(2)}%`
            )
          }
        }
        onMouseOut={mouseOutHandler}
        style={{
          fill: "rgba(0, 0, 0, 0)",
          stroke: "none",
        }} />
      
    </g>
  );
}

function StripSeries(props) {
  const {data} = props;
  const createStripLine = _.curry(stripLine)(props);
  return (
    <g>
      {_.map(data, createStripLine)}
    </g>
  )
}

export default StripSeries;