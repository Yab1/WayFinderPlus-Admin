import { Routes, Route } from "react-router-dom";
import { userRoutes } from "@/routes";

function UserLayout() {
  return (
    <div>
      <Routes>
        {userRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

UserLayout.dispalyName = "/src/layouts/UserLayout.jsx";

export default UserLayout;
