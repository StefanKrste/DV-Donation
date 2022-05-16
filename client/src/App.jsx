import React from 'react'
import {Logo} from "./components";
import AddDonation from "./components/AddDonation";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import MyDonations from "./components/MyDonations";
import OpenDonation from "./components/OpenDonation";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<Logo/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="addDonation" element={<AddDonation/>}/>
              <Route path="myDonations" element={<MyDonations/>}/>
              <Route path=":id" element={<OpenDonation/>}/>
            </Route>
          </Routes>
      </div>
    </Router>
  )
}

export default App
