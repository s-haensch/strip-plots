import React from 'react';
import App from '../components/App';
import { storiesOf } from '@kadira/storybook';


storiesOf('Scale', module)
  .add('simple scale', () => (
    <App
      width={800}
      height={120}
      margin={{
        left: 30,
        top: 30,
        right: 30,
        bottom: 40,
      }}
      dataPath="./germanCitiesCategories.csv"
      dataKey="ownedHomes"
    />
  ));
