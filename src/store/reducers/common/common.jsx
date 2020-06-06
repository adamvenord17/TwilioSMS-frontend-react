import { COMMON } from '../../types';

const initState = {
    alertFunc: null,
}

const CommonReducer = (state = initState, action) => {
    const {type} = action;

    switch(type){
        case COMMON.SET_ALERT_FUNC:
            return {
                ...state,
                alertFunc: action.func
            }
        case COMMON.SHOW_ALERT:
            state.alertFunc(action.alertType, action.alertMessage);
            return {
                ...state
            }
        default: 
            return state
    }
}

export default CommonReducer;