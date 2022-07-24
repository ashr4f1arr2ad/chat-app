import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./components/NotFound";

// const socket = io.connect("http://127.0.0.1:4000");
// console.log(socket);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><ChatBody /></PrivateRoute>} />
        <Route path='*' element={<NotFound />} />
        {/* <Route path="/" element={<Login />} /> */}
          {/* <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        {/* </Route> */}
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
