import _ from 'lodash';
import { scaleLinear } from 'd3-scale';

/*
  maps the min and max values of a data column to
  a defined range (we use a range of 0..1)
*/
export const createScale = (data, key, minMaxRange) => {
  return scaleLinear()
    .domain([
      _.minBy(data, (row) => row[key])[key],
      _.maxBy(data, (row) => row[key])[key],
    ])
    .range([minMaxRange[0], minMaxRange[1]]);
};

/*
  applies the createScale function to a series of column keys
  of a dataset
*/
export const createScales = (data, keys, range) => {
  const scales = {};
  _.map(keys, (key) => {
    scales[key] = createScale(data, key, range);
  });

  return scales;
};


/*
  maps all values of the given categories to a range 0..1
  returns an object of objects like
  {
    Berlin: {
      notReligious: 0.234,
      ownedHomes: 0.540,
      ...
    },
    ...
  }
*/
export const getCityProps = (data, categories) => {
  const cityProps = {};
  const scales = createScales(data, categories, [0, 1]);

  _.map(data, (row) => {
    cityProps[row.city] = {}; // new empty object for each city

    _.map(categories, (category) => {
      cityProps[row.city][category] = scales[category](row[category]);
    });
  });

  return cityProps;
}

/*
  returns the distance between two cities
*/
export const getCityMatchValue = (cityProps, otherCityProps, keys) => {
  let sum = 0;

  _.map(keys, (key) => {
    sum += Math.pow(cityProps[key] - otherCityProps[key], 2);
  });

  return Math.sqrt(sum);
};


/*
  returns a sorted list of city match values like:
  [
    {
      city: "Berlin",
      matchCity: "Bremen",
      value: 0.584749293
    },
    ...
  ]  
*/
export const getBestMatches = (data, compareCity, categories, numberOfMatches) => {
  
  const cityProps = getCityProps(data, categories);

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