import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';

const App = () => {
  const [token, setToken] = useState(null);
  return <div>{token ? <Chat token={token} /> : <Login onLogin={setToken} />}</div>;
};

export default App;