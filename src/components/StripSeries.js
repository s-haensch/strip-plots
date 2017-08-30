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
    <line
      style={{
        strokeOpacity: datum.city === activeStrip ? 1 : 0.2,
      }}
      onMouseOver={function() {
          mouseOverHandler(
            scale(datum.ownedHomes),
            datum.city,
            `${parseFloat(datum[dataKey]).toFixed(2)}%`
          )
        }
      }
      onMouseOut={mouseOutHandler}
      key={index}
      x1={scale(datum.ownedHomes)}
      y1={height - margin.bottom - 4}
      x2={scale(datum.ownedHomes)}
      y2={height - margin.bottom - (datum.city === activeStrip ? 27 : 24)} />
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