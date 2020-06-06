import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import SearchBox from "./SearchBox";

// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

import Pagination from '@material-ui/lab/Pagination';

import sentStyle from "assets/jss/material-dashboard-pro-react/views/SentStyle.jsx";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Close from "@material-ui/icons/Close";
import Subject from "@material-ui/icons/Subject";

import * as CommonActions from '../../store/actions/common/common.jsx';
import * as SMSActions from '../../store/actions/sms/sms.jsx';
import * as UserActions from '../../store/actions/user/user.jsx';

function Transition(props) {
    return <Slide direction="down" {...props} />;
}


const mapStateToProps = (state) => {
    return ({
        users: state.user.users,
        profile: state.auth.profile,
        sms_sent: state.sms.sms_sent,
        sms_received: state.sms.sms_received,
        sms_sent_count: state.sms.sms_sent_count,
        sms_received_count: state.sms.sms_received_count
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        userActions: bindActionCreators(UserActions, dispatch),
        commonActions: bindActionCreators(CommonActions, dispatch),
        smsActions: bindActionCreators(SMSActions, dispatch)
    })
}

class Received extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            user: null,
            phone_number: "",
            message: "",
            pageno: 1,
            count_per_page: 10,

            sms:null,
            isModalOpen: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.smsActions.getReceived();
    }

    handleInput(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    showMessage(sms) {
        this.setState({
            sms: sms,
            isModalOpen: true
        });
    }

    handlePagination(event, value) {
        this.setState({
            pageno: value
        })
        this.props.smsActions.getReceived({
            phone_number: this.state.phone_number,
            message: this.state.message,
            pageno: value,
            count_per_page: this.state.count_per_page
        })
    }

    onClickSearch() {
        this.props.smsActions.getReceived({
            phone_number: this.state.phone_number,
            message: this.state.message,
            pageno: this.state.pageno,
            count_per_page: this.state.count_per_page
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                        </CardHeader>
                        <CardBody>
                            <SearchBox
                                display_user={false}
                                phone_number={this.state.phone_number}
                                message={this.state.message}
                                users={this.props.users}
                                handleInput={this.handleInput}
                                onClickSearch={this.onClickSearch}
                            />
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell className={classes.center}>Phone Number</TableCell>
                                        <TableCell className={classes.limitedCell}>Message</TableCell>
                                        <TableCell className={classes.center}>Time</TableCell>
                                        <TableCell className={classes.center}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.sms_received && this.props.sms_received.length > 0 ?
                                            this.props.sms_received.map((sms, key) => (
                                                <TableRow key={key}>
                                                    <TableCell>{this.state.count_per_page * (this.state.pageno - 1) + key + 1}</TableCell>
                                                    <TableCell className={classes.center}>{sms.phone_number}</TableCell>
                                                    <TableCell className={classes.limitedCell}>{sms.short_message}</TableCell>
                                                    <TableCell className={classes.center}>{sms.created_at}</TableCell>
                                                    <TableCell className={classes.center}>
                                                        <Button color="primary" className={classes.actionButton} key={key+"0"} onClick={()=>this.showMessage(sms)}>
                                                            <Subject className={classes.icon} />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            : <TableRow><TableCell className={classes.center} colSpan={6}>No Message</TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </GridItem>
                <Pagination
                    count={Math.ceil(this.props.sms_received_count / this.state.count_per_page)}
                    page={this.state.pageno}
                    onChange={this.handlePagination}
                    color="primary"
                />

                <Dialog
                    classes={{
                        root: classes.center + " " + classes.modalRoot,
                        paper: classes.modal + " " + classes.messageDialog
                    }}
                    open={this.state.isModalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleModal}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                >
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                    >
                        <Button
                            justIcon
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="transparent"
                            onClick={this.handleModal}
                        >
                            <Close className={classes.modalClose} />
                        </Button>
                        <h4 className={classes.modalTitle}>Message</h4>
                    </DialogTitle>
                    <DialogContent
                        id="classic-modal-slide-description"
                        className={classes.modalBody}
                    >
                        <p className={classes.left}>
                            {this.state.sms? this.state.sms.message: ""}
                        </p>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                        <Button
                            onClick={this.handleModal}
                            color="danger"
                            simple
                        >
                            Close
                          </Button>
                    </DialogActions>
                </Dialog>
            </GridContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(sentStyle)(Received));