import React from 'react';
import _ from 'lodash';

function stripLine(props, datum, index) {
  const {
    scale,
    dimensions,
    dataKey,
    activeCity,
    mouseOverHandler,
    mouseOutHandler
  } = props;
  const {plotHeight, margin} = dimensions;

  return (
    <g key={`g-${index}`}>
      <line
        style={
          datum.city === activeCity ?
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
        x1={scale(datum[dataKey])}
        y1={plotHeight - margin.bottom - 4}
        x2={scale(datum[dataKey])}
        y2={plotHeight - margin.bottom - (datum.city === activeCity ? 27 : 24)} />
      <rect
        x={scale(datum[dataKey]) - 3}
        y={plotHeight - margin.bottom - 28}
        width={5}
        height={24}
        onMouseOver={() => {
            mouseOverHandler(datum.city);
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