import React from 'react';
import App from '../components/App';
import { storiesOf } from '@kadira/storybook';

const baseOptions = {
  suffix: "%",
  midTick: true,
  format: (datum, dataKey) =>
    parseFloat(datum[dataKey]).toFixed(2),
};

storiesOf('Strip plot', module)
  .add('All plots', () => (
    <App
      width={800}
      plotHeight={110}
      margin={{
        left: 50,
        top: 50,
        right: 50,
        bottom: 50,
        plotTop: 60,
        plotBottom: 0,
      }}
      dataPath="./germanCitiesCategories.csv"
      categories={[
        {
          key: "notReligious",
          title: "NON-RELIGIOUS",
          min: 0,
          max: 100,
          options: baseOptions,
        },
        {
          key: "ownedHomes",
          title: "HOME OWNERSHIP",
          min: 0,
          max: 100,
          options: baseOptions,
        },
        {
          key: "selfEmployed",
          title: "SELF-EMPLOYED",
          min: 0,
          max: 20,
          options: baseOptions
        },
        {
          key: "populationChange",
          title: "POPULATION GROWTH 1990‒2014",
          min: -50,
          max: 50,
          options: {
            suffix: "%",
            midTick: true,
            midTickLabel: "no change",
            format: (datum, dataKey) =>
              parseFloat(datum[dataKey]).toFixed(2),
          }
        },
        {
          key: "populationDensity",
          title: "POPULATION DENSITY",
          min: 101,
          max: 4668,
          options: {
            subhead: "inhabitants per km²",
          }
        }
      ]}
      highlight="Chemnitz"
    />
  ));
