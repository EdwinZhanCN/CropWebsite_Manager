import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, {useEffect} from "react";
import "@/root.css";
import router from "@/router";
import SideBar from "@/components/SideBar";
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from '@/store/store';
import {checkServerConnection} from "@/store/connectionSlice";
import Alert from "@/components/Alert";


function App() {

    const dispatch = useDispatch();
    const { SPRING_BACKEND_CONNECTION } = useSelector((state) => state.connection);
    const [isAlert, setIsAlert] = React.useState("");
    const [message, setMessage] = React.useState("");

    // useEffect(() => {
    //     dispatch(checkServerConnection());
    //     // 可以设置定时器定期检查连接状态
    //     const interval = setInterval(() => {
    //         dispatch(checkServerConnection());
    //         if (!SPRING_BACKEND_CONNECTION) {
    //             setIsAlert("show");
    //             setMessage("Failed to connect to the server");
    //         }
    //     }, 6000); // 每分钟检查一次
    //     return () => clearInterval(interval);
    // }, [dispatch]);

    return (
          <Router>
              <SideBar />
              {/*<Alert message={message} show={isAlert}/>*/}
              <Routes>
                  {router.map((route, index) => (
                      <Route key={index} path= {route.path} element= {route.element} />
                  ))}
              </Routes>
          </Router>
    )
}

export default App
