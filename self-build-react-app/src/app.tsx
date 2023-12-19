import React from 'react';

// import styles from './app.css';
import styles from './app.less'

const App = () => {
  console.log("NODE_ENV", process.env.NODE_ENV);
  console.log("BASE_ENV", process.env.BASE_ENV);

  return <div className={styles.cool}>chencs</div>
}

export default App;