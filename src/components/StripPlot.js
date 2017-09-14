import React from 'react';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import StripSeries from './StripSeries';
import Axis from './Axis';


class StripPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStrip: null,
      activePosition: null,
      activeValue: null,
    };
  }

  handleMouseOver(position, city, value) {
    this.setState({
      activeStrip: city,
      activePosition: position,
      activeValue: value,
    })
  }

  handleMouseOut() {
    this.setState({
      activeStrip: null,
      activePosition: null,
      activeValue: null,
    })
  }

  render() {
    const { dimensions, yOffset, data, dataKey, title, min, max } = this.props,
    {width, plotHeight, margin} = dimensions,
    scale = scaleLinear()
    .domain([min, max])
    .range([margin.left, width - margin.right]);
    
    return (
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
        {this.state.activeStrip &&
          <text
            x={this.state.activePosition}
            y={margin.top + 20}
            style={{
              fontFamily: "Calibri, Verdana, sans-serif",
              fontWeight: "normal",
              fontSize: 13,
              textAnchor: "middle",
              stroke: "none"
            }}
          >
            {`${this.state.activeStrip}: ${this.state.activeValue}`}
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
          activeStrip={this.state.activeStrip}
          mouseOverHandler={this.handleMouseOver.bind(this)}
          mouseOutHandler={this.handleMouseOut.bind(this)} />

      </g>
    );
  }
}

export default StripPlot;