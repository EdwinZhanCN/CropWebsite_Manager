import React, { useState } from 'react'
import "@/root.css";
import SideBar from "@/components/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MainPicker from "@/components/MainPicker";
import ReportIssue from "@/components/ReportIssue";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <SideBar/>
          <div style={{paddingLeft:"180px"}}>
              <ReportIssue/>
          </div>
      </div>
  )
}

export default App
