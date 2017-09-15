import _ from 'lodash';
import { scaleLinear } from 'd3-scale';

export const createScale = (data, key, minMaxRange) => {
  return scaleLinear()
    .domain([
      _.minBy(data, (row) => row[key])[key],
      _.maxBy(data, (row) => row[key])[key],
    ])
    .range([minMaxRange[0], minMaxRange[1]]);
};

export const createScales = (data, keys, range) => {
  const scales = {};
  _.map(keys, (key) => {
    scales[key] = createScale(data, key, range);
  });

  return scales;
};

export const getCityMatchValue = (cityProps, otherCityProps, keys) => {
  let sum = 0;

  _.map(keys, (key) => {
    sum += Math.pow(cityProps[key] - otherCityProps[key], 2);
  });

  return Math.sqrt(sum);
};

export const getBestMatches = (data, compareCity, categories, numberOfMatches) => {
  const scales = createScales(data, categories, [0, 1]);
  const cityProps = {};
  _.map(data, (row) => {
    cityProps[row.city] = {}; // new empty object for each city

    _.map(categories, (category) => {
      cityProps[row.city][category] = scales[category](row[category]);
    });
  });

  const matches = _.map(data, (row) => {
    return {
      city: compareCity,
      matchCity: row.city,
      value: getCityMatchValue(cityProps[compareCity], cityProps[row.city], categories),
    };
  });

  return _.slice(_.drop(
    _.sortBy(matches, [(row) => row.value])
  ), 0, numberOfMatches);
};