import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import "@/root.css";
import router from "@/router";
import SideBar from "@/components/SideBar";

function App() {

  return (
      <Router>
          <SideBar />
          <Routes>
              {router.map((route, index) => (
                  <Route key={index} path= {route.path} element= {route.element} />
              ))}
          </Routes>
      </Router>
  )
}

export default App
