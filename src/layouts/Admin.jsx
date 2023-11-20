import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminFeatures, Auth } from "@/features";

function Admin() {
  return (
    <Fragment>
      {/* <Routes>
        <Route path="/wayfinder/*" element={<AdminFeatures />} />
        <Route path="/wayfinder/auth/*" element={<Auth />} />
        <Route
          path="*"
          element={
            <Navigate
              to={true ? "/wayfinder" : "/wayfinder/auth/sign-in"}
              replace
            />
          }
        />
      </Routes> */}
    </Fragment>
  );
}

Admin.displayName = "/src/layouts/Admin.jsx";

export default Admin;
