import React, {useState} from 'react'
import {Logo,AddDonation,MyDonations,OpenDonation,Home,Footer} from "./components";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './components/Pagination';

const App = () => {
  return (
      <div>
        <Router>
          <div className="App" >
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
        <Footer/>
      </div>
  )
}

export default App
