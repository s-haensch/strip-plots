import React from 'react';


class Label extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      textWidth: 0,
    }
  }
  
  componentDidMount() {
    const bbox = this.refs.number.getBBox();
    this.setState({
      textWidth: bbox.width,
    })
  }


  render() {
    const
      {
        isLeft,
        scale,
        datum,
        dataKey,
        margin,
        options,
      } = this.props,
      { suffix, format } = options,
      position = scale(datum[dataKey]) + (isLeft ? -6 : 6);

    return(
      <g
        transform={`translate(${position},0)`}
      >
        <rect
          x={isLeft ? (-this.state.textWidth) - 2 : -2}
          y={margin.plotTop + 22}
          width={this.state.textWidth + 6}
          height={16}
          fill="#E3C44D"
          stroke="none"
        />
        <text
          y={margin.plotTop + 20}
          style={{
            fontFamily: "Calibri, Verdana, sans-serif",
            fontWeight: "bold",
            fontSize: 12,
            textAnchor: isLeft ? "end" : "start",
            stroke: "none",
          }}
        >
          {`${datum.city}:`}
        </text>
        <text
          ref="number"
          x={0}
          y={margin.plotTop + 10}
          dy="1.8em"
          style={{
            fontFamily: "Calibri, Verdana, sans-serif",
            fontWeight: "normal",
            fontSize: 13,
            textAnchor: isLeft ? "end" : "start",
            stroke: "none",
          }}
        >
          {`${format ? format(datum, dataKey) : datum[dataKey]}
            ${suffix ? suffix : ""}`}
        </text>
      </g>
    );
  }
};

export default Label;