import React from "react";
import { bindActionCreators } from 'redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import VpnKey from "@material-ui/icons/VpnKey";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import * as AuthActions from '../../store/actions/auth/auth.jsx';
import * as CommonActions from '../../store/actions/common/common.jsx';
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return ({
        authActions: bindActionCreators(AuthActions, dispatch),
        commonActions: bindActionCreators(CommonActions, dispatch)
    });
}

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            password_old: "",
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
        if ( this.state.password == '' || this.state.password_old == '' || this.state.password_confirmation == '') {
            this.props.commonActions.alert('danger', 'Inputs are not valid.');
        } else {
            let obj = {
                password_old: this.state.password_old,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
            this.props.authActions.changePassword(obj).then(res => {
                if(res.success) {
                    this.props.commonActions.alert('success', res.message)
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
            <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <VpnKey />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}></h4>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <CustomInput
                                    labelText="Old Password"
                                    id="password"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "password",
                                        value: this.state.password_old,
                                        onChange: e => this.handleInput('password_old', e.target.value)
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
                                        value: this.state.password,
                                        onChange: e => this.handleInput('password', e.target.value)
                                    }}
                                />
                                <CustomInput
                                    labelText="Password Confirmation"
                                    id="password"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "password",
                                        value: this.state.password_confirmation,
                                        onChange: e => this.handleInput('password_confirmation', e.target.value)
                                    }}
                                />

                                <Button 
                                    color="rose"
                                    onClick={this.onClickStart}
                                >
                                    Submit
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}

export default connect(null, mapDispatchToProps)(withStyles(regularFormsStyle)(ChangePassword));