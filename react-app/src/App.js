import logo from './logo.svg';
import './App.css';
import React from 'react';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCandidates from './components/DCandidates';
import { Container } from '@material-ui/core';

function App() {
  return (
    <div className="titleIndex"> Welcome To React-CRUD
      <Provider store={store}>
        <Container maxWidth="lg">
          <DCandidates />
        </Container>
      </Provider>
    </div>
  );
}

export default App;
