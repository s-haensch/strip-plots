import React from 'react';
import _ from 'lodash';
import {csv} from 'd3-request';
import StripPlot from './StripPlot';
import Legend from './Legend';
import * as util from './Util';
import { scaleLinear } from 'd3-scale';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      activeCity: null,
      twinCity: null,
    };
  }

  componentWillMount() {
    csv(
      this.props.dataPath,
      (row) => ({
          city: row.city,
          notReligious: +row.notReligious,
          ownedHomes: +row.ownedHomes,
          selfEmployed: +row.selfEmployed,
          populationChange: +row.populationChange,
          populationDensity: +row.populationDensity
      }), 
      (error, data) => {
        if (error) {
          console.log("error loading data file");
        }

        const highlight = this.props.highlight || "Chemnitz";
        const matchCity = this.getMatchDatumByCity(
            data, this.props.highlight);

        this.setState({
          data: data,
          activeCity: highlight,
          matchCity: matchCity
        });
      }
    );
  }

  getMatchDatumByCity(data, city) {
    return _.head(util.getBestMatches(
      data,
      city,
      [ "notReligious",
        "ownedHomes",
        "selfEmployed",
        "populationChange",
        "populationDensity"
      ],
      1
    )).matchCity;
  }

  setActiveByCity(city) {
    const matchCity = this.getMatchDatumByCity(
      this.state.data, city);
    
    this.setState({
      activeCity: city,
      matchCity: matchCity
    });
  }

  resetActiveCity() {
    this.setState({
      activeCity: null,
      matchCity: null
    });
  }

  createStripPlot(props, category, index) {
    const {
        data,
        width,
        plotHeight,
        margin,
        highlight,
        matchCity,
        mouseOverHandler,
        mouseOutHandler
      } = props,
      {
        key,
        title,
        min,
        max,
        options
      } = category;

    return (
      <StripPlot
        key={index}
        data={data}
        dataKey={key}
        highlight={highlight}
        match={matchCity}
        title={title}
        min={min}
        max={max}
        options={options}
        yOffset={index * plotHeight}
        dimensions={{width, plotHeight, margin}}
        mouseOverHandler={mouseOverHandler}
        mouseOutHandler={mouseOutHandler}
      />
    );
  }

  render() {
    const {width, plotHeight, margin, categories} = this.props,
      plot = _.curry(this.createStripPlot)({
        data: this.state.data,
        width: width,
        plotHeight: plotHeight,
        margin: margin,
        highlight: this.state.activeCity,
        matchCity: this.state.matchCity,
        mouseOverHandler: this.setActiveByCity.bind(this),
        mouseOutHandler: this.resetActiveCity.bind(this)
      });

    
    return (
      <svg
        width={width}
        height={
          (plotHeight * categories.length)
          + margin.bottom
          + 40
        }
        style={{
          backgroundColor: "#E3C44D",
          stroke: "black"
        }}
      >
        <Legend
          x={50}
          y={30}
        />
        <g transform="translate(0, 30)">
          {_.map(categories, plot)}
        </g>
      </svg>
    );
  }
}

export default App;