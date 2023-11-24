import { ExplorePage, WelcomePage, Help } from "@/features/user/pages";

export const userRoutes = [
  {
    path: "",
    element: <WelcomePage />,
  },
  {
    path: "/explore-maps",
    element: <ExplorePage />,
  },
  {
    path: "/help",
    element: <Help />,
  },
];
