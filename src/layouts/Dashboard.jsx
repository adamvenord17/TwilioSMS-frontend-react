import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import CustomAlert from "components/CustomAlert/CustomAlert.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

import * as CommonActions from '../store/actions/common/common';
import * as AuthActions from '../store/actions/auth/auth';
import * as UserActions from '../store/actions/user/user';
import config from '../store/config';
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return ({
        is_authed: state.auth.is_authed,
        profile: state.auth.profile
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        commonActions: bindActionCreators(CommonActions, dispatch),
        authActions: bindActionCreators(AuthActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch),
    })
}

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
            if (prop.collapse)
                return prop.views.map((prop, key) => {
                    return (
                        <Route path={prop.path} component={prop.component} key={key} />
                    );
                });
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

var ps;


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }

        if(!window.localStorage.getItem('accessToken')) {
            this.props.history.push('/auth/login')
        }

        this.props.authActions.getUserProfile()
        this.props.userActions.getUsers()

        window.addEventListener("resize", this.resizeFunction);

        
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
        window.removeEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    getRoute() {
        return this.props.location.pathname !== "/maps/full-screen-maps";
    }
    sidebarMinimize() {
        this.setState({ miniActive: !this.state.miniActive });
    }
    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }
    render() {
        const { classes, ...rest } = this.props;
        const mainPanel =
            classes.mainPanel +
            " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                    navigator.platform.indexOf("Win") > -1
            });
        return (
            <div className={classes.wrapper}>
                <CustomAlert />
                <Sidebar
                    routes={dashboardRoutes}
                    logoText={"sms brick"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    bgColor="black"
                    miniActive={this.state.miniActive}
                    profile={this.props.profile}
                    {...rest}
                />
                <div className={mainPanel} ref="mainPanel">
                    <Header
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        routes={dashboardRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>{switchRoutes}</div>
                        </div>
                    ) : (
                            <div className={classes.map}>{switchRoutes}</div>
                        )}
                    {this.getRoute() ? <Footer fluid /> : null}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Dashboard));
