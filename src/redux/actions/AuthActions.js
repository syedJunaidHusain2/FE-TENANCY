import _ from 'lodash'
import {setGlobalAccessRights} from '../../accessRights/AccessRights'
import {ROLES} from '../../accessRights/AccessRightsConstants'
import CustomToast from '../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse, sendDataToReducer} from '../../helpers/CommonHelpers'
import {
    getCompanyProfileService,
    getCompanyProfileWithoutAuthService,
    getUserProfileService,
    loginService,
    logoutService,
    updateCompanyProfileService,
} from '../../services/Services'
import {
    SET_ACCESS_RIGHTS,
    SET_ACTIVE_ROLE,
    SET_TOKEN,
    SET_USER_DATA,
    USER_IS_LOGGED_IN,
} from '../reducers/AuthReducer'
import {getUserDataSelector} from '../selectors/AuthSelectors'
import {RESET_STORE} from '../types/ReduxTypes'
import {getPositionSettingAction} from './SettingActions'
import oneSignal from '../../onesignal/oneSignal'

// Set Active Role
export const setActiveRoleAction = (role) => (dispatch) =>
    new Promise((resolve, reject) => {
        sendDataToReducer(dispatch, SET_ACTIVE_ROLE, role)
    })

// Login
export const loginAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        loginService(body)
            .then((res) => {
                if (res?.data) {
                    sendDataToReducer(dispatch, SET_USER_DATA, {
                        ...res?.data,
                        token: res?.token,
                        lastLogin: res?.last_login,
                    })
                    oneSignal.setExternalUserId(res?.data?.id)
                    oneSignal.promptForNotificationPermission()
                    sendDataToReducer(dispatch, USER_IS_LOGGED_IN, true)
                    dispatch(setAccessRightsAction(res?.data?.access_rights))
                    const isStandardAvailable = res?.data?.access_rights?.some(
                        (item) => item?.name == ROLES.standard.roleValue
                    )
                    const isAdminAvailable = res?.data?.access_rights?.some(
                        (item) => item?.name == ROLES.administrator.roleValue
                    )
                    dispatch(
                        setActiveRoleAction(
                            res?.data?.is_super_admin
                                ? ROLES.administrator.roleValue
                                : isStandardAvailable
                                ? ROLES.standard.roleValue
                                : isAdminAvailable
                                ? ROLES.administrator.roleValue
                                : null
                        )
                    )
                    dispatch(getPositionSettingAction())
                    resolve(res?.data)
                    sendDataToReducer(dispatch, SET_TOKEN, res.token)
                } else {
                    CustomToast.error('This user have not any assigned role')
                    reject('This user have not any assigned role')
                }
            })
            .catch((error) => {
                reject(error)
                CustomToast.error(getErrorMessageFromResponse(error))
            })
    })

// Logout
export const logoutAction =
    (forceLogout = false) =>
    (dispatch) =>
        new Promise((resolve, reject) => {
            if (!forceLogout) {
                logoutService()
                    .then(() => {
                        localStorage.removeItem('token')
                        dispatch({type: RESET_STORE})
                        resolve(true)
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
            } else {
                localStorage.removeItem('token')
                dispatch({type: RESET_STORE})
                resolve(true)
            }
        })

export const setAccessRightsAction = (accessRights) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        // const state = getState()
        // const rightsData = setGlobalAccessRights(state?.auth?.userData?.access_rights)
        const rightsData = setGlobalAccessRights(accessRights)
        sendDataToReducer(dispatch, SET_ACCESS_RIGHTS, rightsData)
        resolve(true)
    })

export const getUserProfileAction = () => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const state = getState()
        const userData = getUserDataSelector(state)
        getUserProfileService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_USER_DATA, {...userData, ...res?.data})
                dispatch(setAccessRightsAction(res?.data?.access_rights))
                resolve(res?.data)
            })
            .catch(reject)
    })
