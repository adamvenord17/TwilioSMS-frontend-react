import { SMS } from '../../types'
import AUTHAPI from '../AUTHAPI'



export const sendSMS = (obj) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: `/sms/send`,
            data: obj
        }

        return AUTHAPI(data).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    }
}

export const getSent = (obj = null) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/sms/get_sent',
            data: obj
        }

        return AUTHAPI(data).then(res => {
            dispatch({
                type: SMS.SET_SMS_SENT,
                records: formatSMS(res.data.records),
                totalCount: res.data.totalCount
            })
        }).catch(err => {
            return err
        })
    }
}

export const getReceived = (obj = null) => {
    return (dispatch) => {
        let data = {
            method: 'post',
            url: '/sms/get_received',
            data: obj
        }

        return AUTHAPI(data).then(res => {
            dispatch({
                type: SMS.SET_SMS_RECEIVED,
                records: formatSMS(res.data.records),
                totalCount: res.data.totalCount
            })
        }).catch(err => {
            return err
        })
    }
}

function formatSMS(arr_sms) {
    let arr_formated = arr_sms.map(sms => {
        if(sms.message) {
            sms.short_message = sms.message.substring(0, 100) + (sms.message.length > 70 ? "..." : "")
        } else {
            sms.short_message = ""
        }
        
        sms.created_at = makeDateStringFromDateTimeServerFormat(sms.created_at);
        return sms;
    });
    return arr_formated;
}

const makeDateStringFromDateTimeServerFormat = (dateStr) => {
    let tempList = dateStr.split('T')
    dateStr = tempList[0]
    let dateList = dateStr.split('-')
    let year = dateList[0]
    let month = dateList[1]
    let date = dateList[2]

    let timeStr = tempList[1]
    let timeList = timeStr.split('.')
    timeStr = timeList[0]
    timeList = timeStr.split(':')
    let hours = timeList[0]
    let minutes = timeList[1]
    let seconds = timeList[2]

    let datetime = new Date(Date.UTC(year, (month - 1), date, hours, minutes, seconds))
    
    let localDateString = datetime.toString().substring(0, 24)
    
//    let retString = `${month}/${date}/${year} ${hours}:${minutes}:${seconds}`
    return localDateString
  }
  