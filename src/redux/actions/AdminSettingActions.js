import {sendDataToReducer} from '../../helpers/CommonHelpers'
import {getCompanyGlobalReconciliationService} from '../../services/Services'
import {SET_FLAG, SET_RECONCILIATION, SET_USERACTIVE} from '../reducers/SettingReducer'

// Change Flag
export const changeReconcilationSettin = (flag) => (dispatch) =>
    new Promise((resolve, reject) => {
        sendDataToReducer(dispatch, SET_FLAG, flag)
    })
export const getGlobalReconciliationAction = (flag) => (dispatch) =>
    new Promise((resolve, reject) => {
        getCompanyGlobalReconciliationService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_RECONCILIATION, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

export const getUSerAciveAction = (flag) => (dispatch) =>
    new Promise((resolve, reject) => {
        getCompanyGlobalReconciliationService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_USERACTIVE, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })
