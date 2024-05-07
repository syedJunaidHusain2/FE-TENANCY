import {isUserManagerSelector, isUserSuperAdminSelector} from './AuthSelectors'

export const getAdjustmentTypeSelector = (state) => {
    const isManager = isUserManagerSelector(state)
    const isAdmin = isUserSuperAdminSelector(state)
    if (isManager || isAdmin) return state?.requestApproval?.adjustmentType ?? []
    else return state?.requestApproval?.adjustmentType?.filter((item) => item?.id != 5)
}
export const getApprovalListSelector = (state) => state?.requestApproval?.approvalList ?? []
export const getRequestListSelector = (state) => state?.requestApproval?.requestList ?? []
