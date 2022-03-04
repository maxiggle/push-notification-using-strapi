import React from "react";
import { Route, Routes } from "react-router-dom";
import AssetsPage from "../../pages/assets";
import Login from "../../pages/login";
import Signup from "../../pages/signup";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/assets"
          element={<AssetsPage />}
        />
      </Route>
      <Route
        path="/edit"
        element={<div />}
      />
      <Route element={<div />} status={404} />
    </Routes>
  );
};

export default AllRoutes;
