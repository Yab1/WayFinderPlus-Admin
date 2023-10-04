import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { SideNav, AccountMenu } from "@/widgets/layout";
import routes from "@/routes";

function Dashboard() {
  return (
    <Fragment>
      <SideNav />
      <AccountMenu />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route exact path={path} element={element} />
        ))}
      </Routes>
    </Fragment>
  );
}

Dashboard.displayName = "/src/layouts/Dashboard.jsx";

export default Dashboard;
