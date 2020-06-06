import { COMMON } from '../../types'
import AUTHAPI from '../AUTHAPI'

export const setAlertFunc = (func) => {
    return (dispatch) => {
        dispatch({
            type: COMMON.SET_ALERT_FUNC,
            func: func
        })
    }
}

export const alert = (alertType, alertMessage) => {
    return (dispatch) => {
        dispatch({
            type: COMMON.SHOW_ALERT,
            alertType: alertType,
            alertMessage: alertMessage
        })
    }
}
