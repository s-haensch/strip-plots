import React from 'react';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import StripSeries from './StripSeries';
import Axis from './Axis';


class StripPlot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStrip: null,
      activePosition: null,
      activeValue: null,
    };

    const {min, max, dimensions} = props,
      {width, margin} = dimensions;
    this.scale = scaleLinear()
      .domain([min, max])
      .range([margin.left, width - margin.right]);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.data !== null) {
      this.setActiveByCityAndData(
        this.props.highlight,
        nextProps.data);
    }
  }

  setActiveByCityAndData(city, data) {
    const {dataKey} = this.props;
    const datum = this.datumByCity(city, data);

    this.setState({
      activeStrip: city,
      activePosition: this.scale(datum[dataKey]),
      activeValue: `${parseFloat(datum[dataKey]).toFixed(2)}%`,
    });
  }
  
  setActiveByCity(city) {
    this.setActiveByCityAndData(city, this.props.data);
  }

  resetActiveCity() {
    this.setState({
      activeStrip: null,
      activePosition: null,
      activeValue: null,
    });
  }

  datumByCity(city, data) {
    return _.find(data, (o) => o.city === city);
  }

  render() {
    const { dimensions, yOffset, data, dataKey, title } = this.props,
    {margin} = dimensions;

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
          scale={this.scale} />


        <StripSeries
          data={data}
          dataKey={dataKey}
          scale={this.scale}
          dimensions={dimensions}
          activeStrip={this.state.activeStrip}
          mouseOverHandler={this.setActiveByCity.bind(this)}
          mouseOutHandler={this.resetActiveCity.bind(this)} />

      </g>
    );
  }
}

export default StripPlot;