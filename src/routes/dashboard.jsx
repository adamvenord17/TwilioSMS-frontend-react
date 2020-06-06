import User from "../views/User/User";
import Sent from "../views/SMS/Sent";
import Received from "../views/SMS/Received";
import EditUser from "../views/User/EditUser.jsx";
import ChangePassword from "../views/User/ChangePassword.jsx";
import SendSMS from "../views/SendSMS/SendSMS.jsx";


// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Send from "@material-ui/icons/Send";
import Forum from "@material-ui/icons/Forum";

var dashRoutes = [
    { path: "/send_sms", name: "Send SMS", icon: Send, component: SendSMS },
    {
        collapse: true,
        path: "/sms",
        name: "History",
        state: "openSMS",
        icon: Forum,
        views: [
          {
            path: "/sms/sent",
            name: "Sent SMS",
            mini: "SS",
            component: Sent
          },
          {
            path: "/sms/received",
            name: "Received SMS",
            mini: "RS",
            component: Received
          }
        ]
      },
    { path: "/user", name: "User", icon: Person, component: User },
    { path: "/edit_user/:id", name: "Edit User", icon: Person, not_sidebar: true, component: EditUser },
    { path: "/change_password", name: "Change Password", icon: Person, not_sidebar: true, component: ChangePassword }
];
export default dashRoutes;
