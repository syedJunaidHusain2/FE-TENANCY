import {DIGISIGNER_CONFIG} from '../constants/constants'
import {jsonToFormData} from '../helpers/CommonHelpers'
import authAxios from './authAxios'
import EndPoints from './EndPoints'
import normalAxios from './normalAxios'
import withoutAuthAxios from './withoutAuthAxios'

const getActiveUserFromResponse = (res) => {
    let response = {...res}
    let data = [...res?.data]
    const filteredData = data?.filter((item) => !item?.dismiss)
    response.data = filteredData
    return response
}
export const callThirdPartyApiService = (url) =>
    withoutAuthAxios.post(
        EndPoints.callThirdPartyApi,
        {
            url,
        },
        {
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

// DigiSigner
export const digiSignerSignatureRequestService = (document_id, document_name, userData) => {
    authAxios.post(EndPoints.digiSignerSignatureRequest, {
        document_id,
        user_id: userData?.id,
        document_name,
        email: userData?.email,
    })
}

// Google Maps
export const getLatLongByLocationService = (address) =>
    callThirdPartyApiService(`${EndPoints.getLatLongFromAddress}&address=${address}`)

export const getPlaceAddressService = (address) =>
    callThirdPartyApiService(`${EndPoints.getPlaceAddress}&input=${address}`)

export const getLocationAddressService = (address) =>
    callThirdPartyApiService(`${EndPoints.getLocationFromAddress}&address=${address}`)

export const getAddressFromReverseGeocodingService = (place_id) =>
    callThirdPartyApiService(`${EndPoints.getLocationFromAddress}&place_id=${place_id}`)

export const getTimeZoneFromLatLongService = (lat, long) =>
    callThirdPartyApiService(
        `${EndPoints.getTimeZoneFromLatLong}&location=${lat},${long}&timestamp=${
            new Date().getTime() / 1000
        }`
    )

// Login
export const loginService = (data) => withoutAuthAxios.post(EndPoints.login, data)
//Logout
export const logoutService = () => authAxios.post(EndPoints.logout)
//forgot password
export const forgotPasswordService = (data) => withoutAuthAxios.post(EndPoints.forgotPassword, data)
export const changePasswordService = (data) => authAxios.post(EndPoints.changePassword, data)

export const getUserProfileService = () => authAxios.get(EndPoints.getUserProfile)

export const getCompanySettingService = () => authAxios.get(EndPoints.getCompanySetting)
export const updateCompanyProfileService = (body) =>
    authAxios.post(EndPoints.updateCompanyProfile, jsonToFormData(body))

export const updateCompanySettingService = (type, status) =>
    authAxios.post(EndPoints.updateCompanySetting, {type, status})

// Admin > Setup > Company Margin
export const getCompanyMarginService = () => authAxios.get(EndPoints.getCompanyMargin)
export const updateCompanyMarginService = (data) =>
    authAxios.post(EndPoints.updateCompanyMargin, data)

/**
 * Company > Setting > Overrides
 */
export const getOverridesOnTwoAccountStatusService = () =>
    authAxios.get(EndPoints.getOverridesOnTwoAccountStatus)
export const updateOverridesOnTwoAccountStatusService = (data) =>
    authAxios.post(EndPoints.updateOverridesOnTwoAccountStatus, data)

/**
 *
 * Company > Setting > Reconcilation
 */
export const getCompanyReconciliationService = () =>
    authAxios.get(EndPoints.getCompanyReconciliation)
export const deleteReconciliationPeriodService = (data) =>
    authAxios.delete(EndPoints.deleteReconciliationPeriod, {data})
export const updateCompanyReconcilationService = (data) =>
    authAxios.put(EndPoints.updateReconciliation, data)

// getCompanyProfileService
export const getCompanyProfileWithoutAuthService = () =>
    withoutAuthAxios.get(EndPoints.getCompanyProfileWithoutAuth)
export const getAllLocationListService = () => authAxios.get(EndPoints.getAllLocationList)
export const getCompanyProfileService = () => authAxios.get(EndPoints.getCompanyProfile)
//getTierLevel
export const getTierLevelService = () => authAxios.get(EndPoints.getTierDuration)
export const getAllStatesAndCitiesService = () => authAxios.get(EndPoints.getAllStatesAndCities)
export const getUsedStateService = () => authAxios.get(EndPoints.getUsedStates)

// getCompanyGlobalReconciliationService
export const getCompanyGlobalReconciliationService = () =>
    authAxios.get(EndPoints.getCompanyGlobalReconciliation)

//getsetupactiveinactive
export const getSetupActiveInactiveService = (data) =>
    authAxios.post(EndPoints.getSetupActiveInactive, data)

export const getPayrollService = () => authAxios.get(EndPoints.getSettingPayroll)

export const getMarkettingReconciliationService = () =>
    authAxios.get(EndPoints.getMarkettingReconciliation)
export const updateMarkettingReconciliationService = (data) =>
    authAxios.put(EndPoints.updateMarkettingReconciliation, data)

export const getMarginofDiffrenceService = () => authAxios.get(EndPoints.getmarginofdiffrence)

export const updateMarginofDiffrenceService = (data) =>
    authAxios.put(EndPoints.updatemarginofdiffrence, JSON.parse(JSON.stringify(data)))

export const getLocationsListService = (params) =>
    authAxios.get(EndPoints.getLocationsList, {
        params,
    })
export const exportLocationDataService = () => authAxios.get(EndPoints.exportLocationData)

export const deleteLocationService = (id) => authAxios.delete(`${EndPoints.deleteLocation}/${id}`)
export const getCostCenterListService = (data) => authAxios.post(EndPoints.getCostCenterList, data)

export const getCostCenterListbyIDService = (id) =>
    authAxios.get(`${EndPoints.getCostCenterListbyID}/${id}`)

export const getDepartmentListService = (params) =>
    authAxios.get(EndPoints.getDepartmentList, {params})
export const getPositionByDeparmentService = () => authAxios.get(EndPoints.getPositionByDepartment)
export const updateCostCenterService = (id, data) =>
    authAxios.put(`${EndPoints.updatecostcenter}/${id}`, data)
export const getIncompleteAccountAlertService = () =>
    authAxios.get(EndPoints.getIncompleteAccountAlert)

// Postion
export const getuserbyPositionIDService = (id, params) =>
    authAxios.get(`${EndPoints.userbyPositionID}/${id}`, {params})

export const getCompleteAccountAlertService = () => authAxios.get(EndPoints.getCompleteAccountAlert)

export const getPositionListService = (params) => authAxios.get(EndPoints.getPositionList, {params})
export const getPositionListByDepartmentIdService = (department_id) =>
    authAxios.get(`${EndPoints.getPositionListByDepartmentId}/${department_id}`)
export const getPositionSettingService = (position_id) =>
    authAxios.get(`${EndPoints.getPositionSetting}/${position_id}`)
export const deletePositionService = (id) =>
    authAxios.delete(`${EndPoints.deletePositionPlan}/${id}`)

export const addLocationService = (data) => authAxios.post(EndPoints.addlocation, data)
export const updateLocationService = (data) => authAxios.put(EndPoints.updatelocation, data)
export const getStateListService = () => authAxios.get(EndPoints.getStateList)
export const getAllOfficeLocationService = () => authAxios.get(EndPoints.getAllOfficeLocation)
export const getAllStatesWithOfficesService = () => authAxios.get(EndPoints.getAllStatesWithOffices)
export const upComingLocationRedlinesService = (id) =>
    authAxios.get(`${EndPoints.upComingLocationRedlines}/${id}`)

export const getCityListService = (data) => authAxios.get(`${EndPoints.getcityList}/${data}`)
export const getCostCenterDropdownService = () => authAxios.get(EndPoints.getcostcenter)
export const getParentCostCenterDropdownService = () =>
    authAxios.get(EndPoints.getParentCostCenterList)
export const getRedlineDataFromLocation = (body) =>
    authAxios.post(EndPoints.getRedlineFromLocation, body)

export const getRecuiterFilterService = (data) =>
    new Promise((resolve, reject) => {
        authAxios
            .post(EndPoints.getRecuirter, {filter: data})
            .then((res) => {
                let response = getActiveUserFromResponse(res)
                resolve(response)
            })
            .catch(reject)
    })

export const addCostCenterService = (data) => authAxios.post(EndPoints.addcostcenter, data)
export const getDepartmentDropdownService = () => authAxios.get(EndPoints.getdartmentdropdown)
export const AddDepartmentService = (data) => authAxios.post(EndPoints.adddepartment, data)
export const getPositionDropdownService = () => authAxios.get(EndPoints.getposition)

export const AddPositionService = (data) => authAxios.post(EndPoints.addposition, data)
export const updatePositionsService = (id, data) =>
    authAxios.put(`${EndPoints.updatePositions}/${id}`, data)
export const updatePositionService = (positionId, data) =>
    authAxios.put(`${EndPoints.updatePosition}/${positionId}`, data)
export const getPositionByIdService = (id) => authAxios.get(`${EndPoints.getPositionById}/${id}`)
export const checkReconciliationSettingService = (data) =>
    authAxios.get(EndPoints.checkReconciliationSetting, data)

export const getAllManagerListService = (office_id = null) =>
    new Promise((resolve, reject) => {
        authAxios
            .get(EndPoints.getAllManagerlist, {
                params: {
                    office_id,
                },
            })
            .then((res) => {
                let response = getActiveUserFromResponse(res)
                resolve(response)
            })
            .catch(reject)
    })
export const reAssignManagerService = (data) => authAxios.put(EndPoints.reAssignManager, data)
export const getTeamListService = (office_id = '') =>
    authAxios.get(`${EndPoints.getteamlist}?office_id=${office_id}`)

export const addOnbrdingEmployeeService = (data) =>
    authAxios.post(EndPoints.addonbrdingemployee, data)
export const addTierLevelService = (data) => authAxios.post(EndPoints.createtier, data)
export const getOnBoardingEmployeeListService = (params) =>
    authAxios.get(EndPoints.getOnBoardingEmployeeList, {
        params,
    })
export const exportOnBoardingEmployeeListService = (params) =>
    authAxios.get(EndPoints.exportOnBoardingEmployeeList, {
        params,
    })
export const deleteOnBoardingEmployeeListService = (id) =>
    authAxios.delete(`${EndPoints.deleteOnBoardingEmployeeList}/${id}`)
export const addSetupService = (data) => authAxios.post(EndPoints.setupPosition, data)

export const getOnbordingEmployeebyIdService = (id) =>
    authAxios.get(`${EndPoints.getonbordingemployeebyid}/${id}`)
export const deleteTierService = (data) => authAxios.delete(`${EndPoints.deletetier}/${data}`)
export const deletLocationService = (data) =>
    authAxios.delete(`${EndPoints.deletelocation}/${data}`)
export const sendEmailbyIdService = (data, resendOfferLetter = false) =>
    authAxios.get(`${EndPoints.sendemailbyid}/${data}${resendOfferLetter ? '?type=resend' : ''}`)
export const deletDepartmentService = (data) => authAxios.put(`${EndPoints.deletedepartment}`, data)
export const updateOnbordingEmployee = (data) =>
    authAxios.put(`${EndPoints.updateonbordingemployee}/${data}`)
export const updateDepartmentService = (data) => authAxios.put(EndPoints.updatedepartment, data)
export const disableCostCenterService = (data) =>
    authAxios.put(`${EndPoints.disablecostcenter}`, data)
export const updateTierLevelService = (data) => authAxios.put(EndPoints.updatetierlevel, data)

export const addHiringLeadsService = (data) => authAxios.post(EndPoints.addhiringleads, data)
export const addLeadWithoutAuthService = (data) =>
    withoutAuthAxios.post(EndPoints.addLeadWithoutAuth, data)
export const checkDuplicateLeadServce = (data) => authAxios.post(EndPoints.checkDuplicateLead, data)
export const checkDuplicateLeadWithoutAuthService = (data) =>
    authAxios.post(EndPoints.checkDuplicateLeadWithoutAuth, data)
export const updateHiringLeadsService = (id, data) =>
    authAxios.put(`${EndPoints.addhiringleads}/${id}`, data)

export const getRecentlyHiredListService = (office_id) =>
    authAxios.get(EndPoints.getRecentlyHiredList, {
        params: {
            office_id,
        },
    })

export const getHiringProgressListService = (data) =>
    authAxios.get(EndPoints.getHiringProgressList, {
        params: data,
    })

//   Employee
export const getEmployeeProfileService = (employee_id) =>
    authAxios.get(`${EndPoints.getEmployeeProfile}/${employee_id}`)
export const getEmployeePersonalInfoService = (employee_id) =>
    authAxios.get(`${EndPoints.getEmployeePersonalInfo}/${employee_id}`)
export const getEmployeePackageService = (employee_id) =>
    authAxios.get(`${EndPoints.getEmployeePackage}/${employee_id}`)
export const getEmployeeBankingInfoService = (employee_id) =>
    authAxios.get(`${EndPoints.getEmployeeBankingInfo}/${employee_id}`)
export const getEmployeeTaxInfoService = (employee_id) =>
    authAxios.get(`${EndPoints.getEmployeeTaxInfo}/${employee_id}`)
export const updateEmployeeProfileService = (data) =>
    authAxios.post(EndPoints.updateEmployeeProfile, data)
export const updateEmployeePositionService = (data) =>
    authAxios.post(EndPoints.updateEmployeePosition, data)
export const updateEmployeeCommissionService = (data) =>
    authAxios.post(EndPoints.updateEmployeeCommission, data)
export const getUserRedlineService = (employee_id) =>
    authAxios.get(`${EndPoints.getUserRedline}/${employee_id}`)
export const updateUserAccountStatusService = (data) =>
    authAxios.post(EndPoints.updateUserAccountStatus, data)

export const getHiringProgressChartService = (data) =>
    authAxios.post(EndPoints.getHiringProgressChart, data)

export const getHireLeadsListService = (data) =>
    authAxios.get(EndPoints.getHireLeadsList, {
        params: data,
    })
export const deleteLeadService = (id) => authAxios.delete(`${EndPoints.deleteLead}/${id}`)
export const getUsersByManagerIdService = (manager_id) =>
    authAxios.get(`${EndPoints.getUsersByManagerId}/${manager_id}`)
export const transferEmployeeService = (data) => authAxios.post(EndPoints.transferEmployee, data)

//   Hire Now
export const hireNowStep1Service = (data) => authAxios.post(EndPoints.hireNowStep1, data)
export const updateHireNowStep1Service = (data) => authAxios.put(EndPoints.hireNowStep1, data)
export const hireNowStep2Service = (data) => authAxios.post(EndPoints.hireNowStep2, data)
export const hireNowStep3Service = (data) => authAxios.post(EndPoints.hireNowStep3, data)
export const hireNowStep4Service = (data) => authAxios.post(EndPoints.hireNowStep4, data)
export const hireNowStep5Service = (data) => authAxios.post(EndPoints.hireNowStep5, data)

export const postRescheduleInterviewService = (id, body) =>
    authAxios.post(`${EndPoints.postRescheduleInterview}/${id}`, body)
export const updateCommissionService = (id, body) =>
    authAxios.put(`${EndPoints.updatecommission}/${id}`, body)
export const sendUserCredentialService = (employee_id) =>
    authAxios.post(EndPoints.sendUserCredential, {employee_id})

// Toggle Alerts
export const putToggleAlertsService = (body) => authAxios.put(EndPoints.putToggleAlerts, body)

export const scheduleInterviewService = (body) => authAxios.post(EndPoints.scheduleInterview, body)

export const getInterviewTimeSlotService = (body) =>
    authAxios.post(EndPoints.getInterviewTimeSlot, body)

export const changeLeadStatusService = (lead_id, status) =>
    authAxios.post(EndPoints.changeLeadStatus, {
        lead_id,
        status,
    })
export const exportLeadsDataService = (params) => authAxios.get(EndPoints.exportLeadsData, {params})

export const hiringAssignService = (body) => authAxios.post(EndPoints.hiringAssign, body)

export const getLeadCommentsService = (id) => authAxios.get(`${EndPoints.getLeadComments}/${id}`)
export const addLeadCommentsService = (body) => authAxios.post(EndPoints.addLeadComments, body)
export const replyLeadCommentsService = (body) => authAxios.post(EndPoints.replyLeadComments, body)

export const getLeadByIdServices = (id) => authAxios.get(`${EndPoints.getLeadById}/${id}`)
export const hireEmployeeDirectlyService = (body) =>
    authAxios.post(EndPoints.hireEmployeeDirectly, {...body, hiring_type: 'Directly'})
export const getHiringCalendarEventsService = (body) =>
    authAxios.post(EndPoints.getHiringCalendarEvents, body)
export const getOnBoardingConfigurationService = (body) =>
    authAxios.post(EndPoints.getOnBoardingConfiguration, body)
export const addOnBoardingConfigurationService = (body) =>
    authAxios.post(EndPoints.addOnBoardingConfiguration, body)
export const addOrUpdateOnboardingDynamicAttributesService = (body) =>
    authAxios.post(EndPoints.addOrUpdateOnboardingDynamicAttributes, body)
export const deleteOnboardingDynamicAttributesService = (body) =>
    authAxios.post(EndPoints.deleteOnboardingDynamicAttributes, body)
export const updateHireDateOfEmployeeService = (user_id, created_at) =>
    authAxios.post(EndPoints.updateHireDateOfEmployee, {user_id, created_at})
export const getTemplateListByCategoryService = (categery_id) =>
    authAxios.post(EndPoints.getSequiDocsTemplatesByCategory, categery_id)
export const getSequiDocsAgreementListService = () =>
    authAxios.get(EndPoints.getSequiDocsAgreementList)

// postMarketingDeal
export const postMarketingDealService = (body) => authAxios.post(EndPoints.postMarketingDeal, body)

//Post Incomplete Alert
export const createIncompleteAccountAlertService = (body) =>
    authAxios.post(EndPoints.createIncompleteAccountAlert, body)

//Email Notification
export const getEmailNotificationSettingService = () =>
    authAxios.get(EndPoints.getEmailNotificationSetting)
export const updateEmailNotificationSettingService = (body) =>
    authAxios.post(EndPoints.updateEmailNotificationSetting, body)
export const updateDomainSettingService = (body) =>
    authAxios.post(EndPoints.updateDomainSetting, body)
export const getDomainSettingService = () => authAxios.get(EndPoints.getDomainSetting)
export const addDomainSettingService = (body) => authAxios.post(EndPoints.addDomainSetting, body)
export const deleteDomainSettingService = (id) =>
    authAxios.delete(`${EndPoints.deleteDomainSetting}/${id}`, null)

/**
 * Admin > Settings > Setup > Schedule Payroll
 */
// Get Pay Frequency Type
export const getPayFrequencyTypeService = () => authAxios.get(EndPoints.getPayFrequencyType)

// Update Company Payroll
export const updateCompanyPayrollService = (body) =>
    authAxios.put(EndPoints.updateCompanyPayroll, body)

/**
 * Integration
 */
export const getIntegrationListService = () => authAxios.get(EndPoints.getIntegtationList)
export const getIntegrationByIdService = (id) =>
    authAxios.get(`${EndPoints.getIntegtationById}${id}`)
export const addIntegratioSettingnService = (data) =>
    authAxios.post(EndPoints.addIntegtationSetting, data)
export const updateIntegratioSettingnService = (data) =>
    authAxios.post(EndPoints.updateIntegtationSetting, data)
export const connectDisconnectIntegtationSettingService = (id) =>
    authAxios.post(EndPoints.connectDisconnectIntegtationSetting, {id})
export const getIntegrationLogsService = (body) =>
    authAxios.post(EndPoints.getIntegrationLogs, body)
export const syncHubSpotDataService = () => authAxios.post(EndPoints.syncHubSpot)

/**
 * Management
 */
export const getEmployeeListService = (data, params) =>
    authAxios.post(EndPoints.getEmployeeList, data, {
        params,
    })
export const getEmployeeListByLocationService = (locations, params) =>
    authAxios.post(EndPoints.getEmployeeListByLocation, {locations}, {params})
export const filterEmployeeListService = (filter, params) =>
    authAxios.post(EndPoints.filterEmployeeList, {filter}, params)
export const addEmployeeDocumentByIdService = (data) =>
    authAxios.post(EndPoints.addEmployeeDocumentById, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
export const getEmployeeDocumentByIdService = (id) =>
    authAxios.get(`${EndPoints.getEmployeeDocumentById}/${id}`)
export const getEmployeeSequiDocDocumentByIdService = (id) =>
    authAxios.get(`${EndPoints.getEmployeeSequiDocDocumentById}/${id}`)
export const getOnBoardingEmployeeSequiDocDocumentByIdService = (id) =>
    authAxios.get(`${EndPoints.getOnBoardingEmployeeSequiDocDocumentById}/${id}`)
export const updateEmployeeDocumentByIdService = (data) =>
    authAxios.post(EndPoints.updateEmployeeDocumentById, data)
export const deleteEmployeeDocumentByIdService = (data) =>
    authAxios.post(EndPoints.deleteEmployeeDocumentById, data)
export const getDocumentTypeListService = () => authAxios.get(EndPoints.getDocumentTypeDropdown)
export const getEmployeeChartService = (id) => authAxios.get(`${EndPoints.getEmployeeChart}/${id}`)
export const updateEmployeeGroupService = (data) =>
    authAxios.post(EndPoints.updateEmployeeUserGroup, data)
export const updateUserImageService = (data) =>
    authAxios.post(EndPoints.updateUserImage, jsonToFormData(data))
export const getUserOverideService = (id) => authAxios.get(`${EndPoints.userNetworkOveride}/${id}`)
export const getOverrideOnUserService = (id) => authAxios.get(`${EndPoints.overrideOnUser}/${id}`)
export const addManualOverrideService = (data) => authAxios.post(EndPoints.addManualOverride, data)
export const addManualOverrideFromService = (data) =>
    authAxios.post(EndPoints.addManualOverrideFrom, data)
export const getManualOverrideDataService = (override_id) =>
    authAxios.get(`${EndPoints.getManualOverrideData}/${override_id}`)
export const editManualOverrideFromService = (data) =>
    authAxios.post(EndPoints.editManualOverrideFrom, data)
export const editManualOverrideOnService = (data) =>
    authAxios.post(EndPoints.editManualOverrideOn, data)
export const changeOverrideStatusService = (body) =>
    authAxios.put(EndPoints.changeOverrideStatus, body)

export const exportEmployeeDataService = (params) =>
    authAxios.get(EndPoints.exportEmployeeData, {params})

/**
 * Sequi Docs
 */
export const getSequiDocsTemplateCategoriesService = () =>
    authAxios.post(EndPoints.getSequiDocsTemplateCategories)
export const getSequiDocsTemplatesService = () => authAxios.get(EndPoints.getSequiDocsTemplates)
export const getSequiDocsTopTemplatesService = () =>
    authAxios.get(EndPoints.getSequiDocsTopTemplates)

export const getSequiDocsTemplateListByCategoryService = (categery_id) =>
    authAxios.post(EndPoints.getSequiDocsTemplatesByCategory, {categery_id})
export const getSequiDocsTemplateByIdService = (id) =>
    authAxios.get(`${EndPoints.getSequiDocsTemplateById}/${id}`)
export const getSequiDocsTemplateHistoryService = (id) =>
    authAxios.get(`${EndPoints.getTemplateHistory}/${id}`)

export const getSequiDocsTemplatesHistoryService = (id) =>
    authAxios.get(`${EndPoints.getSequifiDocTemplateHistory}/${id}`)

export const addSequiDocsTemplateService = (data) =>
    authAxios.post(EndPoints.addSequiDocsTemplate, data)
export const updateSequiDocsTemplateService = (id, data) =>
    authAxios.put(`${EndPoints.updateSequiDocsTemplate}/${id}`, data)
export const deleteSequiDocsTemplateService = (id) =>
    authAxios.delete(`${EndPoints.deleteSequiDocsTemplate}/${id}`)
export const searchSequiDocsTemplateService = (name) =>
    authAxios.post(EndPoints.searchSequiDocsTemplate, {name})
export const sendSequiDocsTemplateService = (template_id, data) =>
    authAxios.post(`${EndPoints.sendTemplate}/${template_id}`, data)
export const assignSequiDocsTemplateService = (data) =>
    authAxios.post(EndPoints.assignTemplate, data)
export const getDocumentsListService = (data) => authAxios.post(EndPoints.getDocumentsList, data)
export const getNewDocumentsListService = (params) =>
    authAxios.get(EndPoints.getNewDocumentsList, {params})

export const addTemplateCategoryService = (data) =>
    authAxios.post(EndPoints.addTemplateCategory, data)
export const updateTemplateCategoryService = (id, data) =>
    authAxios.post(`${EndPoints.updateTemplateCategory}/${id}`, data)
export const deleteTemplateCategoryService = (id) =>
    authAxios.delete(`${EndPoints.deleteSequiDocsCategory}/${id}`)
export const addTemplateSettingStep1Service = (data) =>
    authAxios.post(EndPoints.addTemplateSettingStep1, data)
export const updateTemplateSettingService = (data) =>
    authAxios.post(EndPoints.updateTemplateSetting, data)

export const addTemplateAgreementStep4Service = (data) =>
    authAxios.post(EndPoints.addTemplateAgreementStep4, data)
export const addTemplateSignatureStep2Service = (data) =>
    authAxios.post(EndPoints.addTemplateSignatureStep2, data)
export const addTemplateEditTemplateStep3Service = (data) =>
    authAxios.post(EndPoints.addTemplateEditTemplateStep3, data)
export const getSingleTemplateListService = (id) =>
    authAxios.get(`${EndPoints.getTemplateListByCategory}/${id}`)
export const getEmailTemplatesListService = () => authAxios.get(EndPoints.getEmailTemplatesList)

export const updateEmailTemplateService = (id, body) =>
    authAxios.post(`${EndPoints.updateEmailTemplate}/${id}`, body)

export const deleteSequiDocsParticularTemplateService = (data) =>
    authAxios.post(EndPoints.deleteSequiDocsParticularTemplate, data)
export const getTemplateDetailService = (id) =>
    authAxios.get(`${EndPoints.getTemplateDetail}/${id}`)
export const sendOrUseSequiDocTemplateService = (id, body) =>
    authAxios.post(`${EndPoints.useOrSendSequiDocTemplate}/${id}`, body)

export const sequiDocUseTemplateService = (body) =>
    authAxios.post(EndPoints.useSequiDocsTemplate, body)

export const testParticularTemplateService = (body) =>
    authAxios.post(EndPoints.testParticularTemplate, body)
export const downloadParticularTemplateService = (body) =>
    authAxios.post(EndPoints.downloadParticularTemplate, body)

export const sendSequiDocTestTemplateEmailService = (id, body) =>
    authAxios.post(`${EndPoints.sendSequiDocTestTemplateEmail}/${id}`, body)

export const getSmSequiDocDataService = () => authAxios.get(EndPoints.getSmSequiDocData)
export const searchEmployeeToSendDocService = (body) =>
    authAxios.post(EndPoints.searchEmployeeToSendDoc, body)

/**
 * Requests & Approval
 */
export const getAdjustmentTypeListService = () => authAxios.get(EndPoints.getAdjustmentTypeList)
export const getAlLRequestsListService = (params) =>
    authAxios.get(EndPoints.getAlLRequestsList, {params})
export const searchRequestService = ({filter, page}) =>
    authAxios.post(EndPoints.searchRequest, {filter, page})
export const getRequestDetailsByRequestNumberService = (request_no) =>
    authAxios.get(`${EndPoints.getRequestDetailsByRequestNumber}/${request_no}`)
export const updateStatusOfRequestService = (request_id, status) =>
    authAxios.post(EndPoints.updateStatusOfRequest, {request_id, status})
export const addRequestService = (data) => authAxios.post(EndPoints.addRequest, data)
export const addRequestApprovalCommentService = (data) =>
    authAxios.post(EndPoints.addRequestApprovalComment, jsonToFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
export const getAllApprovalListService = (params) =>
    authAxios.get(EndPoints.getAllApprovalList, {params})

export const getApprovalOrHistoryListService = (params) =>
    authAxios.get(EndPoints.getApprovalOrHistoryList, {params})

export const searchApprovalService = (filter) => authAxios.post(EndPoints.searchApproval, {filter})
export const getApprovalHistoryService = (params) =>
    authAxios.get(EndPoints.approvalHistory, {params})
export const getPidByUserService = (id) => authAxios.get(`${EndPoints.getPidByUser}/${id}`)
export const exportApprovalHistoryService = (params) =>
    authAxios.get(EndPoints.exportApprovalHistory, {params})

//sm > Report
export const getManagerReportService = (data) => authAxios.post(EndPoints.getManagerReport, data)
export const getMySalesReportService = (data) => authAxios.post(EndPoints.getMySalesReport, data)
export const getMySalesChartService = (params) =>
    authAxios.post(EndPoints.getMySalesChart, null, {params})
export const getSalesGraphService = (params) =>
    authAxios.post(EndPoints.getSalesGraph, null, {params})
export const getSalesReportService = (data) => authAxios.post(EndPoints.getSalesReport, data)
export const getSalesAccountAndInstallRatioGraphService = (params) =>
    authAxios.post(EndPoints.getSalesAccountAndInstallRatioGraph, null, {params})
export const getReconcilliationReportService = (data) =>
    authAxios.post(EndPoints.getReconcilliationReport, data)
export const getCustomerSaleTrackingService = (id) =>
    authAxios.get(`${EndPoints.getSaleTracking}/${id}`)

//Admin Report
export const getReconciliationReportService = (data) =>
    authAxios.post(EndPoints.getReconciliationReport, data)

export const exportReconciliationReportService = (data) =>
    authAxios.post(EndPoints.exportReconciliationReport, data)

//Standard > My Sales > Customer
export const getAdminReportService = (data) => authAxios.post(EndPoints.getAdminCustomerList, data)
//Admin > Report > Sales
export const getAdminAllGraphsService = (data) => authAxios.post(EndPoints.getAdminAllGraphs, data)
export const exportAdminSalesService = (data) => authAxios.post(EndPoints.exportAdminSales, data)

//Admin > Reports > Cost
export const getAdminCostGraphService = (data) => authAxios.post(EndPoints.getAdminCostGraph, data)
export const getAdminCostReportService = (data) =>
    authAxios.post(EndPoints.getAdminCostReport, data)
export const getParentChildCostCenterService = () =>
    authAxios.get(EndPoints.getParentChildCostCenter)
export const exportCostDataService = (data) => authAxios.post(EndPoints.exportCostData, data)

//Admin > Reports > Clawback
export const getAdminClawBackReportService = (data) =>
    authAxios.post(EndPoints.getAdminClawBackReport, data)

export const exportAdminClawBackReportService = (data) =>
    authAxios.post(EndPoints.exportAdminClawBackReport, data)

//Admin > Reports > Payroll
export const getAdminPayrollReportService = (data) =>
    authAxios.post(EndPoints.getAdminPayrollReport, data)
export const exportPayrollReportService = (data) =>
    authAxios.post(EndPoints.exportPayrollReport, data)
export const getAdminPayrollReportByFiltersService = (data) =>
    authAxios.post(EndPoints.getAdminPayrollByFilters, data)

//Admin > Reports > Pending Installs
export const getAdminPendingInsatllReportService = (data) =>
    authAxios.post(EndPoints.getAdminPendingInstallReport, data)

export const exportAdminPendingInstallReportService = (data) =>
    authAxios.post(EndPoints.exportAdminPendingInstallReport, data)

//Admin > Reports > Company
export const getAdminCompanyReportService = (data) =>
    authAxios.post(EndPoints.getAdminCompanyReport, data)
export const getAdminCompanyGraphService = (data) =>
    authAxios.post(EndPoints.getAdminCompanyGraph, data)

//Admin > Permission > Group
export const getPermissionGroupListService = () => authAxios.get(EndPoints.getGroupList)
export const getPermissionPoliciesListService = () => authAxios.get(EndPoints.getPoliciesList)
export const deletePermissionService = (id) => authAxios.get(`${EndPoints.deletePermission}/${id}`)
export const getPermissionService = (id) => authAxios.get(`${EndPoints.getPermission}/${id}`)
export const addAdminGroupPermissionService = (data) =>
    authAxios.post(EndPoints.addGroupPermission, data)
export const updateAdminGroupPermissionService = (data) =>
    authAxios.post(EndPoints.updateGroupPermission, data)
export const groupGroupPolicyListService = (id) => authAxios.get(EndPoints.groupPolicyList)

export const getListofGroupService = (params) => authAxios.get(EndPoints.getListofGroup, {params})

//Sm > My Sales > My Sales
export const getMySalesGraphService = (params) =>
    authAxios.post(EndPoints.getMySalesGraph, null, {params})
export const getMySalesAccountInitialRatioGraphService = (data) =>
    authAxios.post(EndPoints.getMySalesAccountInitialRatioGraph, data)
export const getMySalesListService = (data) => authAxios.post(EndPoints.getMySalesList, data)

//Closer and Setter
export const getSalesCloserListService = () => authAxios.get(EndPoints.getSalesCloserList)
export const getSalesSetterListService = () => authAxios.get(EndPoints.getSalesSetterList)
export const getSalesByPidService = (data) => authAxios.post(EndPoints.getSalesByPid, data)
export const updateCloserByPidService = (data) => authAxios.post(EndPoints.updateCloserByPid, data)
export const updateSetterByPidService = (data) => authAxios.post(EndPoints.updateSetterByPid, data)
export const getMySalesOverrideDataService = (params) =>
    authAxios.get(EndPoints.getMySalesOverrideData, {params})
export const getMyRecalculateDataService = (data) =>
    authAxios.post(EndPoints.getMyRecalculateData, data)

//Admin > Alert Center
export const getAlertCenterListService = (params) =>
    authAxios.get(EndPoints.getAlertCenterList, {params})
export const getMissingDataAlertCenterService = (id) =>
    authAxios.get(`${EndPoints.getMissingDataAlertCenter}/${id}`)
export const updateMissingDataAlertCenterService = (data) =>
    authAxios.post(EndPoints.updateMissingDataAlertCenter, data)

export const updateMissingPayPeriodService = (data) =>
    authAxios.post(EndPoints.updateMissingPayPeriod, data)

export const getAdderByPidAlertCenterService = (id) =>
    authAxios.get(`${EndPoints.getAdderByPidAlertCenter}/${id}`)
export const getClawbackByPidAlertCenterService = (id) =>
    authAxios.get(`${EndPoints.getClawbackByPidAlertCenter}/${id}`)
export const getPayrollByidAlertCenterService = (body) =>
    authAxios.post(EndPoints.getPayrollByidAlertCenter, body)

export const getPayRollMissingDetailsService = (id) =>
    authAxios.get(`${EndPoints.getPayRollMissingDetails}/${id}`)

export const getAllAlertMissingDataService = (id) =>
    authAxios.get(`${EndPoints.getAllAlertMissingData}/${id}`)
export const getSalesAndMissingRepMissingDetailService = (id) =>
    authAxios.get(`${EndPoints.getSalesAndMissingRepMissingDetail}/${id}`)

export const searchAllAlertDataService = (body) =>
    authAxios.post(EndPoints.searchAllAlertData, body)

// Admin > Settings > Position Update
export const updatePositionHierarchyService = (data) =>
    authAxios.post(EndPoints.updatePositionHierarchy, data)
export const updatePositionGroupService = (position_id, data) =>
    authAxios.put(`${EndPoints.updatePositionGroup}/${position_id}`, data)
export const positionOrgChartService = () => authAxios.get(EndPoints.positionOrgChart)

//Standard > Calendar > Calander Event.
export const addCalanderEventService = (data) => authAxios.post(EndPoints.addCalanderEvent, data)
export const getCalanderEventListService = (data) =>
    authAxios.post(EndPoints.getCalanderEventList, data)

export const deleteCalanderEventService = (id) =>
    authAxios.delete(`${EndPoints.deleteCalanderEvent}/${id}`)

export const updateCalanderEventService = (id, data) =>
    authAxios.put(`${EndPoints.updateCalanderEvent}/${id}`, data)

export const getGlobalSheduleTimeCalendarService = (id, data) =>
    authAxios.get(EndPoints.getGlobalSheduleTimeCalendar)

export const setSheduleTimeSlotService = (data) =>
    authAxios.post(EndPoints.setSheduleTimeSlot, data)

export const getUserSheduleTimeService = (id) =>
    authAxios.get(`${EndPoints.getUserSheduleTime}/${id}`)

//Standard > Reports > Sales > Account Overrides
export const getAccountOverridesbyPidService = (Pid) =>
    authAxios.get(`${EndPoints.getAccountOverridesbyPid}/${Pid}`)

//Sm > management > Teams
export const getManagmentTeamsService = (params) =>
    authAxios.get(EndPoints.getManagmentTeams, {params})

export const getTeamLeadByOfficeIdService = (id) =>
    new Promise((resolve, reject) => {
        authAxios
            .get(`${EndPoints.getTeamLeadByOfficeId}/${id}`)
            .then((res) => {
                const response = getActiveUserFromResponse(res)
                resolve(response)
            })
            .catch(reject)
    })
export const getTeamMembersByOfficeIdService = (id) =>
    new Promise((resolve, reject) => {
        authAxios
            .get(`${EndPoints.getTeamMembersByOfficeId}/${id}`)
            .then((res) => {
                const response = getActiveUserFromResponse(res)
                resolve(response)
            })
            .catch(reject)
    })

export const deleteManagmentTeamMemberService = (data) =>
    authAxios.post(EndPoints.deleteManagmentTeamMember, data)
export const deleteTeamService = (id) => authAxios.get(`${EndPoints.deleteTeam}/${id}`)
export const addManagementTeamService = (data) => authAxios.post(EndPoints.addManagementTeam, data)
export const updateManagementTeamService = (data) =>
    authAxios.put(EndPoints.updateManagementTeam, data)

// Admin > Reports > Sales > Add Sales
export const addSaleService = (data) => authAxios.post(EndPoints.addSale, data)
export const salesAccountSummaryService = (data) =>
    authAxios.post(EndPoints.salesAccountSummaryData, jsonToFormData(data))

export const salesAccountSummarybyPositionService = (data) =>
    authAxios.post(EndPoints.salesAccountSummarybyPosition, jsonToFormData(data))

export const getCompanyAccountSummaryService = (data) =>
    authAxios.post(EndPoints.getCompanyAccountSummary, jsonToFormData(data))

// Get Sale Data For Super Admin
export const getSaleDataForSuperAdminService = (pid, password) =>
    authAxios.post(EndPoints.getSaleDataForSuperAdmin, {
        pid,
        password,
    })

//Admin > Payroll > Run Payroll
export const getPayrollDataService = (data) => authAxios.post(EndPoints.getPayrollData, data)
export const getPayrollHistoryService = (data) => authAxios.post(EndPoints.getPayrollHistory, data)
export const getReportPayrollHistoryService = (data) =>
    authAxios.post(EndPoints.getReportPayrollHistory, data)

export const getCommissionDetailsService = (body) =>
    authAxios.post(EndPoints.getCommissionDetails, body)

export const getReportCommissionDetailsService = (body) =>
    authAxios.post(EndPoints.getReportCommissionDetails, body)

export const getPaystubCommissionDetailsService = (body) =>
    authAxios.post(EndPoints.getPaystubCommissionDetails, body)

export const getReimbursementDetailsService = (body) =>
    authAxios.post(EndPoints.getReimbursementDetails, body)
export const getReportReimbursementDetailsService = (body) =>
    authAxios.post(EndPoints.getReportReimbursementDetails, body)
export const getPaystubReimbursementDetailsService = (body) =>
    authAxios.post(EndPoints.getPaystubReimbursementDetails, body)

export const getOverrideDetailsService = (body) =>
    authAxios.post(EndPoints.getOverrideDetails, body)
export const getReportOverrideDetailsService = (body) =>
    authAxios.post(EndPoints.getReportOverrideDetails, body)
export const getPaystubOverrideDetailsService = (body) =>
    authAxios.post(EndPoints.getPaystubOverrideDetails, body)

export const getAdjustmentDetailsService = (body) =>
    authAxios.post(EndPoints.getAdjustmentDetails, body)
export const getReportAdjustmentDetailsService = (body) =>
    authAxios.post(EndPoints.getReportAdjustmentDetails, body)
export const getPaystubAdjustmentDetailsService = (body) =>
    authAxios.post(EndPoints.getPaystubAdjustmentDetails, body)

export const editOverrideDetailsService = (body) =>
    authAxios.post(EndPoints.editOverrideDetails, body)
export const editCommissionDetailsService = (body) =>
    authAxios.post(EndPoints.editCommissionDetails, body)
export const editDeductionDetailsService = (body) =>
    authAxios.post(EndPoints.editDeductionDetails, body)

export const deleteAdjustmentDetailsService = (body) =>
    authAxios.post(EndPoints.deleteAdjustmentDetails, body)
export const getPaymentRequestDetailsService = (params) =>
    authAxios.get(EndPoints.getPaymentRequestDetails, {params})
export const payNowPaymentRequestService = (body) =>
    authAxios.post(EndPoints.payNowPaymentRequest, body)
export const getAdvancePaymentRequestDetailsService = (params) =>
    authAxios.get(EndPoints.getAdvancePaymentRequestDetails, {params})
export const updatePaymentRequestService = (data) =>
    authAxios.post(EndPoints.updatePaymentRequest, data)
export const getReconciliationDetailService = (data) =>
    authAxios.post(EndPoints.getReconciliationDetail, data)
export const getPayrollDeductionDetailService = (data) =>
    authAxios.post(EndPoints.getPayrollDeductionDetail, data)
export const getPaystubDeductionDetailService = (data) =>
    authAxios.post(EndPoints.getPaystubDeductionDetail, data)

export const updateReconciliationDetailService = (data) =>
    authAxios.post(EndPoints.updateReconciliationDetail, data)
export const payrollReconciliationHistoryService = (data) =>
    authAxios.post(EndPoints.payrollReconciliationHistory, data)

export const updatePayrollDetailService = (data) =>
    authAxios.post(EndPoints.updatePayrollDetail, data)
export const adjustPayrollDetailService = (data) =>
    authAxios.post(EndPoints.adjustPayrollDetail, data)
export const oneTimePaymentService = (data) => authAxios.post(EndPoints.oneTimePayment, data)
export const oneTimePaymentHistoryService = (data) =>
    authAxios.post(EndPoints.oneTimePaymentHistory, data)
export const oneTimePaymentTotalService = (id) =>
    authAxios.get(EndPoints.onTimePaymentTotal, {
        params: {
            id: id,
        },
    })
export const downloadCsvFileService = (id) =>
    authAxios.get(EndPoints.downloadCsvFile, {
        params: {
            id: id,
        },
    })
export const finilizeReconciliationService = (data) =>
    authAxios.post(EndPoints.finilizeReconciliation, data)
export const addToPayrollReconciliationService = (data) =>
    authAxios.post(EndPoints.addToPayrollReconciliation, data)
export const getFinilizePayrollService = (data) => authAxios.get(EndPoints.getFinilizePayroll)
export const finilizePayrollService = (data) => authAxios.post(EndPoints.finilizePayroll, data)
export const executePayrollService = (data) => authAxios.post(EndPoints.executePayroll, data)
export const moveToNextPayrollService = (data) => authAxios.post(EndPoints.moveToNextPayroll, data)
export const markAsPaidPayrollService = (data) => authAxios.post(EndPoints.markAsPaidPayroll, data)
export const moveToReconciliationPayrollService = (data) =>
    authAxios.post(EndPoints.moveToReconciliationPayroll, data)
export const payrollReconClawbackPopUpService = (id) =>
    authAxios.get(`${EndPoints.payrollReconClawbackPopUp}/${id}`)
export const payrollReconOverridePopUpService = (id) =>
    authAxios.get(`${EndPoints.payrollReconOverridePopUp}/${id}`)
export const payrollReconCommissionPopUpService = (id) =>
    authAxios.get(`${EndPoints.payrollReconCommissionPopUp}/${id}`)
export const closePayrollService = (data) => authAxios.post(EndPoints.closePayroll, data)
export const undoReconPayrollService = (data) => authAxios.post(EndPoints.undoReconPayroll, data)
export const undoPaidPayrollService = (data) => authAxios.post(EndPoints.undoPaidPayroll, data)
export const undoMoveToNextPayrollService = (data) =>
    authAxios.post(EndPoints.undoMoveToNextPayroll, data)

//Onboarding Employees>After loign
export const getOnBoardingEmployeeDetailService = (id) =>
    authAxios.get(`${EndPoints.getOnBoardingEmployeeDetail}/${id}`)
export const updateOnBoardingEmployeeDetailService = (data) =>
    authAxios.post(EndPoints.updateOnBoardingEmployeeDetail, jsonToFormData(data))

export const changeOnboardingEmployeeStatusService = (employee_id, status_id) =>
    authAxios.post(EndPoints.changeOnboardingEmployeeStatus, {
        onboardingEmployee_id: employee_id,
        status_id,
    })

export const changeOnboardingEmployeeAgreementStatusService = (employee_id, status) =>
    authAxios.post(EndPoints.changeOnboardingEmployeeAgreementStatus, {
        user_id: employee_id,
        is_agreement_accepted: status,
    })
export const uploadOnBoardingDocumentService = (data, uploadStatus = () => {}) =>
    authAxios.post(EndPoints.uploadOnBoardingDocument, data, {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent
            let completed = Math.floor((loaded * 100) / total)
            if (completed < 100) {
                uploadStatus({
                    total,
                    completed,
                })
            } else {
                uploadStatus({
                    total,
                    completed: 100,
                })
            }
        },
    })

export const deleteOnBoardingDocumentService = (id) =>
    authAxios.delete(`${EndPoints.deleteOnBoardingDocument}/${id}`)

export const getPayFrequencySettingService = () => authAxios.get(EndPoints.getPayFrequencySetting)
// Pay Periods
export const getAllWeeklyPayPeriodService = () => authAxios.get(EndPoints.getAllWeeklyPayPeriod)
export const getWeeklyPayPeriodService = () => authAxios.get(EndPoints.getWeeklyPayPeriod)
export const getWeeklyExecutedPayPeriodService = () =>
    authAxios.get(EndPoints.getWeeklyExecutedPayPeriod)

export const getAllMonthlyPayPeriodService = () => authAxios.get(EndPoints.getAllMonthlyPayPeriod)
export const getMonthlyPayPeriodService = () => authAxios.get(EndPoints.getMonthlyPayPeriod)
export const getMonthlyExecutedPayPeriodService = () =>
    authAxios.get(EndPoints.getMonthlyExecutedPayPeriod)

export const addPayFrequencySettingService = (body) =>
    authAxios.post(EndPoints.addPayFrequencySetting, body)

//New Employment Package
export const getUserEmploymentPackageDetailService = (id) =>
    authAxios.get(`${EndPoints.getuserEmploymentPackageByid}/${id}`)
export const updateUserPersonalDetailService = (body) =>
    authAxios.post(EndPoints.updateUserPersonalData, body)
export const updateUserOrganizationDetailService = (body) =>
    authAxios.post(EndPoints.updateUserOrganizationData, body)
export const updateUserDeductionDetailService = (body) =>
    authAxios.post(EndPoints.updateUserDeductionData, body)
export const updateUserOverrideDetailService = (body) =>
    authAxios.post(EndPoints.updateUserOverrideData, body)
export const updateUserAgreementDetailService = (body) =>
    authAxios.post(EndPoints.updateUserAgreementData, body)
export const updateUserCompensationDetailService = (body) =>
    authAxios.post(EndPoints.updateUserCompensation, body)

//Search API
export const officeBYUserIDSerices = (id) =>
    new Promise((resolve, reject) => {
        authAxios
            .get(`${EndPoints.userByOfficeId}/${id}`)
            .then((res) => {
                let response = getActiveUserFromResponse(res)
                resolve(response)
            })
            .catch(reject)
    })

//Admin Dashboard API
export const getDashboardPayrollSummaryService = (body) =>
    authAxios.post(EndPoints.getDashboardPayrollSummary, body)
export const getTopPayrollLocationsService = (filter) =>
    authAxios.post(EndPoints.getTopPayrollLocations, {filter})
export const getAnnouncementListService = (params) =>
    authAxios.get(EndPoints.getAnnouncementList, {params})
export const getAnnouncementCardDataService = () => authAxios.get(EndPoints.getAnnouncementCardData)
export const getDashboardAlertListService = () => authAxios.get(EndPoints.getAlertList)
export const getDashboardHiringAlertListService = (id) =>
    authAxios.get(`${EndPoints.getHiringAlertList}/${id}`)

export const getOfficeSalesPerformanceDataService = (body) =>
    authAxios.post(EndPoints.getDashboardOfficeSalesPerformance, body)
export const getOfficeSalesPerformanceGraphService = (body) =>
    authAxios.post(EndPoints.getOfficeSalesPerformanceGraph, body)

export const getSmDashboardSalesReportService = (body) =>
    authAxios.post(EndPoints.getSmDashboardSalesReport, body)

export const getSmOfficeSalesPerformanceService = (body) =>
    authAxios.post(EndPoints.getSmOfficeSalesPerformance, body)

export const getSmOfficePeformanceTeamService = (body) =>
    authAxios.post(EndPoints.getSmOfficePeformanceTeam, body)

export const getGoalTrackerDataService = (body) =>
    authAxios.post(EndPoints.getGoalTrackerData, body)
export const getSmOfficeEventListService = () => authAxios.post(EndPoints.getSmOfficeEventList)
export const setGoalTrackerService = (body) => authAxios.post(EndPoints.setGoalTracker, body)

export const addAnnouncementDataService = (data) => authAxios.post(EndPoints.addAnnouncement, data)
export const disableAnnouncementService = (data) =>
    authAxios.post(EndPoints.disableAnnouncement, data)
export const deleteAnnouncementService = (id) =>
    authAxios.post(`${EndPoints.deleteAnnouncement}?id=${id}`)

//Past paystub
export const getPastPaystubGraphDataService = (body) =>
    authAxios.post(EndPoints.getPastPaystubGraphData, body)
export const getPastPaystubTableDataService = (body) =>
    authAxios.post(EndPoints.getPastPaystubTableData, body)
export const getPastPaystubDetailService = (body) =>
    authAxios.post(EndPoints.getPastPaystubDetail, body)

export const getPastPaystubDetailListService = (body) =>
    authAxios.post(EndPoints.getPastPaystubDetailList, body)
export const getCurrentPaystubDetailService = (body) =>
    authAxios.post(EndPoints.getCurrentPaystubDetail, body)
export const getCurrentPaystubCustomerDetailService = (body) =>
    authAxios.post(EndPoints.getCurrentPaystubCustomerDetail, body)

export const getPastPaystubUserDetailService = (body) =>
    authAxios.post(EndPoints.getPastPaystubUserDetail, body)

//Filters
export const LocationFilterService = (body) => authAxios.post(EndPoints.locationFilter, body)
export const positionFilterService = (params) => authAxios.get(EndPoints.positionFilter, {params})
export const leadsFilterService = (params) => authAxios.get(EndPoints.leadsFilter, {params})
export const runPayrollFilterService = (body) => authAxios.post(EndPoints.runPayrollFilter, body)
export const salesReportFilterService = (body) => authAxios.post(EndPoints.salesReportFilter, body)

//Employment Package History
export const getEmploymentPackageHistoryService = (body) =>
    authAxios.post(EndPoints.getEmploymentPackageHistory, body)
export const deleteEmploymentPackageHistoryService = (body) =>
    authAxios.post(EndPoints.deleteEmploymentPackageHistory, body)
export const deleteManualOverrideHistoryService = (id) =>
    authAxios.get(`${EndPoints.deleteManualOverrideHistory}/${id}`)

//Setting UserManagement
export const getUserManagementListService = (params) =>
    authAxios.post(EndPoints.getUserManagementList, params)
export const addNewAdminService = (body) => authAxios.post(EndPoints.addNewAdmin, body)
export const makeSuperAdminService = (user_id, is_super_admin) =>
    authAxios.put(EndPoints.makeSuperAdmin, {user_id, is_super_admin})
export const suspendAccessOfUserService = (user_id) =>
    authAxios.put(EndPoints.suspendAccessOfUser, {user_id})
export const exportUserManagementListService = (params) =>
    authAxios.get(EndPoints.exportUserManagementList, {params})

//Setting Billing Adderess
export const getBusinessAddressListService = () => authAxios.get(EndPoints.getBusinessAddressList)
export const updateBusinessAddressListService = (body) =>
    authAxios.post(EndPoints.updateBusinessAddress, body)
export const manageSubscriptionService = (body) =>
    authAxios.post(EndPoints.manageSubscription, body)

export const getSubscriptionListService = () => authAxios.get(EndPoints.getSubscriptionList)

export const getBillingHistoryDataService = () => authAxios.post(EndPoints.getBillingHistoryData)

export const getSubscriptionPidDataService = (body) =>
    authAxios.post(EndPoints.getSubscriptionPidData, body)

export const getBillingPidDataService = (body) => authAxios.post(EndPoints.getBillingPidData, body)

export const getBillingM2DataService = (body) => authAxios.post(EndPoints.getBillingM2Data, body)

export const getSubscriptionM2CompleteDataService = (body) =>
    authAxios.post(EndPoints.getSubscriptionM2CompleteData, body)

export const getBillingPaymentGatewayInfoService = (body) =>
    authAxios.post(EndPoints.getBillingPaymentGatewayInfo, body)

export const paymentCallbackService = (body) => authAxios.post(EndPoints.paymentCallback, body)

export const getBillingInvoiceService = (id) =>
    authAxios.get(`${EndPoints.getBillingInvoice}/${id}`)

export const importAdminSalesDataService = (data, uploadStatus = () => {}) =>
    authAxios.post(EndPoints.importAdminSalesData, data, {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent
            let completed = Math.floor((loaded * 100) / total)
            if (completed < 100) {
                uploadStatus({
                    total,
                    completed,
                })
            } else {
                uploadStatus({
                    total,
                    completed: 100,
                })
            }
        },
    })

//Setting>Email Setting
export const emailSettingService = (body) => authAxios.post(EndPoints.emailSetting, body)
export const testEmailSettingService = (body) => authAxios.post(EndPoints.testEmailSetting, body)
export const getSettingService = () => authAxios.get(EndPoints.getEmailSetting)

// Additional Emails
export const getUserAdditionalEmailsService = (userId) =>
    authAxios.get(`${EndPoints.getUserAdditionalEmails}/${userId}`)

export const deleteUserAdditionalEmailService = (userId) =>
    authAxios.delete(`${EndPoints.deleteUserAdditionalEmail}/${userId}`)

export const addUpdateUserAdditionalEmailService = (user_id, emails) =>
    authAxios.post(EndPoints.addUpdateUserAdditionalEmail, {user_id, emails})

//Multi Tenency
export const companyOnboardSettingService = (body) =>
    authAxios.post(EndPoints.companyOnboardSetting, body)
