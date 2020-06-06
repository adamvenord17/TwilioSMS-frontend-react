import { SMS } from '../../types';

const initState = {
    sms_sent: null,
    sms_sent_count: 0,
    sms_received: null,
    sms_received_count: 0
}

const SMSReducer = (state = initState, action) => {
    const {type} = action;
    switch(type) {
        case SMS.SET_SMS_SENT:
            return {
                ...state,
                sms_sent: action.records,
                sms_sent_count: action.totalCount
            }
        case SMS.SET_SMS_RECEIVED:
            return {
                ...state,
                sms_received: action.records,
                sms_received_count: action.totalCount
            }
        default:
            return {
                ...state
            }
    }
}

export default SMSReducer;