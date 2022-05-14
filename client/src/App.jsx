import {Logo} from "./components";
import AddDonation from "./components/AddDonation";
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from "./components/Home";
import MyDonations from "./components/MyDonations";
import OpenDonation from "./components/OpenDonation";



const App = () => {
  return (
    <Router>
      <div className="App">
          <Logo />
          <Routes>
            <Route path="/" element={<OpenDonation/>}>
              <Route path="addDonation" element={<AddDonation/>}/>
              <Route path="myDonations" element={<MyDonations/>}/>
            </Route>
          </Routes>
      </div>
    </Router>
  )
}

export default App
