import React from "react";
import { bindActionCreators } from 'redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";

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
import * as UserActions from '../../store/actions/user/user.jsx';
import * as CommonActions from '../../store/actions/common/common.jsx';
import config from '../../store/config';
import { connect } from "react-redux";



const mapDispatchToProps = (dispatch) => {
    return ({
        authActions: bindActionCreators(AuthActions, dispatch),
        commonActions: bindActionCreators(CommonActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch)
    });
}

class EditUser extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            name: "",
            email: "",
            role: 0,
            status: 0
        };

        this.handleInput = this.handleInput.bind(this)
        this.onClickStart = this.onClickStart.bind(this)
    }

    componentDidMount() {
        this.props.userActions.getUser(this.props.match.params.id).then(res => {
            this.setState({
                id: res.id,
                name: res.name,
                email: res.email,
                role: res.role,
                status: res.status
            })
        }).catch(err => {
            this.props.commonActions.alert('danger', err.data.message)
        })
    }

    handleInput(key, value) {
        this.setState({
            [key]: value
        })
    }

    onClickStart() {
        if (this.state.name=="" || this.state.email=="") {
            this.props.commonActions.alert('danger', 'Inputs are not valid.');
        } else {
            let obj = {
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                role: this.state.role,
                status: this.state.status
            }
            this.props.userActions.editUser(obj).then(res => {
                if (res.success) {
                    this.props.commonActions.alert('success', res.message)
                    this.props.userActions.getUsers()
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
                                <Edit />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Edit User</h4>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <CustomInput
                                    labelText="Name"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        value: this.state.name,
                                        onChange: e => this.handleInput('name', e.target.value)
                                    }}
                                />
                                <CustomInput
                                    labelText="Email"
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "email",
                                        value: this.state.email,
                                        onChange: e => this.handleInput('email', e.target.value)
                                    }}
                                />
                                <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel id="label-role">Role</InputLabel>
                                    <Select
                                        labelId="label-role"
                                        className={classes.formControl}
                                        value={this.state.role}
                                        onChange={(e) => this.handleInput('role', e.target.value)}
                                    >
                                        <MenuItem value={config.ROLE_SALER}>User</MenuItem>
                                        <MenuItem value={config.ROLE_ADMIN}>Admin</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel id="label-status">Status</InputLabel>
                                    <Select
                                        labelId="label-status"
                                        className={classes.formControl}
                                        value={this.state.status}
                                        onChange={(e) => this.handleInput('status', e.target.value)}
                                    >
                                        <MenuItem value={config.USER_STATUS_VALID}>Allowed</MenuItem>
                                        <MenuItem value={config.USER_STATUS_INVALID}>Stopped</MenuItem>
                                    </Select>
                                </FormControl>
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

export default connect(null, mapDispatchToProps)(withStyles(regularFormsStyle)(EditUser));