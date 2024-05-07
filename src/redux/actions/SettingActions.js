import CustomToast from '../../customComponents/customToast/CustomToast'
import {getBooleanValue, sendDataToReducer} from '../../helpers/CommonHelpers'
import {
    getAllStatesAndCitiesService,
    getCompanyGlobalReconciliationService,
    getCompanyReconciliationService,
    getCompanySettingService,
    getCostCenterDropdownService,
    getCostCenterListService,
    getDepartmentListService,
    getDocumentTypeListService,
    getParentCostCenterDropdownService,
    getPayFrequencyTypeService,
    getPositionListService,
    updateCompanySettingService,
    getSalesCloserListService,
    getSalesSetterListService,
    getUsedStateService,
    getParentChildCostCenterService,
    getPositionSettingService,
    getPayFrequencySettingService,
    getOnBoardingConfigurationService,
    getPositionDropdownService,
    getCompanyProfileService,
    getCompanyProfileWithoutAuthService,
    updateCompanyProfileService,
    getPositionByDeparmentService,
    getAllStatesWithOfficesService,
    getAllLocationListService,
    getWeeklyPayPeriodService,
    getMonthlyPayPeriodService,
    getOverridesOnTwoAccountStatusService,
} from '../../services/Services'
import {
    SET_COMPANY_SETTING,
    SET_COST_CENTER_LIST,
    SET_COST_TRACKING,
    SET_DEPARTMENTS,
    SET_DOCUMENT_TYPES,
    SET_COMPANY_PROFILE,
    SET_ALL_LOCATIONS,
    SET_PARENT_COST_CENTER_LIST,
    SET_PAY_FREQUENCY_TYPE,
    SET_POSITIONS,
    SET_RECONCIALIATION_SCHEDULE,
    SET_RECONCILIATION,
    SET_STATE_CITY,
    SET_USERACTIVE,
    SET_CLOSERS,
    SET_SETTERS,
    SET_ONBORDING_CONFIGURATION,
    SET_USED_STATE,
    SET_PARENT_CHILD_COST_CENTER_LIST,
    SET_POSITION_SETTING,
    SET_PAY_FREQUENCY_SETTING,
    SET_POSITION_MAIN_ROLES,
    SET_ALL_STATES_WITH_OFFICES,
    SET_DEPARTMENT_WITH_POSITION,
    SET_WEEKLY_PAY_PERIOD,
    SET_MONTHLY_PAY_PERIOD,
    SET_COMPANY_OVERRIDE_SETTING,
} from '../reducers/SettingReducer'
import {getUserDataSelector} from '../selectors/AuthSelectors'
import {getCompanySettingSelector, getCompanyProfileSelector} from '../selectors/SettingsSelectors'

// Get Company Setting
export const getCompanySettingAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getCompanySettingService()
            .then((res) => {
                const data = {
                    reconciliation: res?.data?.[0]?.status,
                    overrides: res?.data?.[1]?.status,
                    tier: res?.data?.[2]?.status,
                    marketing_deal: res?.data?.[3]?.status,
                    allow_manual_overrides: res?.data?.[4]?.status,
                }
                sendDataToReducer(dispatch, SET_COMPANY_SETTING, data)
                resolve(data)
            })
            .catch(reject)
    })

// Get Company Override Setting
export const getCompanyOverrideSettingAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getOverridesOnTwoAccountStatusService()
            .then((res) => {
                let data = {...res?.data}
                data.allow_manual_override_status = getBooleanValue(
                    data?.allow_manual_override_status
                )
                sendDataToReducer(dispatch, SET_COMPANY_OVERRIDE_SETTING, data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Company Profile
export const getCompanyProfileAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getCompanyProfileService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_COMPANY_PROFILE, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Company Profile Without Auth
export const getCompanyProfileWithoutAuthAction = () => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const state = getState()
        const companyProfile = getCompanyProfileSelector(state)
        getCompanyProfileWithoutAuthService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_COMPANY_PROFILE, {
                    ...companyProfile,
                    ...res?.data,
                })
                resolve(res?.data)
            })
            .catch(reject)
    })

