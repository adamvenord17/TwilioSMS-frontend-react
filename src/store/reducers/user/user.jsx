import { USER } from '../../types';

const initState = {
    users: null
}

const UserReducer = (state = initState, action) => {
    const {type} = action;

    switch(type) {
        case USER.SET_USER_LIST:
            return {
                ...state,
                users: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default UserReducer;