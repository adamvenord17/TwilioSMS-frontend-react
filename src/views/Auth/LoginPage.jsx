import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import * as AuthActions from '../../store/actions/auth/auth.jsx';
import * as CommonActions from '../../store/actions/common/common.jsx';
import config from '../../store/config';
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return ({
        authActions: bindActionCreators(AuthActions, dispatch),
        commonActions: bindActionCreators(CommonActions, dispatch)
    });
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            email: "",
            password: ""
        };

        this.handleInput = this.handleInput.bind(this)
        this.onClickStart = this.onClickStart.bind(this)
    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        if(this.props.match.path == '/auth/logout') {
            this.props.authActions.logout().then((res) => {
                this.props.commonActions.alert('success', 'Logout success!');
            }).catch(err => {
                this.props.commonActions.alert('danger', 'Logout failed!');
            })
        }
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
    }
    componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }

    handleInput(key, value) {
        this.setState({
            [key]: value
        })
    }

    onClickStart() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(this.state.email) === false || this.state.password == '') {
            this.props.commonActions.alert('danger', 'Inputs are not valid.');
        } else {
            let obj = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.authActions.signin(obj).then(res => {
                if(res.success) {
                    if(res.user.status == config.USER_STATUS_VALID) {
                        this.props.history.push('/send_sms')
                    } else {
                        this.props.commonActions.alert('danger', 'Please wait until the administrator allows your account')
                    }
                } else {
                    this.props.commonActions.alert('danger', res.message)
                }
                
            }).catch(err => {
                this.props.commonActions.alert('danger', err.data.message)
            })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="rose"
                                >
                                    <h4 className={classes.cardTitle}>Log in</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="Email..."
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            ),
                                            value: this.state.email,
                                            onChange: e => this.handleInput('email', e.target.value)
                                        }}
                                        
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputAdornmentIcon}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>
                                            ),
                                            value: this.state.password,
                                            onChange: e => this.handleInput('password', e.target.value)
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <Button
                                        color="rose"
                                        simple size="lg"
                                        block
                                        onClick={this.onClickStart}
                                    >
                                        Let's Go
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
