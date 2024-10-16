import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import AddGame from "../components/AddGame/AddGame";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="/addgame" element={<AddGame />}></Route>
    </Routes>
  );
}
