import {sendDataToReducer} from '../../helpers/CommonHelpers'
import {
    getPermissionGroupListService,
    getPermissionPoliciesListService,
    groupGroupPolicyListService,
} from '../../services/Services'
import {
    SET_PERMISSION_GROUP_LIST,
    SET_PERMISSION_GROUP_POLICY_LIST,
    SET_PERMISSION_POLICIES_LIST,
} from '../reducers/PermissionsReducer'

// Get Group List
export const getPermissionGroupListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPermissionGroupListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_PERMISSION_GROUP_LIST, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Policies List
export const getPermissionPoliciesListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPermissionPoliciesListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_PERMISSION_POLICIES_LIST, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get PermissionPolicies List
export const getPermissionGroupPolicyListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        groupGroupPolicyListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_PERMISSION_GROUP_POLICY_LIST, res?.data)
                resolve(res)
            })
            .catch(reject)
    })
