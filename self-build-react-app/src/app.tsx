import React from 'react';

import './app.css';
import './app.less'

const App = () => {
  console.log("NODE_ENV", process.env.NODE_ENV);
  console.log("BASE_ENV", process.env.BASE_ENV);

  return <div>chencs</div>
}

export default App;