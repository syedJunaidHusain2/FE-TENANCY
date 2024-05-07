export const getCompanyProfileSelector = (state) => state?.setting?.companyProfile
export const getCompanySettingSelector = (state) => state?.setting?.companySetting ?? null
export const getCompanyOverrideSettingSelector = (state) =>
    state?.setting?.companyOverrideSetting ?? null
export const getPositionSettingSelector = (state) => state?.setting?.positionSetting ?? null
export const getPayFrequencyTypeSelector = (state) => state?.setting?.payFrequencyType ?? []
export const getPayFrequencySettingSelector = (state) => state?.setting?.payFrequencySetting ?? []
export const getWeeklyPayPeriodSelector = (state) => state?.setting?.weeklyPayPeriod ?? []
export const getMonthlyPayPeriodSelector = (state) => state?.setting?.monthlyPayPeriod ?? []

export const getAllStatesAndCitiesSelector = (state) => state?.setting?.state_city ?? []
export const getUsedStateSelector = (state) => state?.setting?.usedState ?? []
export const getDocumentTypessSelector = (state) => state?.setting?.documentTypes ?? []
export const getCostCenterListSelector = (state) => state?.setting?.costCenterList ?? []
export const getReconciliationScheduleSelector = (state) =>
    state?.setting?.reconciliationSchedule ?? []
export const getPositionsSelector = (state) => state?.setting?.positions ?? []
export const getDepartmentsSelector = (state) => state?.setting?.departments ?? []
export const getAllLocationsSelector = (state) => state?.setting?.allLocations ?? []
export const getCostTrackingSelector = (state) => state?.setting?.costTracking ?? []
export const getParentCostCenterSelector = (state) => state?.setting?.parentCostCenterList ?? []
export const getParentChildCostCenterSelector = (state) =>
    state?.setting?.parentChildCostCenterList ?? []
export const getAllManagersSelector = (state) => state?.setting?.managers ?? []
export const getOnBoardingConfiguration = (state) => state?.setting?.onBoardingConfigurations ?? []
export const positionMainRolesSelector = (state) => state?.setting?.positionMainRoles ?? []
export const getAllClosersSelector = (state) => state?.setting?.closers ?? []
export const getAllSettersSelector = (state) => state?.setting?.setters ?? []
export const getDepartmentWithPositionSelector = (state) =>
    state?.setting?.departmentWithPosition ?? []
export const geyAllStatesWithOfficesSelector = (state) => state?.setting?.allStatesWithOffices ?? []
