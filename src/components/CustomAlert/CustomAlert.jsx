import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Snackbar from '../Snackbar/Snackbar.jsx';
import * as CommanAactions from '../../store/actions/common/common';

const mapStateToProps = (state) => {
    return ({
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        commanAactions: bindActionCreators(CommanAactions, dispatch)
    })
}

class CustomAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            place: "tr",
            type: "info",
            message: "",
            show: false
        }
    }

    componentDidMount() {
        const alert = (type, message) => {
            this.setState({
                type: type,
                message: message,
                show: true
            });

            setTimeout(
                function() {
                    this.setState({show: false})
                }.bind(this), 5000
            );
        }

        this.props.commanAactions.setAlertFunc(alert);
    }

    render() {
        return (
            <Snackbar
                place={this.state.place}
                color={this.state.type}
                message={this.state.message}
                open={this.state.show}
                closeNotification={() => this.setState({show: false})}
                close
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert);