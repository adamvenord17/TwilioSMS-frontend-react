import buttonGroupStyle from "assets/jss/material-dashboard-pro-react/buttonGroupStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { defaultFont } from "assets/jss/material-dashboard-pro-react.jsx";
import extendedFormsStyle from "./extendedFormsStyle.jsx";

const sentStyle = theme => ({
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  ...extendedFormsStyle,
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    fontSize: "18px"
  },
  cardHeader: {
    zIndex: "3"
  },
  cardSubtitle: {
    ...defaultFont,
    color: "#999999",
    fontSize: "14px",
    margin: "0 0 10px"
  },
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  left: {
    textAlign: "left"
  },
  description: {
    maxWidth: "150px"
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px"
    }
  },
  actionButtonRound: {
    width: "auto",
    height: "auto",
    minWidth: "auto"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  modalSectionTitle: {
    marginTop: "30px"
  },
  messageDialog: {
    minWidth: "300px"
  },
  limitedCell: {
    width: "700px !important"
  },
  ...modalStyle(theme)
});

export default sentStyle;
