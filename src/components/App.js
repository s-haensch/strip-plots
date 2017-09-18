import React from 'react';
import _ from 'lodash';
import {csv} from 'd3-request';
import StripPlot from './StripPlot';
import * as util from './Util';


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
    csv("./germanCitiesCategories.csv", (error, data) => {
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
    });
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
        suffix,
        midTick,
        midTickLabel,
        subhead,
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
        suffix={suffix}
        midTick={midTick}
        midTickLabel={midTickLabel}
        subhead={subhead}
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