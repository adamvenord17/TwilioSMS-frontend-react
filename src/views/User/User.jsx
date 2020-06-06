import React from "react";
import { bindActionCreators } from 'redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// material-ui icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import * as CommonActions from '../../store/actions/common/common.jsx';
import * as UserActions from '../../store/actions/user/user.jsx';
import config from '../../store/config';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return ({
        users: state.user.users,
        profile: state.auth.profile
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        userActions: bindActionCreators(UserActions, dispatch),
        commonActions: bindActionCreators(CommonActions, dispatch)
    })
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: []
        };
        this.editUser = this.editUser.bind(this);
    }
    componentDidMount() {
        if(!this.props.profile || this.props.profile.role != config.ROLE_ADMIN)
        {
            this.props.history.push('/send_sms');
        }
    }
    editUser(id) {
        this.props.history.push(`/edit_user/${id}`);
    }
    deleteUser(id) {
        if(window.confirm("Are you sure to delete this user?")) {
            this.props.userActions.deleteUser(id).then(res => {
                if(res.success) {
                    this.props.userActions.getUsers()
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
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Person />
                            </CardIcon>
                        </CardHeader>
                        <CardBody>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    this.props.users && this.props.users.length > 0 ?
                                        this.props.users.map((user, key) => (
                                            <TableRow key={key}>
                                                <TableCell>{key + 1}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role==config.ROLE_ADMIN?"Administrator":"User"}</TableCell>
                                                <TableCell>{user.status==config.USER_STATUS_VALID?"Allowed":"Stopped"}</TableCell>
                                                <TableCell>
                                                    <Button color="success" className={classes.actionButton} key={key+"0"} onClick={()=>this.editUser(user.id)}>
                                                        <Edit className={classes.icon} />
                                                    </Button>
                                                    <Button color="danger" className={classes.actionButton} key={key+"1"} onClick={()=>this.deleteUser(user.id)}>
                                                        <Close className={classes.icon} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : <TableRow><TableCell colSpan={6}>No Users</TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(extendedTablesStyle)(User));