import Dashboard from "layouts/Dashboard.jsx";
import Auth from "layouts/Auth.jsx";

var indexRoutes = [
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
