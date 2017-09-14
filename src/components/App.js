import React from 'react';
import {scaleLinear} from 'd3-scale';
import _ from 'lodash';
import {csv} from 'd3-request';
import StripSeries from './StripSeries';
import Axis from './Axis';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      activeStrip: null,
      activePosition: null,
      activeValue: null,
    };
  }

  componentWillMount() {
    csv("./germanCitiesCategories.csv", (error, data) => {
      if (error) {
        console.log("error loading data file");
      }
      this.setState({
        data: data,
      });
    })
  }

  decamelize(input, tie) {
    return _.flow(
      (str) => str.replace(/([A-Z])/g, `${tie}$1`),
      (str) => str.replace(/(^.)/, (firstChar) => firstChar.toUpperCase())
    )(input);
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
    const {width, height, margin, min, max, dataKey} = this.props;
    const scale = scaleLinear()
      .domain([min, max])
      .range([margin.left, width - margin.right]);

    return (
      <svg
        width={width}
        height={height}
        style={{
          backgroundColor: "#E3C44D",
          stroke: "black"
        }}
      >
        <text
          x={margin.left}
          y={margin.top}
          style={{
            fontFamily: "Verdana, sans-serif",
            fontWeight: "normal",
            fontSize: 14,
            stroke: "none"
          }}
        >
          {this.decamelize(dataKey, "-")}
        </text>
        {this.state.activeStrip && 
          <text
            x={this.state.activePosition}
            y={margin.top + 20}
            style={{
              fontFamily: "Verdana, sans-serif",
              fontWeight: "normal",
              fontSize: 10,
              textAnchor: "middle",
              stroke: "none"
            }}
          >
            {`${this.state.activeStrip}: ${this.state.activeValue}`}
          </text>
        }

        <Axis
          dimensions={this.props}
          scale={scale} />
        
        
        <StripSeries
          data={this.state.data}
          dataKey={dataKey}
          scale={scale}
          dimensions={this.props}
          activeStrip={this.state.activeStrip}
          mouseOverHandler={this.handleMouseOver.bind(this)}
          mouseOutHandler={this.handleMouseOut.bind(this)} />
      </svg>
    );
  }
}

export default App;