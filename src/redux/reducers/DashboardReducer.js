import {createSlice} from '@reduxjs/toolkit'

export const dashboardInitialState = {
    payrollSummaryData: [],
    announcementData: [],
    alertData: [],
    officeSalesPeformanceData: [],
    officeSalesPeformanceGraph: [],
    smSalesReportData: [],
    smOfficePeformanceData: [],
    smOfficePeformanceTeamData: [],
    goalTrackerData: [],
    announcementCardList: [],
    alertCenterListCount: [],
    eventList: [],
    alertCenterList: [],
}
const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState: dashboardInitialState,
    reducers: {
        SET_PAYROLL_SUMMARY_DATA: (state, action) => {
            state.payrollSummaryData = action.payload
        },
        SET_ANNOUNCEMENT_DATA: (state, action) => {
            state.announcementData = action.payload
        },
        SET_ALERT_DATA: (state, action) => {
            state.alertData = action.payload
        },
        SET_OFFICE_SALES_PEFORMANCE_DATA: (state, action) => {
            state.officeSalesPeformanceData = action.payload
        },
        SET_TOP_PAYROLL_LOCATIONS: (state, action) => {
            state.topPayrollLocations = action.payload
        },
        SET_OFFICE_SALES_PEFORMANCE_GRAPH_DATA: (state, action) => {
            state.officeSalesPeformanceGraph = action.payload
        },
        SET_SM_SALES_REPORT_DATA: (state, action) => {
            state.smSalesReportData = action.payload
        },
        SET_SM_OFFICE_PEFORMANCE_DATA: (state, action) => {
            state.smOfficePeformanceData = action.payload
        },
        SET_SM_OFFICE_PEFORMANCE_TEAM_DATA: (state, action) => {
            state.smOfficePeformanceTeamData = action.payload
        },
        SET_GOAL_TRACKER_DATA: (state, action) => {
            state.goalTrackerData = action.payload
        },
        SET_EVENT_DATA: (state, action) => {
            state.eventList = action.payload
        },
        SET_ALERT_CENTER_DATA: (state, action) => {
            state.alertCenterList = action.payload
        },
        SET_ANNOUNCEMENT_CARD_DATA: (state, action) => {
            state.announcementCardList = action.payload
        },
        SET_ALERT_CENTER_DATA_COUNT: (state, action) => {
            state.alertCenterListCount = action.payload
        },
    },
})

const {actions, reducer: DashboardReducer} = DashboardSlice

export const {
    SET_PAYROLL_SUMMARY_DATA,
    SET_ANNOUNCEMENT_DATA,
    SET_ANNOUNCEMENT_CARD_DATA,
    SET_ALERT_DATA,
    SET_OFFICE_SALES_PEFORMANCE_DATA,
    SET_TOP_PAYROLL_LOCATIONS,
    SET_OFFICE_SALES_PEFORMANCE_GRAPH_DATA,
    SET_SM_SALES_REPORT_DATA,
    SET_SM_OFFICE_PEFORMANCE_DATA,
    SET_SM_OFFICE_PEFORMANCE_TEAM_DATA,
    SET_GOAL_TRACKER_DATA,
    SET_EVENT_DATA,
    SET_ALERT_CENTER_DATA,
    SET_ALERT_CENTER_DATA_COUNT,
} = actions

export default DashboardReducer
