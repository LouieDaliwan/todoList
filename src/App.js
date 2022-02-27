// import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Header from './components/Header/Header';
import InputItem from './components/InputItem/InputItem';

export default class App extends Component {
  render() {
    return (
        <Router>
          <Header />
          <Routes>
              <Route exact path="/" element={ <Registration />} />
              <Route path="/login" element={ <Login />} />
              <Route path="/todo" element={ <InputItem  /> } />
          </Routes>
        </Router>
    )
  }
}