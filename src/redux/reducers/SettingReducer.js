import {createSlice} from '@reduxjs/toolkit'

export const SettingInitialState = {
    flag: true,
    companyProfile: null,
    payFrequencyType: [],
    payFrequencySetting: [],
    state_city: [],
    allStatesWithOffices: [],
    usedState: [],
    documentTypes: [],
    costCenterList: [],
    companySetting: null,
    reconciliationSchedule: [],
    positions: [],
    departments: [],
    allLocations: [],
    onBoardingConfigurations: [],
    costTracking: [],
    parentCostCenterList: [],
    parentChildCostCenterList: [],
    setters: [],
    closers: [],
    managers: [],
    positionSetting: null,
    positionMainRoles: [],
    departmentWithPosition: [],
    weeklyPayPeriod: [],
    monthlyPayPeriod: [],
    companyOverrideSetting: null,
}

const SettingSlice = createSlice({
    name: 'setting',
    initialState: SettingInitialState,
    reducers: {
        SET_COMPANY_PROFILE: (state, action) => {
            state.companyProfile = action.payload
        },
        SET_RECONCILIATION: (state, action) => {
            state.flag = action.payload
        },
        SET_USED_STATE: (state, action) => {
            state.usedState = action.payload
        },
        SET_STATE_CITY: (state, action) => {
            state.state_city = action.payload
        },
        SET_ALL_STATES_WITH_OFFICES: (state, action) => {
            state.allStatesWithOffices = action.payload
        },
        SET_USERACTIVE: (state, action) => {
            state.flag = action.payload
        },
        SET_PAY_FREQUENCY_TYPE: (state, action) => {
            state.payFrequencyType = action.payload
        },
        SET_PAY_FREQUENCY_SETTING: (state, action) => {
            state.payFrequencySetting = action.payload
        },
        SET_WEEKLY_PAY_PERIOD: (state, action) => {
            state.weeklyPayPeriod = action.payload
        },
        SET_MONTHLY_PAY_PERIOD: (state, action) => {
            state.monthlyPayPeriod = action.payload
        },
        SET_DOCUMENT_TYPES: (state, action) => {
            state.documentTypes = action.payload
        },
        SET_COST_CENTER_LIST: (state, action) => {
            state.costCenterList = action.payload
        },
        SET_COMPANY_SETTING: (state, action) => {
            state.companySetting = action.payload
        },
        SET_COMPANY_OVERRIDE_SETTING: (state, action) => {
            state.companyOverrideSetting = action.payload
        },
        SET_RECONCIALIATION_SCHEDULE: (state, action) => {
            state.reconciliationSchedule = action.payload
        },
        SET_POSITIONS: (state, action) => {
            state.positions = action.payload
        },
        SET_DEPARTMENTS: (state, action) => {
            state.departments = action.payload
        },
        SET_ALL_LOCATIONS: (state, action) => {
            state.allLocations = action.payload
        },
        SET_COST_TRACKING: (state, action) => {
            state.costTracking = action.payload
        },
        SET_PARENT_COST_CENTER_LIST: (state, action) => {
            state.parentCostCenterList = action.payload
        },
        SET_SETTERS: (state, action) => {
            state.setters = action.payload
        },
        SET_CLOSERS: (state, action) => {
            state.closers = action.payload
        },
        SET_POSITION_SETTING: (state, action) => {
            state.positionSetting = action.payload
        },
        SET_MANAGERS: (state, action) => {
            state.managers = action.payload
        },
        SET_PARENT_CHILD_COST_CENTER_LIST: (state, action) => {
            state.parentChildCostCenterList = action.payload
        },
        SET_ONBORDING_CONFIGURATION: (state, action) => {
            state.onBoardingConfigurations = action.payload
        },
        SET_POSITION_MAIN_ROLES: (state, action) => {
            state.positionMainRoles = action.payload
        },
        SET_DEPARTMENT_WITH_POSITION: (state, action) => {
            state.departmentWithPosition = action.payload
        },
    },
})

const {actions, reducer: SettingReducer} = SettingSlice

export const {
    SET_FLAG,
    SET_STATE_CITY,
    SET_RECONCILIATION,
    SET_USERACTIVE,
    SET_PAY_FREQUENCY_TYPE,
    SET_PAY_FREQUENCY_SETTING,
    SET_DOCUMENT_TYPES,
    SET_POSITION_SETTING,
    SET_COST_CENTER_LIST,
    SET_COMPANY_SETTING,
    SET_COMPANY_OVERRIDE_SETTING,
    SET_RECONCIALIATION_SCHEDULE,
    SET_POSITIONS,
    SET_DEPARTMENTS,
    SET_ALL_LOCATIONS,
    SET_COST_TRACKING,
    SET_PARENT_COST_CENTER_LIST,
    SET_PARENT_CHILD_COST_CENTER_LIST,
    SET_CLOSERS,
    SET_SETTERS,
    SET_MANAGERS,
    SET_USED_STATE,
    SET_ONBORDING_CONFIGURATION,
    SET_POSITION_MAIN_ROLES,
    SET_COMPANY_PROFILE,
    SET_DEPARTMENT_WITH_POSITION,
    SET_ALL_STATES_WITH_OFFICES,
    SET_WEEKLY_PAY_PERIOD,
    SET_MONTHLY_PAY_PERIOD,
} = actions

export default SettingReducer
