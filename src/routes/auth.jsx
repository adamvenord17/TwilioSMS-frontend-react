import LoginPage from "../views/Auth/LoginPage.jsx";
import RegisterPage from "../views/Auth/RegisterPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint"; 
import ExitToApp from "@material-ui/icons/ExitToApp";


var authRoutes = [
  
  { path: "/auth/login", name: "Login Page", short: "Login", icon: Fingerprint, component: LoginPage },
  { path: "/auth/register", name: "Register Page", short: "Register", icon: PersonAdd, component: RegisterPage },
  { path: "/auth/logout", name: "Log out", short: "Logout", icon: ExitToApp, component: LoginPage }
];
export default authRoutes;
