import { AUTH, USER } from '../../types';

const initState = {
    is_authed: null,
    profile: null,
}

const AuthReducer = (state = initState, action) => {
    const {type} = action;

    switch(type) {
        case USER.SIGNED_IN:
            return {
                ...state,
                is_authed: true
            }
        case USER.SET_PROFILE:
            return {
                ...state,
                profile: action.payload.profile
            }
        case USER.SIGNED_OUT:
            return {
                ...state,
                is_authed: false,
                profile: null
            }
        default:
            return {
                ...state
            }
    }

}

export default AuthReducer;