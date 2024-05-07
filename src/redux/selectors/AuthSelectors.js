import {ROLES} from '../../accessRights/AccessRightsConstants'
import {getUserPositionMetaData} from '../../helpers/CommonHelpers'
import {MAIN_POSITTIONS_ID} from '../../constants/constants'
export const userHasAdminAccess = (state) =>
    state?.auth?.userData?.access_rights?.some(
        (item) => item?.name == ROLES.administrator.roleValue
    )
export const isUserManagerSelector = (state) =>
    !state?.auth?.userData?.is_super_admin && state?.auth?.userData?.is_manager == 1 ? true : false

export const isUserSuperAdminSelector = (state) => state?.auth?.userData?.is_super_admin

export const isUserCloserOrSetterSelector = (state) => {
    const isManager = isUserManagerSelector(state)
    const position_id = state?.auth?.userData?.position_id?.toString()
    return (
        !isManager &&
        [MAIN_POSITTIONS_ID.closer, MAIN_POSITTIONS_ID.setter].includes(position_id?.toString())
    )
}

export const isUserCloserSelector = (state) => {
    const isManager = isUserManagerSelector(state)
    const position_id = state?.auth?.userData?.position_id?.toString()
    return !isManager && [MAIN_POSITTIONS_ID.closer].includes(position_id?.toString())
}

export const isUserSetterSelector = (state) => {
    const isManager = isUserManagerSelector(state)
    const position_id = state?.auth?.userData?.position_id?.toString()
    return !isManager && [MAIN_POSITTIONS_ID.setter].includes(position_id?.toString())
}

export const isUserOnboardProcessDoneSelector = (state) =>
    state?.auth?.userData?.onboardProcess == 1 ? true : false
export const getTokenSelector = (state) => state?.auth?.token
export const getAccessRightsSelector = (state) => state?.auth?.accessRights
export const getActiveRoleSelector = (state) => state?.auth?.activeRole ?? null
export const getAccessRolesSelector = (state) =>
    state?.auth?.userData?.access_rights?.map((item) => item?.name)
export const getIsLoggedInSelector = (state) => state?.auth?.isLoggedIn
export const getUserDataSelector = (state) => {
    return {
        ...state?.auth?.userData,
        name: `${state?.auth?.userData?.first_name} ${state?.auth?.userData?.last_name}`,
    }
}
export const getUserRolesSelector = (state) =>
    state?.auth?.userData?.access_rights?.length > 0
        ? state?.auth?.userData?.access_rights?.map((item) => item?.name)
        : []

export const getUserMainPositionSelector = (state) => {
    const userData = getUserDataSelector(state)
    return getUserPositionMetaData(userData)
}

export const getSetupReconciliationSelector = (state) => state?.auth?.reconciliation
export const getActiveSelector = (state) => state?.auth?.activeuser
