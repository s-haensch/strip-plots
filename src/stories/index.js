import React from 'react';
import App from '../components/App';
import { storiesOf } from '@kadira/storybook';


storiesOf('Scale', module)
  .add('owned homes', () => (
    <App
      width={800}
      height={120}
      margin={{
        left: 30,
        top: 30,
        right: 30,
        bottom: 40,
      }}
      min={0}
      max={100}
      dataPath="./germanCitiesCategories.csv"
      dataKey="ownedHomes"
    />
  ))
  .add('not religious', () => (
    <App
      width={800}
      height={120}
      margin={{
        left: 30,
        top: 30,
        right: 30,
        bottom: 40,
      }}
      min={0}
      max={100}
      dataPath="./germanCitiesCategories.csv"
      dataKey="notReligious"
    />
  ))
  .add('self-employed', () => (
    <App
      width={800}
      height={120}
      margin={{
        left: 30,
        top: 30,
        right: 30,
        bottom: 40,
      }}
      min={0}
      max={20}
      dataPath="./germanCitiesCategories.csv"
      dataKey="selfEmployed"
    />
  ));
