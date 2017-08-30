import React from 'react';
import {scaleLinear} from 'd3-scale';
import _ from 'lodash';
import {csv} from 'd3-request';
import StripSeries from './StripSeries';

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
    const {width, height, margin, dataKey} = this.props;
    const scale = scaleLinear()
      .domain([0, 100])
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
          {dataKey}
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
        <line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom} />

        
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