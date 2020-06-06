import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import * as AuthActions from '../../store/actions/auth/auth.jsx';
import * as CommonActions from '../../store/actions/common/common.jsx';
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return ({
        authActions: bindActionCreators(AuthActions, dispatch),
        commonActions: bindActionCreators(CommonActions, dispatch)
    });
}

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        };

        this.handleInput = this.handleInput.bind(this)
        this.onClickStart = this.onClickStart.bind(this)
    }

    handleInput(key, value) {
        this.setState({
            [key]: value
        })
    }

    onClickStart() {
        console.log('button clicked.');
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (this.state.name == '' || reg.test(this.state.email) === false || this.state.password == '' || this.state.password_confirmation != this.state.password) {
            this.props.commonActions.alert('danger', 'Inputs are not valid.');
        } else {
            let obj = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
            this.props.authActions.register(obj).then(res => {
                if(res.success) {
                    let message = 'Request for registeration has been sent. Please wait until the administrator allows your registration.';
                    this.props.commonActions.alert('success', message)
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
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes.cardSignup}>
                            <h2 className={classes.cardTitle}>Register</h2>
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem xs={12}>
                                        <form className={classes.form}>
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Face className={classes.inputAdornmentIcon} />
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "First Name...",
                                                    value: this.state.name,
                                                    onChange: e => this.handleInput('name', e.target.value)
                                                }}
                                            />
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Email className={classes.inputAdornmentIcon} />
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Email...",
                                                    value: this.state.email,
                                                    onChange: e => this.handleInput('email', e.target.value)
                                                }}
                                            />
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Icon className={classes.inputAdornmentIcon}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    ),
                                                    type: "password",
                                                    placeholder: "Password...",
                                                    value: this.state.password,
                                                    onChange: e => this.handleInput('password', e.target.value)
                                                }}
                                            />
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Icon className={classes.inputAdornmentIcon}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    ),
                                                    type: "password",
                                                    placeholder: "Password Confirmation...",
                                                    value: this.state.password_confirmation,
                                                    onChange: e => this.handleInput('password_confirmation', e.target.value)
                                                }}
                                            />
                                            <div className={classes.center}>
                                                <Button 
                                                    round 
                                                    color="primary"
                                                    onClick={this.onClickStart}
                                                >
                                                    Get started
                                                </Button>
                                            </div>
                                        </form>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(registerPageStyle)(RegisterPage));
