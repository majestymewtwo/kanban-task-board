import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { isTokenValid } from "../src/utils/JwtUtils";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./index.css";
import { UserContext } from "./context/UserContext";

function App() {
  const context = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      context.setLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={context.isLoggedIn ? <Home /> : <Navigate to='/login' />}
      />
      <Route
        path='/login'
        element={context.isLoggedIn ? <Navigate to='/' /> : <Login />}
      />
      <Route
        path='/register'
        element={context.isLoggedIn ? <Navigate to='/' /> : <Register />}
      />
      <Route
        path="*"
        element={<Navigate to='/' />}
      />
    </Routes>
  );
}

export default App;
