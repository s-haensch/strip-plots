import React from 'react';
// import {scaleLinear} from 'd3-scale';
import _ from 'lodash';
import {csv} from 'd3-request';
import StripPlot from './StripPlot';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      activeCity: props.highlight || "Chemnitz"
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

  handleCityChange(nextCity) {
    this.setState({
      activeCity: nextCity
    });
  }

  createStripPlot(props, category, index) {
    const {
        data,
        highlight,
        width,
        plotHeight,
        margin,
        handleCityChange
      } = props,
      {key, title, min, max} = category;

    return (<StripPlot
      key={index}
      data={data}
      dataKey={key}
      highlight={highlight}
      title={title}
      min={min}
      max={max}
      yOffset={index * plotHeight}
      dimensions={{width, plotHeight, margin}}
      onCityChange={handleCityChange}
    />);
  }

  render() {
    const {width, plotHeight, margin, categories} = this.props,
      plot = _.curry(this.createStripPlot)({
        data: this.state.data,
        width: width,
        plotHeight: plotHeight,
        margin: margin,
        highlight: this.state.activeCity,
        handleCityChange: this.handleCityChange
      });

    return (
      <svg
        width={width}
        height={plotHeight * categories.length}
        style={{
          backgroundColor: "#E3C44D",
          stroke: "black"
        }}
      >
        {_.map(categories, plot)}
      </svg>
    );
  }
}

export default App;