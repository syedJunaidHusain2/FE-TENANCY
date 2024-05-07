export const getAlertCenterListSelector = (state) => state?.dashboard?.alertCenterList ?? []
export const getAdminDashboardPayrollSelector = (state) =>
    state?.dashboard?.payrollSummaryData ?? []
export const getAnnouncementSelector = (state) => state?.dashboard?.announcementData ?? []
export const getAnnouncementCardDataSelector = (state) =>
    state?.dashboard?.announcementCardList ?? []
export const getAlertSelector = (state) => state?.dashboard?.alertData ?? []
export const getHiringAlertSelector = (state) => state?.dashboard?.dashboardHiringAlertList ?? []
export const getOfficeSalesPeformanceSelector = (state) =>
    state?.dashboard?.officeSalesPeformanceData ?? []
export const getTopPayrollLocationsSelector = (state) => state?.dashboard?.topPayrollLocations ?? []
export const getOfficeSalesPeformanceGraphSelector = (state) =>
    state?.dashboard?.officeSalesPeformanceGraph ?? []
export const getSmSalesReportSelector = (state) => state?.dashboard?.smSalesReportData ?? []
export const getSmOfficePeformanceSelector = (state) =>
    state?.dashboard?.smOfficePeformanceData ?? []
export const getSmOfficePeformanceTeamSelector = (state) =>
    state?.dashboard?.smOfficePeformanceTeamData ?? []
export const getGoalTrackerDataSelector = (state) => state?.dashboard?.goalTrackerData ?? []
export const getEventDataSelector = (state) => state?.dashboard?.eventList ?? []
export const getAlertCenterCount = (state) => state?.dashboard?.alertCenterListCount ?? []
