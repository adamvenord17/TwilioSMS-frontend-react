import { USER } from '../../types'
import API from '../API'
import AUTHAPI from '../AUTHAPI'

export const signin = (obj) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/login',
            data: obj
        }

        return API(data).then(res => {
            if(res.data.success) {
                window.localStorage.setItem('accessToken', res.data.access_token)
                dispatch({
                    type: USER.SIGNED_IN,
                    payload: res.data
                })
                return res.data
            } else {
                return res.data
            }
            
        }).catch(err => {
            throw err
        })
    }
}

export const getUserProfile = () => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/profile'
        }
        
        return AUTHAPI(data).then(res => {
            if(res.data.success) {
                dispatch({
                    type: USER.SET_PROFILE,
                    payload: res.data
                })
                return res.data
            } else {
                return res.data
            }
        })
    }
}

export const register = (obj) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/register',
            data: obj
        }

        return API(data).then(res => {
            return res.data
        }).catch(err => {
            throw err
        })
    }
}

export const changePassword = (obj) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/user/change_password',
            data: obj
        }

        return AUTHAPI(data).then(res => {
            return res.data
        }).catch(err => {
            throw err
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/logout'
        }
        return AUTHAPI(data).then(() => {
            window.localStorage.removeItem('accessToken');
            dispatch({ type: USER.SIGNED_OUT })
        }).catch(err => {
            throw err
        })
    }
}