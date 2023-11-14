import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SideNav, AccountMenu } from "@/widgets/layout";
import routes from "@/routes";
import { fetchData } from "@/redux/slices";
import { useDispatch } from "react-redux";

function AdminFeatures() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Fragment>
      <SideNav />
      <AccountMenu />

      <Routes>
        {routes.map(({ name, path, element }) => (
          <Route key={name} exact path={path} element={element} />
        ))}
      </Routes>
    </Fragment>
  );
}

AdminFeatures.displayName = "/src/features/admin/AdminFeatures.jsx";

export default AdminFeatures;
