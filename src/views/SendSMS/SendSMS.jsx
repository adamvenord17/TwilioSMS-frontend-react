import React from 'react';
import { bindActionCreators } from 'redux';

import Sms from "@material-ui/icons/Sms";
import classes from 'classnames';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import * as CommonActions from '../../store/actions/common/common.jsx';
import * as SMSActions from '../../store/actions/sms/sms.jsx';
import config from '../../store/config';
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return ({
        commonActions: bindActionCreators(CommonActions, dispatch),
        smsActions: bindActionCreators(SMSActions, dispatch)
    });
}

class SendSMS extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            str_phone_numbers:'',
            arr_phone_numbers: [],
            message: ''
        };

        this.handleInput = this.handleInput.bind(this)
        this.onClickStart = this.onClickStart.bind(this)
        this.onClearPhoneNumbers = this.onClearPhoneNumbers.bind(this)
    }

    handleInput(key, value) {
        if(key == "str_phone_numbers") {
            let arr_phone_numbers = value.split(/\r?\n/);
            if(arr_phone_numbers.length > 25) {
                this.props.commonActions.alert('warning', "You can send SMS up to 25 phone numbers at once.")
            } else {
                this.setState({
                    str_phone_numbers: value,
                    arr_phone_numbers: arr_phone_numbers
                })
            }
        } else {
            this.setState({
                [key]: value
            })
        }
    }

    onClickStart() {
        if (this.state.phone == [] || this.state.message == "") {
            this.props.commonActions.alert('danger', 'Inputs are not valid.');
        } else {
            let obj = {
                phone: this.state.arr_phone_numbers,
                message: this.state.message
            }
            this.props.smsActions.sendSMS(obj).then(res => {
                if (res.success) {
                    this.props.commonActions.alert('success', res.message)
                } else {
                    this.props.commonActions.alert('danger', res.message)
                }

            }).catch(err => {
                this.props.commonActions.alert('danger', err.data.message)
            })
        }
    }

    onClearPhoneNumbers() {
        this.setState({
            str_phone_numbers: '',
            arr_phone_numbers: []
        })
    }

    render() {
        
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Sms />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Send SMS</h4>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Phone Numbers"
                                            id="phone_number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 25,
                                                value: this.state.str_phone_numbers,
                                                onChange: e => this.handleInput('str_phone_numbers', e.target.value)
                                            }}
                                        />
                                        <Button
                                            onClick={this.onClearPhoneNumbers}
                                        >
                                            Clear Phone Numbers
                                        </Button>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Message"
                                            id="message"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 25,
                                                value: this.state.message,
                                                onChange: e => this.handleInput('message', e.target.value)
                                            }}
                                        />
                                        
                                        <Button
                                            color="rose"
                                            onClick={this.onClickStart}
                                        >
                                            Send
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}

export default connect(null, mapDispatchToProps)(SendSMS);