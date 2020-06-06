import { USER } from '../../types'
import AUTHAPI from '../AUTHAPI'

export const getUsers = () => {
    return (dispatch) => {
        let data = {
            method: 'get',
            url: '/user'
        }

        return AUTHAPI(data).then(res => {
            dispatch({
                type: USER.SET_USER_LIST,
                payload: res.data
            })
        }).catch(err => {
            return err
        })
    }
}

export const getUser = (id) => {
    return (dispatch) => {
        let data = {
            method: 'get',
            url: `/user/${id}/detail`
        }

        return AUTHAPI(data).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    }
}

export const editUser = (obj) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: `/user/${obj.id}/update`,
            data: obj
        }

        return AUTHAPI(data).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: `/user/${id}/delete`
        }

        return AUTHAPI(data).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    }
}