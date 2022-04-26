import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis } from 'react-moralis';

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('You are authenticated');
    }
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: "Log in Using Moralis"})
        .then(function (user) {
          console.log("Logged in User" + user);
          console.log(user!.get("ethAdress"));
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("Logged out");
  }
  return (
    <div className="App">
      <h1>Hello Moralis</h1>
      <button onClick={ login }>Moralis MetaMask Login</button>
      <button onClick={ logout } disabled={ isAuthenticating }>Log out</button>
    </div>
  );
}

export default App;