// Update Company Profile
export const updateCompanyProfileAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        updateCompanyProfileService(body)
            .then(() => {
                dispatch(getCompanyProfileAction())
                    .then((res) => {
                        CustomToast.success('Company profile updated')
                        resolve(res)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })

// Get Position Setting
export const getPositionSettingAction = () => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const state = getState()
        const userData = getUserDataSelector(state)
        getPositionSettingService(userData?.position_id)
            .then((res) => {
                sendDataToReducer(dispatch, SET_POSITION_SETTING, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

//   Update Company Setting
export const updateCompanySettingAction = (type) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const state = getState()
        let companySetting = {...getCompanySettingSelector(state)}
        const changeStatus = !companySetting?.[type]
        companySetting[type] = changeStatus
        sendDataToReducer(dispatch, SET_COMPANY_SETTING, companySetting)
        updateCompanySettingService(type, changeStatus).then((res) => {
            resolve(res)
        })
    })

// Get Company Reconcilation Schedule
export const getCompanyReconciliationAction = () => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        getCompanyReconciliationService()
            .then((res) => {
                const data = res.data.sort((a, b) => {
                    const dateA = new Date(a?.period_from)
                    const dateB = new Date(b?.period_from)
                    return dateA - dateB
                })
                sendDataToReducer(dispatch, SET_RECONCIALIATION_SCHEDULE, data)
                resolve(res?.data)
            })
            .catch(reject)
    })

export const getAllStatesAndCitiesAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getAllStatesAndCitiesService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_STATE_CITY, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

export const getUsedStateAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getUsedStateService().then((res) => {
            sendDataToReducer(dispatch, SET_USED_STATE, res?.data)
        })
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

// Get Pay Frequency Type
export const getPayFrequencyTypeAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPayFrequencyTypeService()
            .then((res) => {
                const data =
                    res?.data?.length > 0
                        ? res?.data?.map((item) => ({name: item?.name, value: item?.id}))
                        : []
                sendDataToReducer(dispatch, SET_PAY_FREQUENCY_TYPE, data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })

// Get Pay Frequency Setting
export const getPayFrequencySettingAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPayFrequencySettingService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_PAY_FREQUENCY_SETTING, res?.frequency)
                resolve(res?.frequency)
            })
            .catch((e) => {
                reject(e)
            })
    })
// Get Weekly Pay Period
export const getWeeklyPayPeriodAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getWeeklyPayPeriodService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_WEEKLY_PAY_PERIOD, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })
// Get Weekly Pay Period
export const getMonthlyPayPeriodAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getMonthlyPayPeriodService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_MONTHLY_PAY_PERIOD, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })
// Get Document Types
export const getDocumentTypesAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getDocumentTypeListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_DOCUMENT_TYPES, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })

// Get Cost Center List
export const getCostCenterListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getCostCenterDropdownService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_COST_CENTER_LIST, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })

// Get Parent Child Cost Center List
export const getParentChildCostCenterAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getParentChildCostCenterService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_PARENT_CHILD_COST_CENTER_LIST, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })

// Get Parent Cost Center List
export const getParentCostCenterListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getParentCostCenterDropdownService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_PARENT_COST_CENTER_LIST, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })

/**
 * Positions
 */

export const getPositionsAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPositionListService()
            .then((res) => {
                const finalData = res?.data?.data?.map((item) => ({
                    ...item,
                    position_name: item?.position,
                }))
                sendDataToReducer(dispatch, SET_POSITIONS, finalData)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Locations
export const getAllLocationListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getAllLocationListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_ALL_LOCATIONS, res?.locations)
                resolve(res?.locations?.data)
            })
            .catch(reject)
    })

// Get Cost Tracking
export const getCostTrackingAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getCostCenterListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_COST_TRACKING, res?.costCenters)
                resolve(res?.costCenters)
            })
            .catch(reject)
    })

// Get Departments
export const getDepartmentsAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getDepartmentListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_DEPARTMENTS, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Setters
export const getSettersAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getSalesSetterListService()
            .then((res) => {
                let finalData = res?.data?.filter((item) => !item?.dismiss)
                finalData = finalData?.map((item) => ({
                    ...item,
                    name: `${item?.first_name} ${item?.last_name}`,
                }))
                sendDataToReducer(dispatch, SET_SETTERS, finalData)
                resolve(finalData)
            })
            .catch(reject)
    })

// Get Closers
export const getClosersAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getSalesCloserListService()
            .then((res) => {
                let finalData = res?.data?.filter((item) => !item?.dismiss)
                finalData = finalData?.map((item) => ({
                    ...item,
                    name: `${item?.first_name} ${item?.last_name}`,
                }))
                sendDataToReducer(dispatch, SET_CLOSERS, finalData)
                resolve(finalData)
            })
            .catch(reject)
    })

//OnBoarding Configuration
export const getOnBoardingConfigurationAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getOnBoardingConfigurationService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_ONBORDING_CONFIGURATION, res.data[0])
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Position Main Role
export const getPosittionMailRolesAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPositionDropdownService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_POSITION_MAIN_ROLES, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get All States With Offices
export const getAllStatesWithOfficesAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getAllStatesWithOfficesService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_ALL_STATES_WITH_OFFICES, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

export const getDepartmentWithPositionAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getPositionByDeparmentService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_DEPARTMENT_WITH_POSITION, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })
