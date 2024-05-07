import {sendDataToReducer} from '../../helpers/CommonHelpers'
import {
    getAdjustmentTypeListService,
    getAllApprovalListService,
    getAlLRequestsListService,
} from '../../services/Services'
import {
    SET_ADJUSTMENT_TYPE,
    SET_APPROVAL_LIST,
    SET_REQUEST_LIST,
} from '../reducers/RequestApprovalReducer'

// Get Adjustment Type
export const getAdjustmentTypeAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getAdjustmentTypeListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_ADJUSTMENT_TYPE, res?.data)
                resolve(res?.data)
            })
            .catch((error) => {
                reject(error)
            })
    })

// Get Request List
export const getRequestListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getAlLRequestsListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_REQUEST_LIST, res?.data)
                resolve(res?.data)
            })
            .catch((error) => {
                reject(error)
            })
    })

// Get Approval List
export const getApprovalListAction =
    (page = 1, type, filter) =>
    (dispatch) =>
        new Promise((resolve, reject) => {
            getAllApprovalListService(page, type, filter)
                .then((res) => {
                    sendDataToReducer(dispatch, SET_APPROVAL_LIST, res?.data)
                    resolve(res?.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
