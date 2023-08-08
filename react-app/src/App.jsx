import React from "react";
import Home from "./pages/Home";
import ZoomBond from "./pages/ZoomBond";
import Bonds from "./pages/Bonds";
import Test from "./pages/Test";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import  { useEffect } from 'react';



import ZoomBondAll from "./pages/ZoomBondAll";
const isAuthenticated = () => {
  return localStorage.getItem('authenticated') == 'true' ;
};


const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);


const App = () => {

  const navigate = useNavigate();
    
  // useEffect(()=> {
  //   if(localStorage.getItem('jwtToken')==null) {
  //     navigate("/login");
  //   }
  // }, [])

  return (<>
  
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="login" element={<Login />}/>
      <Route ProtectedRoute  path="home" element={<Home />}>
          <Route ProtectedRoute path="bonds" element={<Bonds />} />
          <Route ProtectedRoute path="zoombond" element={<ZoomBond />} />
          <Route ProtectedRoute path="test" element={<Test />} />
          <Route ProtectedRoute path="allbond" element={<ZoomBondAll />} />
      </Route>
    </Routes>
  </>);
};

export default App;
