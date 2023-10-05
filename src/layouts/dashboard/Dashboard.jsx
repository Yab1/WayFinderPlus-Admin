import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SideNav, AccountMenu } from "@/widgets/layout";
import routes from "@/routes";
import { fetchData } from "@/slices";
import { useDispatch } from "react-redux";
import { StyleController } from "@/widgets/layout";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Fragment>
      <SideNav />
      <AccountMenu />
      <StyleController />
      <Routes>
        {routes.map(({ name, path, element }) => (
          <Route key={name} exact path={path} element={element} />
        ))}
      </Routes>
    </Fragment>
  );
}

Dashboard.displayName = "/src/layouts/Dashboard.jsx";

export default Dashboard;
