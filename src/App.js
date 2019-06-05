import React  from 'react';
import './App.scss';

import UserList from './components/UserList/UserList';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h3>Welcome to React + Redux sample app created by Patryk Smul and powered by coffee</h3>
      </header>
      <br />
      <UserList />
    </div>
  );
}

export default App;
