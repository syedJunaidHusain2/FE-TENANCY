import {useSelector} from 'react-redux'
import {sendDataToReducer} from '../../helpers/CommonHelpers'
import {
    getAlertCenterListService,
    getAlertListService,
    getAnnouncementCardDataService,
    getAnnouncementListService,
    getDashboardAlertListService,
    getDashboardHiringAlertListService,
    getDashboardPayrollSummaryService,
    getGoalTrackerDataService,
    getOfficeSalesPerformanceDataService,
    getOfficeSalesPerformanceGraphService,
    getSmDashboardSalesReportService,
    getSmOfficeEventListService,
    getSmOfficePeformanceTeamService,
    getSmOfficeSalesPerformanceService,
    getTopPayrollLocationsService,
} from '../../services/Services'
import {
    SET_ALERT_CENTER_DATA,
    SET_ALERT_CENTER_DATA_COUNT,
    SET_ALERT_DATA,
    SET_ANNOUNCEMENT_CARD_DATA,
    SET_ANNOUNCEMENT_DATA,
    SET_EVENT_DATA,
    SET_GOAL_TRACKER_DATA,
    SET_OFFICE_SALES_PEFORMANCE_DATA,
    SET_OFFICE_SALES_PEFORMANCE_GRAPH_DATA,
    SET_PAYROLL_SUMMARY_DATA,
    SET_SM_OFFICE_PEFORMANCE_DATA,
    SET_SM_OFFICE_PEFORMANCE_TEAM_DATA,
    SET_SM_SALES_REPORT_DATA,
    SET_TOP_PAYROLL_LOCATIONS,
} from '../reducers/DashboardReducer'

// Get Payroll Summary
export const getDashboardPayrollSummaryDataAction = (filter) => (dispatch) =>
    new Promise((resolve, reject) => {
        const body = {
            filter: filter,
        }
        getDashboardPayrollSummaryService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_PAYROLL_SUMMARY_DATA, res)
                resolve(res?.data)
            })
            .catch(reject)
    })
// Get Payroll Summary
export const getTopPayrollLocationsAction = (filter) => (dispatch) =>
    new Promise((resolve, reject) => {
        getTopPayrollLocationsService(filter)
            .then((res) => {
                sendDataToReducer(dispatch, SET_TOP_PAYROLL_LOCATIONS, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })
// Get Announcement data
export const getannouncementDataAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        getAnnouncementListService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_ANNOUNCEMENT_DATA, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })
export const getAnnouncementCardDataAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getAnnouncementCardDataService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_ANNOUNCEMENT_CARD_DATA, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })
// Get Alert data
export const getAlertDataAction = (id) => (dispatch) =>
    new Promise((resolve, reject) => {
        getDashboardAlertListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_ALERT_DATA, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
        // getDashboardHiringAlertListService(id)
        //     .then((res) => {
        //         sendDataToReducer(dispatch, SET_HIRING_ALERT_DATA, res?.data)
        //         resolve(res?.data)
        //     })
        //     .catch(reject)
    })
// Get Office Sales Performance data
export const officeSalesPerformanceDataAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        getOfficeSalesPerformanceDataService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_OFFICE_SALES_PEFORMANCE_DATA, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Office Sales Performance Graph
export const officeSalesPerformanceGraphAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        getOfficeSalesPerformanceGraphService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_OFFICE_SALES_PEFORMANCE_GRAPH_DATA, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })

// Get Office Sales Performance Graph
export const smDashboardSalesReportAction = (filter) => (dispatch) =>
    new Promise((resolve, reject) => {
        const body = {
            filter: filter,
        }
        getSmDashboardSalesReportService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_SM_SALES_REPORT_DATA, res)
                resolve(res)
            })
            .catch(reject)
    })

// Get SM Office Sales Performance Graph
export const smOfficePerformanceAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        getSmOfficeSalesPerformanceService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_SM_OFFICE_PEFORMANCE_DATA, res?.data)
                resolve(res)
            })
            .catch(reject)
    })
// Get SM Office  Performance Team
export const smOfficePerformanceTeamAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        getSmOfficePeformanceTeamService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_SM_OFFICE_PEFORMANCE_TEAM_DATA, res?.data)
                resolve(res)
            })
            .catch(reject)
    })

// Get GoalTracker
export const goalTrackerDataAction = (body) => (dispatch) =>
    new Promise((resolve, reject) => {
        getGoalTrackerDataService(body)
            .then((res) => {
                sendDataToReducer(dispatch, SET_GOAL_TRACKER_DATA, res)
                resolve(res)
            })
            .catch(reject)
    })
// Get SM Event Graph
export const smOfficeEventListAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getSmOfficeEventListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_EVENT_DATA, res?.data)
                resolve(res)
            })
            .catch(reject)
    })

// Get Alerts List
export const getAlertCenterListAction = (params) => (dispatch) =>
    new Promise((resolve, reject) => {
        getAlertCenterListService(params)
            .then((res) => {
                sendDataToReducer(dispatch, SET_ALERT_CENTER_DATA, res?.data)
                sendDataToReducer(dispatch, SET_ALERT_CENTER_DATA_COUNT, res?.totalCount)

                resolve(res)
            })
            .catch(reject)
    })
