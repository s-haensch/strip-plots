import React from 'react';
import App from '../components/App';
import { storiesOf } from '@kadira/storybook';


storiesOf('Strip plot', module)
  .add('All plots', () => (
    <App
      width={800}
      plotHeight={120}
      margin={{
        left: 30,
        top: 30,
        right: 30,
        bottom: 40,
      }}
      dataPath="./germanCitiesCategories.csv"
      categories={[
        {
          key: "notReligious",
          title: "NON-RELIGIOUS",
          min: 0,
          max: 100,
        },
        {
          key: "ownedHomes",
          title: "HOME OWNERSHIP",
          min: 0,
          max: 100,
        },
        {
          key: "selfEmployed",
          title: "SELF-EMPLOYED",
          min: 0,
          max: 20,
        },
        {
          key: "populationChange",
          title: "POPULATION GROWTH 1990‒2014",
          min: -50,
          max: 50,
        },
        {
          key: "populationDensity",
          title: "POPULATION DENSITY",
          min: 0,
          max: 100,
        }
      ]}
      highlight="Berlin"
    />
  ));
