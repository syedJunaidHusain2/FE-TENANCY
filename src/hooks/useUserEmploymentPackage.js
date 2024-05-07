import {useCallback, useEffect, useMemo, useState} from 'react'
import {
    getCompanyOverrideSettingSelector,
    getCompanySettingSelector,
    getPositionsSelector,
    geyAllStatesWithOfficesSelector,
} from '../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import {
    getAllManagerListService,
    getOnbordingEmployeebyIdService,
    getPositionByIdService,
    getRedlineDataFromLocation,
    getUserEmploymentPackageDetailService,
    hireNowStep2Service,
    hireNowStep3Service,
    hireNowStep4Service,
    hireNowStep5Service,
    updateHireNowStep1Service,

    //   Hired Employee
    updateUserPersonalDetailService,
    updateUserOrganizationDetailService,
    updateUserCompensationDetailService,
    updateUserOverrideDetailService,
    updateUserAgreementDetailService,
    getTeamListService,
} from '../services/Services'
import {
    getBooleanValue,
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
    isInputValueExist,
} from '../helpers/CommonHelpers'
import CustomToast from '../customComponents/customToast/CustomToast'
import {
    getAllStatesWithOfficesAction,
    getCompanyOverrideSettingAction,
    getDepartmentWithPositionAction,
    getPositionsAction,
} from '../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import UserOrganisationContainer from '../app/modules/standard_manager/hiring/onBoardingEmp/CompensationPlan/steps/UserOrganisationContainer'
import UserRedlineComissionUpfrontContainer from '../app/modules/standard_manager/hiring/onBoardingEmp/CompensationPlan/steps/UserRedlineComissionUpfrontContainer'
import UserOverridesContainer from '../app/modules/standard_manager/hiring/onBoardingEmp/CompensationPlan/steps/UserOverridesContainer'
import UserAgreementsContainer from '../app/modules/standard_manager/hiring/onBoardingEmp/CompensationPlan/steps/UserAgreementsContainer'
import {
    DOCUMENT_TO_ATTACH_WHILE_ONBOARD,
    HIRE_FIELD_KEYS,
    MAIN_POSITTIONS_ID,
    getValidDate,
    SHOW_BASED_ON_HOST,
} from '../constants/constants'
import UserPersonalDetailContainer from '../app/modules/standard_manager/hiring/onBoardingEmp/CompensationPlan/steps/UserPersonalDetailContainer'
import {POSITIONS_SETUP_FIELDS_KEYS} from '../app/modules/admin/Setting/components/Position/CompensationPlan/CreateCompensationAppModal'
import ViewChanges from '../app/modules/standard_manager/management/particularEmployee/compoents/ViewChanges'
import UserDeductionsContainer from '../app/modules/standard_manager/hiring/onBoardingEmp/CompensationPlan/steps/UserDeductionsContainer'
import ViewUserRedlineChanges from '../app/modules/standard_manager/management/particularEmployee/compoents/ViewUserRedlineChanges'
import {EMAIL_VALIDATION} from '../validations/validations'
import {
    ViewPersonolDetailBlock,
    ViewOrganisationBlock,
    ViewRedlineComissionUpfrontBlock,
    ViewOverridesBlock,
    ViewDeductionsBlock,
    ViewAgreementsBlock,
} from './employmentPackage/EmploymentPackageBlocks'

export const USER_TYPE = {
    onboardEmployee: 'onboardEmployee',
    hiredEmployee: 'hiredEmployee',
}

export const DEFAULT_EMPLOYEE_DATA = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    work_email: [],
    mobile_no: null,

    state_id: null,
    office_id: null,
    is_manager: 0,
    self_gen_accounts: 0,
    state_name: null,
    city_name: null,
    location: null,
    department_id: null,
    additional_locations: [],
    position_id: null,
    sub_position_id: null,
    deduction: [],
    manager_id: null,
    recruiter_id: null,
    recruiter_name: null,
    department_name: null,
    manager_name: null,
    team_id: null,
    position_name: null,
    additional_recruter: [
        {
            recruiter_id: null,
            recruiter_first_name: null,
        },
        {
            recruiter_id: null,
            recruiter_first_name: null,
        },
    ],

    employee_compensation: [
        {
            commission: null,
            commission_effective_date: null,
            upfront_pay_amount: null,
            upfront_effective_date: null,
            redline_amount_type: 'Shift based on Location',
            redline: null,
            redline_type: 'per watt',
            redline_effective_date: null,
            withheld_effective_date: null,
            withheld_amount: null,
            withheld_type: null,
        },
        {
            commission: null,
            commission_effective_date: null,
            upfront_pay_amount: null,
            upfront_effective_date: null,
            redline_amount_type: 'Shift based on Location',
            redline: null,
            redline_type: 'per watt',
            redline_effective_date: null,
            withheld_effective_date: null,
            withheld_amount: null,
            withheld_type: null,
        },
    ],

    override_effective_date: null,
    direct_overrides_amount: null,
    direct_overrides_type: null,
    indirect_overrides_amount: null,
    indirect_overrides_type: null,
    office_overrides_amount: null,
    office_overrides_type: null,
    office_stack_overrides_amount: null,

    probation_period: null,
    offer_include_bonus: 0,
    hiring_bonus_amount: null,
    date_to_be_paid: null,
    period_of_agreement: null,
    period_of_agreement_start_date: null,
    end_date: null,
    offer_expiry_date: null,
}

const useUserEmploymentPackage = ({
    userType = USER_TYPE.onboardEmployee,
    prefieldData = null,
    id = null,
    lead_id = null,
    callOnLoadApi = true,
    getTopCardUserProfile = () => {},
}) => {
    const dispatch = useDispatch()
    const [firstPage, setFirstPage] = useState(true)
    const [employeeData, setEmployeeData] = useState({...DEFAULT_EMPLOYEE_DATA, ...prefieldData})
    const [loading, setLoading] = useState(false)
    const [personalDetailLoading, setPersonalDetailLoading] = useState(false)
    const [organizationLoading, setOrganizationLoading] = useState(false)
    const [redlineLoading, setRedlineLoading] = useState(false)
    const [overrideLoading, setOverrideLoading] = useState(false)
    const [agreementLoading, setAgreementLoading] = useState(false)
    const [deductionLoading, setDeductionLoading] = useState(false)
    const [managerLoading, setManagerLoading] = useState(false)
    const [managerList, setManagerList] = useState([])
    const [firstPositionDetail, setFirstPositionDetail] = useState(null)
    const [secondPositionDetail, setSecondPositionDetail] = useState(null)
    const [minMAxRedline, setMinMAxRedline] = useState(null)
    const [toggleView, setToggleView] = useState(false)
    const [auditToggleView, setAuditToggleView] = useState(false)
    const [selfGenAuditToggleView, setSelfGenAuditToggleView] = useState(false)
    const [selfGenToggleView, setSelfGenToggleView] = useState(false)
    const allPositionList = useSelector(getPositionsSelector)
    const [teamList, setTeamList] = useState([])
    const companyOverrideSetting = useSelector(getCompanyOverrideSettingSelector)
    const companySetting = useSelector(getCompanySettingSelector)
    const [agreementStep, setAgreementStep] = useState(1)
    const [selectedDocument, setSelectedDocument] = useState(DOCUMENT_TO_ATTACH_WHILE_ONBOARD)
    const allStatesWithOffices = useSelector(geyAllStatesWithOfficesSelector)

    useEffect(() => {
        if (callOnLoadApi) {
            dispatch(getAllStatesWithOfficesAction())
            dispatch(getPositionsAction())
            dispatch(getCompanyOverrideSettingAction())
            dispatch(getDepartmentWithPositionAction())
        }
    }, [])

    useEffect(() => {
        setManagerList([])
        setTeamList([])
        if (employeeData?.office_id) {
            setManagerLoading(true)

            // Get All Manager List
            getAllManagerListService(employeeData?.office_id)
                .then((res) => {
                    setManagerList(res?.data)
                })
                .finally(() => {
                    setManagerLoading(false)
                })

            // Get Team List
            getTeamListService(employeeData?.office_id).then((res) => {
                setTeamList(res?.data)
            })
        }
    }, [employeeData?.office_id])

    const parentPositionData = useMemo(() => {
        const data = allPositionList?.find((item) => item?.id == employeeData?.sub_position_id)
        const parentPosition = allPositionList?.find(
            (item) => item?.id == (data?.parent_id ?? data?.id)
        )
        return parentPosition
    }, [allPositionList, employeeData?.sub_position_id])

    const bothPositionData = useMemo(() => {
        return {
            firstPosition: {
                parentPositionId: parentPositionData?.id,
                name: parentPositionData?.id == MAIN_POSITTIONS_ID.closer ? 'Closer' : 'Setter',
                ...firstPositionDetail,
            },
            secondPosition: {
                parentPositionId:
                    parentPositionData?.id == MAIN_POSITTIONS_ID.closer
                        ? MAIN_POSITTIONS_ID.setter
                        : MAIN_POSITTIONS_ID.closer,
                name: parentPositionData?.id == MAIN_POSITTIONS_ID.closer ? 'Setter' : 'Closer',
                ...secondPositionDetail,
            },
        }
    }, [firstPositionDetail, parentPositionData?.id, secondPositionDetail])

    const isStackModalEnabled = useMemo(() => {
        return (
            bothPositionData?.firstPosition?.parentPositionId == MAIN_POSITTIONS_ID.closer &&
            getBooleanValue(companyOverrideSetting?.allow_office_stack_override_status) == 1 &&
            firstPositionDetail?.is_stack == 1
        )
    }, [
        bothPositionData?.firstPosition?.parentPositionId,
        firstPositionDetail?.is_stack,
        companyOverrideSetting?.allow_office_stack_override_status,
    ])

    // useEffect(() => {
    //     if (employeeData?.id && employeeData?.self_gen_accounts) {
    //         getPositionData(
    //             MAIN_POSITTIONS_ID.closer == parentPositionData?.id
    //                 ? MAIN_POSITTIONS_ID.setter
    //                 : MAIN_POSITTIONS_ID.closer,
    //             true
    //         )
    //     }
    // }, [employeeData?.self_gen_accounts])

    useEffect(() => {
        if (firstPage && employeeData?.sub_position_id) {
            getPositionData(employeeData?.sub_position_id)
            setFirstPage(false)
        }
    }, [employeeData?.sub_position_id])

    const getPositionDetail = useCallback((id, is_self_gen) => {
        getPositionByIdService(id).then((res) => {
            const positionRes = res?.data?.[0]
            if (is_self_gen) setSecondPositionDetail(positionRes)
            else {
                setFirstPositionDetail(positionRes)
            }
        })
    }, [])

    useEffect(() => {
        if (employeeData?.sub_position_id) {
            getPositionDetail(employeeData?.sub_position_id)
        }
    }, [employeeData?.sub_position_id])

    useEffect(() => {
        if (employeeData?.self_gen_accounts && bothPositionData?.secondPosition?.parentPositionId) {
            getPositionDetail(bothPositionData?.secondPosition?.parentPositionId, true)
        }
    }, [employeeData?.self_gen_accounts])

    const getPositionData = useCallback(
        (
            sub_position_id = employeeData?.sub_position_id,
            is_self_gen = false,
            forceUpdate = false
        ) => {
            setLoading(true)
            let empData = _.cloneDeep(employeeData)
            if (is_self_gen) empData.self_gen_accounts = getBooleanValue(is_self_gen)
            else empData.sub_position_id = sub_position_id

            getPositionByIdService(sub_position_id)
                .then((res) => {
                    const positionRes = res?.data?.[0]
                    // if (is_self_gen) setSecondPositionDetail(positionRes)
                    // else {
                    //     setFirstPositionDetail(positionRes)
                    // }

                    const positionIndex = is_self_gen ? 1 : 0
                    if (userType == USER_TYPE.onboardEmployee) {
                        // Comission
                        if (
                            !isInputValueExist(
                                empData?.[HIRE_FIELD_KEYS.employee_compensation]?.[positionIndex]?.[
                                    HIRE_FIELD_KEYS.commission
                                ]
                            ) ||
                            forceUpdate
                        ) {
                            empData[HIRE_FIELD_KEYS.employee_compensation][positionIndex][
                                HIRE_FIELD_KEYS.commission
                            ] = positionRes?.[POSITIONS_SETUP_FIELDS_KEYS.commission_parentage]
                        }

                        // Upfront Amount
                        if (
                            !isInputValueExist(
                                empData?.[HIRE_FIELD_KEYS.employee_compensation]?.[positionIndex]?.[
                                    HIRE_FIELD_KEYS.upfront_pay_amount
                                ]
                            ) ||
                            forceUpdate
                        ) {
                            empData[HIRE_FIELD_KEYS.employee_compensation][positionIndex][
                                HIRE_FIELD_KEYS.upfront_pay_amount
                            ] = positionRes?.upfront_ammount
                        }

                        // Upfront Calculated By
                        if (
                            !isInputValueExist(
                                empData?.[HIRE_FIELD_KEYS.employee_compensation]?.[positionIndex]?.[
                                    HIRE_FIELD_KEYS.upfront_sale_type
                                ]
                            ) ||
                            forceUpdate
                        ) {
                            empData[HIRE_FIELD_KEYS.employee_compensation][positionIndex][
                                HIRE_FIELD_KEYS.upfront_sale_type
                            ] = positionRes?.calculated_by
                        }

                        // Withheld AmountF
                        if (
                            !isInputValueExist(
                                empData?.[HIRE_FIELD_KEYS.employee_compensation]?.[positionIndex]?.[
                                    HIRE_FIELD_KEYS.withheld_amount
                                ]
                            ) ||
                            forceUpdate
                        ) {
                            empData[HIRE_FIELD_KEYS.employee_compensation][positionIndex][
                                HIRE_FIELD_KEYS.withheld_amount
                            ] = positionRes?.commission_withheld
                        }

                        // Withheld Type
                        if (
                            !isInputValueExist(
                                empData?.[HIRE_FIELD_KEYS.employee_compensation]?.[positionIndex]?.[
                                    HIRE_FIELD_KEYS.withheld_type
                                ]
                            ) ||
                            forceUpdate
                        ) {
                            empData[HIRE_FIELD_KEYS.employee_compensation][positionIndex][
                                HIRE_FIELD_KEYS.withheld_type
                            ] = positionRes?.commission_type
                        }

                        if (!is_self_gen) {
                            // Direct Override Amount
                            if (
                                !isInputValueExist(
                                    empData[HIRE_FIELD_KEYS.direct_overrides_amount]
                                ) ||
                                forceUpdate
                            ) {
                                empData[HIRE_FIELD_KEYS.direct_overrides_amount] =
                                    positionRes?.override?.[0]?.override_ammount
                            }

                            // Direct Override Type
                            if (
                                !isInputValueExist(
                                    empData[HIRE_FIELD_KEYS.direct_overrides_type]
                                ) ||
                                forceUpdate
                            ) {
                                empData[HIRE_FIELD_KEYS.direct_overrides_type] =
                                    positionRes?.override?.[0]?.type
                            }

                            // InDirect Override Amount
                            if (
                                !isInputValueExist(
                                    empData[HIRE_FIELD_KEYS.indirect_overrides_amount]
                                ) ||
                                forceUpdate
                            ) {
                                empData[HIRE_FIELD_KEYS.indirect_overrides_amount] =
                                    positionRes?.override?.[1]?.override_ammount
                            }

                            // InDirect Override Type
                            if (
                                !isInputValueExist(
                                    empData[HIRE_FIELD_KEYS.indirect_overrides_type]
                                ) ||
                                forceUpdate
                            ) {
                                empData[HIRE_FIELD_KEYS.indirect_overrides_type] =
                                    positionRes?.override?.[1]?.type
                            }

                            // Office Override Amount
                            if (
                                !isInputValueExist(
                                    empData[HIRE_FIELD_KEYS.office_overrides_amount]
                                ) ||
                                forceUpdate
                            ) {
                                empData[HIRE_FIELD_KEYS.office_overrides_amount] =
                                    positionRes?.override?.[2]?.override_ammount
                            }

                            // Office Override Type
                            if (
                                positionRes?.override?.[2]?.override_type_locked ||
                                !isInputValueExist(empData[HIRE_FIELD_KEYS.office_overrides_type])
                            ) {
                                empData[HIRE_FIELD_KEYS.office_overrides_type] =
                                    positionRes?.override?.[2]?.type
                            }

                            // Office Override Amount
                            if (
                                isStackModalEnabled &&
                                (!isInputValueExist(
                                    empData[HIRE_FIELD_KEYS.office_stack_overrides_amount]
                                ) ||
                                    forceUpdate)
                            ) {
                                empData[HIRE_FIELD_KEYS.office_stack_overrides_amount] =
                                    positionRes?.override?.[3]?.override_ammount
                            }
                        }

                        setEmployeeData(empData)
                    } else {
                        setEmployeeData(empData)
                    }
                })
                .catch(() => {
                    setEmployeeData(empData)
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [employeeData, isStackModalEnabled, userType]
    )

    useEffect(() => {
        if (id) getEmployeeData()
    }, [id])

    const getEmployeeData = useCallback(() => {
        if (id) {
            const getFinalRes = (res) => {
                let empData = _.cloneDeep({...DEFAULT_EMPLOYEE_DATA, ...employeeData, ...res?.data})
                if (empData?.work_email?.length <= 0) empData.work_email = []
                // if (userType == USER_TYPE.onboardEmployee) {
                //     if (!empData?.recruiter_id) {
                //         empData.recruiter_id = userData?.id
                //         empData.recruiter_name = `${userData?.first_name} ${userData?.last_name}`
                //     }
                // }

                if (empData?.employee_compensation?.length == 0) {
                    empData.employee_compensation = [
                        {
                            position_id: null,
                            commission: null,
                            commission_effective_date: null,
                            upfront_pay_amount: null,
                            upfront_effective_date: null,
                            redline_amount_type: 'Shift based on Location',
                            redline: null,
                            redline_type: 'per watt',
                            redline_effective_date: null,
                            withheld_effective_date: null,
                            withheld_amount: null,
                            withheld_type: null,
                        },
                        {
                            position_id: null,
                            commission: null,
                            commission_effective_date: null,
                            upfront_pay_amount: null,
                            upfront_effective_date: null,
                            redline_amount_type: 'Shift based on Location',
                            redline: null,
                            redline_type: 'per watt',
                            redline_effective_date: null,
                            withheld_effective_date: null,
                            withheld_amount: null,
                            withheld_type: null,
                        },
                    ]
                } else if (empData?.employee_compensation?.length == 1) {
                    empData.employee_compensation = [
                        {
                            ...empData.employee_compensation?.[0],
                        },
                        {
                            position_id: null,
                            commission: null,
                            commission_effective_date: null,
                            upfront_pay_amount: null,
                            upfront_effective_date: null,
                            redline_amount_type: null,
                            redline: null,
                            redline_effective_date: null,
                            withheld_effective_date: null,
                            withheld_amount: null,
                            withheld_type: null,
                        },
                    ]
                }
                return empData
            }
            setLoading(true)
            if (userType == USER_TYPE.onboardEmployee) {
                getOnbordingEmployeebyIdService(id)
                    .then((res) => {
                        const empData = getFinalRes(res)
                        setEmployeeData(empData)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else if (userType == USER_TYPE.hiredEmployee) {
                getUserEmploymentPackageDetailService(id)
                    .then((res) => {
                        const empData = getFinalRes(res)
                        setEmployeeData(empData)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    }, [employeeData, id, userType])

    const updateEmployeeData = useCallback((field, value) => {
        setEmployeeData((val) => ({
            ...val,
            [field]: value,
        }))
    }, [])

    const updateMultipleKeysOfEmployeeData = useCallback((data) => {
        setEmployeeData(data)
    }, [])

    useEffect(() => {
        if (employeeData?.state_id && employeeData?.office_id) {
            const redlineBody = {
                state_id: employeeData.state_id,
                office_id: employeeData.office_id,
            }
            getRedlineDataFromLocation(redlineBody).then((res) => {
                setMinMAxRedline(res?.data)
            })
        }
    }, [employeeData?.office_id])

    const positionAndCompanySetting = useMemo(
        () => ({
            firstPosition: {
                upfront: firstPositionDetail?.upfront_status,
                deduction: firstPositionDetail?.deduction_status,
                reconciliation:
                    companySetting?.reconciliation && firstPositionDetail?.reconciliation_status,
                overrides: {
                    direct: firstPositionDetail?.override?.[0]?.status,
                    indirect: firstPositionDetail?.override?.[1]?.status,
                    office: firstPositionDetail?.override?.[2]?.status,
                    stack:
                        getBooleanValue(
                            companyOverrideSetting?.allow_office_stack_override_status
                        ) == 1 &&
                        getBooleanValue(firstPositionDetail?.is_stack) == 1 &&
                        firstPositionDetail?.override?.[3]?.status,
                },
            },
            secondPosition: {
                upfront: employeeData?.self_gen_accounts && secondPositionDetail?.upfront_status,
                deduction:
                    employeeData?.self_gen_accounts && secondPositionDetail?.deduction_status,
                reconciliation:
                    employeeData?.self_gen_accounts &&
                    companySetting?.reconciliation &&
                    secondPositionDetail?.reconciliation_status,
            },
        }),
        [
            companyOverrideSetting?.allow_office_stack_override_status,
            companySetting?.reconciliation,
            employeeData?.self_gen_accounts,
            firstPositionDetail?.deduction_status,
            firstPositionDetail?.is_stack,
            firstPositionDetail?.override,
            firstPositionDetail?.reconciliation_status,
            firstPositionDetail?.upfront_status,
            secondPositionDetail?.deduction_status,
            secondPositionDetail?.reconciliation_status,
            secondPositionDetail?.upfront_status,
        ]
    )

    const userAssociatedOffices = useMemo(() => {
        let data = []
        if (employeeData?.additional_locations?.length > 0) {
            employeeData?.additional_locations?.map((item) => {
                const stateData = allStatesWithOffices.find((it) => it?.id == item?.state_id)
                const officeData = stateData
                    ? stateData.office.find((it) => it?.id == item?.office_id)
                    : null

                data.push({
                    ...item,
                    state_id: item?.state_id,
                    state_name: stateData?.name,
                    office_id: item?.office_id,
                    office_name: officeData?.office_name,
                })
            })
        }
        return data
    }, [allStatesWithOffices, employeeData?.additional_locations])

    const selectedPrimaryOffice = useMemo(() => {
        const stateData = allStatesWithOffices.find((it) => it?.id == employeeData?.state_id)
        const officeData = stateData
            ? stateData.office.find((it) => it?.id == employeeData?.office_id)
            : null

        return {
            state_id: employeeData?.state_id,
            state_name: stateData?.name,
            office_id: employeeData?.office_id,
            office_name: officeData?.office_name,
        }
    }, [allStatesWithOffices, employeeData?.office_id, employeeData?.state_id])

    const saveEmploymentPackage = useMemo(
        () => ({
            personalDetailValidation: (forValidationOnly = false) =>
                new Promise((resolve, reject) => {
                    if (!employeeData.first_name) return CustomToast.error('Enter first name')
                    if (!employeeData.last_name) return CustomToast.error('Enter last name')
                    if (!employeeData.email) return CustomToast.error('Enter email')
                    if (!EMAIL_VALIDATION(employeeData.email))
                        return CustomToast.error('Enter valid email')
                    if (employeeData?.work_email?.length > 0) {
                        let workEmailArrError = []
                        employeeData?.work_email?.map((item, index, allList) => {
                            if (!item?.email)
                                workEmailArrError.push(
                                    `Enter work email ${index + 1} OR remove field`
                                )
                            if (item?.email && !EMAIL_VALIDATION(item?.email))
                                workEmailArrError.push(`Enter valid work email ${index + 1}`)
                            const isExistInList = allList.some(
                                (emailItem, emailIndex) =>
                                    emailItem.email &&
                                    emailIndex < index &&
                                    emailItem.email == item?.email
                            )

                            if (isExistInList)
                                workEmailArrError.push(
                                    `Work email ${index + 1} is already exist in current list`
                                )
                        })
                        if (workEmailArrError?.length > 0) {
                            return CustomToast.error(workEmailArrError.join(', '))
                        }
                    }

                    if (!employeeData.mobile_no) return CustomToast.error('Enter phone number')
                    if (!employeeData.state_id) return CustomToast.error('Select state')
                    if (!employeeData.office_id) return CustomToast.error('Select office')

                    if (forValidationOnly) return resolve('success')
                    const body = {
                        employee_deatils: {
                            first_name: employeeData.first_name ?? '',
                            last_name: employeeData.last_name ?? '',
                            email: employeeData.email ?? '',
                            work_email: employeeData?.work_email?.[0]?.email
                                ? employeeData?.work_email
                                : [],
                            mobile_no: getMobileNumberWithoutMask(employeeData.mobile_no) ?? '',
                            state_id: employeeData.state_id ?? '',
                            office_id: employeeData.office_id ?? '',
                            lead_id: lead_id ?? '',
                            recruiter_id: employeeData?.recruiter_id ?? '',
                        },
                    }
                    if (employeeData.id) body.user_id = employeeData?.id ?? ''
                    setPersonalDetailLoading(true)
                    if (userType == USER_TYPE.onboardEmployee) {
                        if (employeeData?.id) {
                            updateHireNowStep1Service(body)
                                .then((res) => {
                                    updateEmployeeData(HIRE_FIELD_KEYS.id, res?.data?.id)
                                    resolve('success')
                                })
                                .catch((error) => {
                                    CustomToast.error(error?.data?.message)
                                    reject(error)
                                })
                                .finally(() => setPersonalDetailLoading(false))
                        } else {
                            // hireNowStep1Service(body) # Method change from POST to PUT By Sujjet Ji
                            updateHireNowStep1Service(body)
                                .then((res) => {
                                    updateEmployeeData(HIRE_FIELD_KEYS.id, res?.data?.id)
                                    resolve('success')
                                })
                                .catch((error) => CustomToast.error(error?.data?.message))
                                .finally(() => setPersonalDetailLoading(false))
                        }
                    } else {
                        updateUserPersonalDetailService(body)
                            .then((res) => {
                                updateEmployeeData(HIRE_FIELD_KEYS.id, res?.data?.id)
                                resolve('success')
                            })
                            .catch((error) => CustomToast.error(error?.data?.message))
                            .finally(() => setPersonalDetailLoading(false))
                    }
                }),
            organisationValidation: (to_be_manager = null, forValidationOnly = false) =>
                new Promise((resolve, reject) => {
                    if (!employeeData.state_id) return CustomToast.error('Select state')
                    if (!employeeData.office_id) return CustomToast.error('Select office')
                    if (!employeeData.department_id) return CustomToast.error('Select department')
                    if (!employeeData.sub_position_id) return CustomToast.error('Select position')
                    if (!employeeData?.is_manager && !employeeData.manager_id)
                        return CustomToast.error('Select manager')
                    if (SHOW_BASED_ON_HOST?.teamRequiredForOnboarding && !employeeData?.team_id)
                        return CustomToast.error('Select team')

                    const selectedPosition = allPositionList?.find(
                        (item) => item?.id == employeeData?.sub_position_id
                    )
                    if (forValidationOnly) return resolve('success')

                    let body = {
                        user_id: employeeData?.id,
                        employee_originization: {
                            state_id: employeeData.state_id ?? '',
                            office_id: employeeData.office_id ?? '',
                            department_id: employeeData.department_id ?? '',
                            position_id: selectedPosition?.parent_id ?? selectedPosition?.id ?? '',
                            is_manager: getBooleanValue(employeeData?.is_manager) ?? '',
                            self_gen_accounts: employeeData?.self_gen_accounts ?? '',
                            sub_position_id: employeeData?.sub_position_id ?? '',
                            manager_id: employeeData.manager_id ?? '',
                            team_id: employeeData.team_id ?? '',
                            recruiter_id: employeeData.recruiter_id ?? '',
                            additional_recruiter_id: [],
                            additional_locations:
                                employeeData?.is_manager &&
                                employeeData?.additional_locations?.length > 0
                                    ? employeeData?.additional_locations
                                    : [],
                        },
                    }
                    if (employeeData.additional_recruter?.[0]?.recruiter_id) {
                        body.employee_originization.additional_recruiter_id.push(
                            employeeData.additional_recruter?.[0]?.recruiter_id
                        )
                    }
                    if (employeeData.additional_recruter?.[1]?.recruiter_id) {
                        body.employee_originization.additional_recruiter_id.push(
                            employeeData.additional_recruter?.[1]?.recruiter_id
                        )
                    }

                    setOrganizationLoading(true)
                    if (userType == USER_TYPE.onboardEmployee) {
                        const deductionData = firstPositionDetail?.deduction?.map((item) => ({
                            cost_center_id: item?.cost_center_id,
                            deduction_type: item?.deduction_type,
                            ammount_par_paycheck: item?.ammount_par_paycheck,
                            cost_center_name: item?.cost_center_name,
                        }))
                        body.deduction = deductionData
                        hireNowStep2Service(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setOrganizationLoading(false))
                    } else {
                        updateUserOrganizationDetailService(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setOrganizationLoading(false))
                    }
                }),
            commissionAndRedlineValidation: (forValidationOnly = false) =>
                new Promise((resolve, reject) => {
                    let employee_compensation = [
                        {
                            position_id: bothPositionData?.firstPosition?.parentPositionId ?? '',
                            commission: employeeData?.employee_compensation?.[0]?.commission ?? '',
                            commission_effective_date:
                                getValidDate(
                                    employeeData?.employee_compensation?.[0]
                                        ?.commission_effective_date,
                                    'YYYY/MM/DD'
                                ) ?? '',

                            redline_effective_date:
                                getValidDate(
                                    employeeData?.employee_compensation?.[0]
                                        ?.redline_effective_date,
                                    'YYYY/MM/DD'
                                ) ?? '',
                            redline: employeeData?.employee_compensation?.[0]?.redline ?? '',
                            redline_amount_type:
                                employeeData?.employee_compensation?.[0]?.redline_amount_type ?? '',
                            redline_type:
                                employeeData?.employee_compensation?.[0]?.redline_type ?? '',

                            upfront_effective_date: positionAndCompanySetting.firstPosition.upfront
                                ? getValidDate(
                                      employeeData?.employee_compensation?.[0]
                                          ?.upfront_effective_date,
                                      'YYYY/MM/DD'
                                  )
                                : '',
                            upfront_pay_amount: positionAndCompanySetting.firstPosition.upfront
                                ? employeeData?.employee_compensation?.[0]?.upfront_pay_amount
                                : '',
                            upfront_sale_type: positionAndCompanySetting.firstPosition.upfront
                                ? employeeData?.employee_compensation?.[0]?.upfront_sale_type
                                : '',
                            withheld_effective_date: positionAndCompanySetting.firstPosition
                                .reconciliation
                                ? getValidDate(
                                      employeeData?.employee_compensation?.[0]
                                          ?.withheld_effective_date,
                                      'YYYY/MM/DD'
                                  )
                                : '',
                            withheld_amount: positionAndCompanySetting.firstPosition.reconciliation
                                ? employeeData?.employee_compensation?.[0]?.withheld_amount
                                : '',
                            withheld_type: positionAndCompanySetting.firstPosition.reconciliation
                                ? employeeData?.employee_compensation?.[0]?.withheld_type
                                : '',
                        },
                    ]

                    if (employeeData?.self_gen_accounts) {
                        employee_compensation.push({
                            position_id: bothPositionData?.secondPosition?.parentPositionId,
                            commission: employeeData?.employee_compensation?.[1]?.commission,
                            commission_effective_date: getValidDate(
                                employeeData?.employee_compensation?.[1]?.commission_effective_date,
                                'YYYY/MM/DD'
                            ),
                            redline_effective_date: getValidDate(
                                employeeData?.employee_compensation?.[1]?.redline_effective_date,
                                'YYYY/MM/DD'
                            ),
                            redline: employeeData?.employee_compensation?.[1]?.redline,
                            redline_amount_type:
                                employeeData?.employee_compensation?.[1]?.redline_amount_type,
                            redline_type: employeeData?.employee_compensation?.[1]?.redline_type,
                            upfront_effective_date: positionAndCompanySetting.secondPosition.upfront
                                ? getValidDate(
                                      employeeData?.employee_compensation?.[1]
                                          ?.upfront_effective_date,
                                      'YYYY/MM/DD'
                                  )
                                : '',
                            upfront_pay_amount: positionAndCompanySetting.secondPosition.upfront
                                ? employeeData?.employee_compensation?.[1]?.upfront_pay_amount
                                : '',
                            upfront_sale_type: positionAndCompanySetting.secondPosition.upfront
                                ? employeeData?.employee_compensation?.[1]?.upfront_sale_type
                                : '',
                            withheld_effective_date: positionAndCompanySetting.secondPosition
                                .reconciliation
                                ? getValidDate(
                                      employeeData?.employee_compensation?.[1]
                                          ?.withheld_effective_date,
                                      'YYYY/MM/DD'
                                  )
                                : '',
                            withheld_amount: positionAndCompanySetting.secondPosition.reconciliation
                                ? employeeData?.employee_compensation?.[1]?.withheld_amount
                                : '',
                            withheld_type: positionAndCompanySetting.secondPosition.reconciliation
                                ? employeeData?.employee_compensation?.[1]?.withheld_type
                                : '',
                        })
                    }

                    let positionIndex = 0,
                        positionName = bothPositionData.firstPosition.name,
                        positionDetail = positionAndCompanySetting.firstPosition

                    // First Position
                    if (
                        !employee_compensation?.[positionIndex]?.commission_effective_date &&
                        userType == USER_TYPE.hiredEmployee
                    ) {
                        return CustomToast.error(`Select ${positionName} Commission Effective Date`)
                    }
                    if (!isInputValueExist(employee_compensation?.[positionIndex]?.commission))
                        return CustomToast.error(`Enter ${positionName} comission`)

                    if (!employee_compensation?.[positionIndex]?.redline_amount_type)
                        return CustomToast.error(`Select ${positionName} redline type`)
                    if (
                        !employee_compensation?.[positionIndex]?.redline_effective_date &&
                        userType == USER_TYPE.hiredEmployee
                    )
                        return CustomToast.error(`Select ${positionName} redline effective date`)
                    if (!isInputValueExist(employee_compensation?.[positionIndex]?.redline))
                        return CustomToast.error(`Enter ${positionName} redline amount`)
                    const redlineAmount = employee_compensation?.[positionIndex]?.redline
                    // if (userType == USER_TYPE.onboardEmployee) {
                    if (
                        minMAxRedline?.redline_min &&
                        minMAxRedline?.redline_max &&
                        !(
                            redlineAmount >= minMAxRedline?.redline_min &&
                            redlineAmount <= minMAxRedline?.redline_max
                        )
                    ) {
                        return CustomToast.error(
                            `${positionName} Redline should be between ${minMAxRedline?.redline_min} and ${minMAxRedline?.redline_max}`
                        )
                    }
                    // }

                    if (!employee_compensation?.[positionIndex]?.redline_type)
                        return CustomToast.error(`Select ${positionName} redline amount type`)

                    if (positionDetail?.upfront) {
                        if (
                            !employee_compensation?.[positionIndex]?.upfront_effective_date &&
                            userType == USER_TYPE.hiredEmployee
                        ) {
                            return CustomToast.error(
                                `Select ${positionName}  Upfront Effective Date`
                            )
                        }

                        if (
                            !isInputValueExist(
                                employee_compensation?.[positionIndex]?.upfront_pay_amount
                            )
                        )
                            return CustomToast.error(`Enter ${positionName} upfront pay amount`)
                        if (!employee_compensation?.[positionIndex]?.upfront_sale_type)
                            return CustomToast.error(`Select ${positionName} upfront sale type`)
                    }

                    if (positionDetail?.reconciliation) {
                        if (
                            !employee_compensation?.[positionIndex]?.withheld_effective_date &&
                            userType == USER_TYPE.hiredEmployee
                        ) {
                            return CustomToast.error(
                                `Select ${positionName}  Withheld Effective Date`
                            )
                        }
                        if (
                            !isInputValueExist(
                                employee_compensation?.[positionIndex]?.withheld_amount
                            )
                        )
                            return CustomToast.error(`Enter ${positionName} withheld amount`)
                        if (!employee_compensation?.[positionIndex]?.withheld_type)
                            return CustomToast.error(`Select ${positionName} withheld sale type`)
                    }

                    // Second Position
                    if (employeeData?.self_gen_accounts) {
                        positionIndex = 1
                        positionName = bothPositionData.secondPosition.name
                        positionDetail = positionAndCompanySetting.secondPosition
                        if (
                            !employee_compensation?.[positionIndex]?.commission_effective_date &&
                            userType == USER_TYPE.hiredEmployee
                        ) {
                            return CustomToast.error(
                                `Select ${positionName} Commission Effective Date`
                            )
                        }
                        if (!isInputValueExist(employee_compensation?.[positionIndex]?.commission))
                            return CustomToast.error(`Enter ${positionName} comission`)
                        if (!employee_compensation?.[positionIndex]?.redline_amount_type)
                            return CustomToast.error(`Select ${positionName} redline type`)
                        if (
                            !employee_compensation?.[positionIndex]?.redline_effective_date &&
                            userType == USER_TYPE.hiredEmployee
                        )
                            return CustomToast.error(
                                `Select ${positionName} redline effective date`
                            )
                        if (!isInputValueExist(employee_compensation?.[positionIndex]?.redline))
                            return CustomToast.error(`Enter ${positionName} redline amount`)

                        const redlineAmount = employee_compensation?.[positionIndex]?.redline
                        if (
                            minMAxRedline?.redline_min &&
                            minMAxRedline?.redline_max &&
                            !(
                                redlineAmount >= minMAxRedline?.redline_min &&
                                redlineAmount <= minMAxRedline?.redline_max
                            )
                        ) {
                            return CustomToast.error(
                                `${positionName} Redline should be between ${minMAxRedline?.redline_min} and ${minMAxRedline?.redline_max}`
                            )
                        }

                        if (!employee_compensation?.[positionIndex]?.redline_type)
                            return CustomToast.error(`Select ${positionName} redline amount type`)

                        if (positionDetail?.upfront) {
                            if (
                                !employee_compensation?.[positionIndex]?.upfront_effective_date &&
                                userType == USER_TYPE.hiredEmployee
                            ) {
                                return CustomToast.error(
                                    `Select ${positionName}  Upfront Effective Date`
                                )
                            }
                            if (
                                !isInputValueExist(
                                    employee_compensation?.[positionIndex]?.upfront_pay_amount
                                )
                            )
                                return CustomToast.error(`Enter ${positionName} upfront pay amount`)
                            if (!employee_compensation?.[positionIndex]?.upfront_sale_type)
                                return CustomToast.error(`Select ${positionName} upfront sale type`)
                        }

                        if (positionDetail?.reconciliation) {
                            if (
                                !employee_compensation?.[positionIndex]?.withheld_effective_date &&
                                userType == USER_TYPE.hiredEmployee
                            ) {
                                return CustomToast.error(
                                    `Select ${positionName}  Withheld Effective Date`
                                )
                            }
                            if (
                                !isInputValueExist(
                                    employee_compensation?.[positionIndex]?.withheld_amount
                                )
                            )
                                return CustomToast.error(`Enter ${positionName} withheld amount`)
                            if (!employee_compensation?.[positionIndex]?.withheld_type)
                                return CustomToast.error(
                                    `Select ${positionName} withheld sale type`
                                )
                        }

                        // Self Gen Specific
                        // if (!isInputValueExist(employeeData?.commission_selfgen))
                        //     return CustomToast.error('Enter self gen comission')
                        // if (
                        //     !employeeData?.commission_selfgen_effective_date &&
                        //     userType == USER_TYPE.hiredEmployee
                        // )
                        //     return CustomToast.error('Select self gen comission effective date')
                    }

                    if (forValidationOnly) return resolve('success')

                    const body = {
                        user_id: employeeData.id,
                        employee_compensation: employee_compensation,
                        commission_selfgen: employeeData?.self_gen_accounts
                            ? employeeData?.commission_selfgen
                            : null,
                        commission_selfgen_effective_date: employeeData?.self_gen_accounts
                            ? getValidDate(
                                  employeeData?.commission_selfgen_effective_date,
                                  'YYYY-MM-DD'
                              )
                            : null,
                    }

                    setRedlineLoading(true)
                    if (userType == USER_TYPE.onboardEmployee) {
                        hireNowStep3Service(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setRedlineLoading(false))
                    } else {
                        updateUserCompensationDetailService(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setRedlineLoading(false))
                    }
                }),
            overrideValidation: (forValidationOnly = false) =>
                new Promise((resolve, reject) => {
                    if (
                        !employeeData?.override_effective_date &&
                        userType == USER_TYPE.hiredEmployee
                    ) {
                        return CustomToast.error('Select Override Effective Date')
                    }
                    if (
                        positionAndCompanySetting.firstPosition.overrides.direct &&
                        !isInputValueExist(employeeData.direct_overrides_amount)
                    )
                        return CustomToast.error('Enter direct override amount')
                    if (
                        positionAndCompanySetting.firstPosition.overrides.direct &&
                        !employeeData.direct_overrides_type
                    )
                        return CustomToast.error('Select override type')

                    if (
                        positionAndCompanySetting.firstPosition.overrides.indirect &&
                        !isInputValueExist(employeeData.indirect_overrides_amount)
                    )
                        return CustomToast.error('Enter indirect amount')
                    if (
                        positionAndCompanySetting.firstPosition.overrides.indirect &&
                        !isInputValueExist(employeeData.indirect_overrides_type)
                    )
                        return CustomToast.error('Select indirect type')

                    if (
                        positionAndCompanySetting.firstPosition.overrides.office &&
                        !isInputValueExist(employeeData.office_overrides_amount)
                    )
                        return CustomToast.error('Enter office override amount')
                    if (
                        positionAndCompanySetting.firstPosition.overrides.office &&
                        !isInputValueExist(employeeData.office_overrides_type)
                    )
                        return CustomToast.error('Select office override type')

                    if (
                        SHOW_BASED_ON_HOST.additionalOfficeOverrides &&
                        employeeData?.is_manager &&
                        userAssociatedOffices?.length > 0 &&
                        positionAndCompanySetting.firstPosition.overrides.office
                    ) {
                        const additionalOverrideErros = []
                        userAssociatedOffices?.map((item, index) => {
                            if (
                                !isInputValueExist(
                                    employeeData?.additional_locations?.[index]?.overrides_amount
                                ) ||
                                !employeeData?.additional_locations?.[index]?.overrides_type
                            )
                                additionalOverrideErros.push(
                                    `${item?.office_name}, ${item?.state_name}`
                                )
                        })
                        if (additionalOverrideErros?.length > 0) {
                            return CustomToast.error(
                                `Fill Override data of Office: ${additionalOverrideErros?.join(
                                    ' and '
                                )}`
                            )
                        }
                    } else {
                    }

                    if (
                        positionAndCompanySetting.firstPosition.overrides.stack &&
                        !isInputValueExist(employeeData?.office_stack_overrides_amount)
                    )
                        return CustomToast.error('Enter office stack override amount')

                    if (forValidationOnly) return resolve('success')

                    const additional_office_override = employeeData?.additional_locations?.map(
                        (item) => ({
                            state_id: item?.state_id,
                            office_id: item?.office_id,
                            overrides_amount: item?.overrides_amount,
                            overrides_type: item?.overrides_type,
                        })
                    )
                    const body = {
                        user_id: employeeData.id,
                        employee_override: {
                            override_effective_date: getValidDate(
                                employeeData?.override_effective_date,
                                'YYYY/MM/DD'
                            ),
                            direct_overrides_amount: positionAndCompanySetting.firstPosition
                                .overrides.direct
                                ? employeeData?.direct_overrides_amount
                                : '',
                            direct_overrides_type: positionAndCompanySetting.firstPosition.overrides
                                .direct
                                ? employeeData?.direct_overrides_type
                                : '',
                            indirect_overrides_amount: positionAndCompanySetting.firstPosition
                                .overrides.indirect
                                ? employeeData?.indirect_overrides_amount
                                : '',
                            indirect_overrides_type: positionAndCompanySetting.firstPosition
                                .overrides.indirect
                                ? employeeData?.indirect_overrides_type
                                : '',
                            office_overrides_amount: positionAndCompanySetting.firstPosition
                                .overrides.office
                                ? employeeData?.office_overrides_amount
                                : '',
                            office_overrides_type: positionAndCompanySetting.firstPosition.overrides
                                .office
                                ? employeeData?.office_overrides_type
                                : '',
                            office_stack_overrides_amount: positionAndCompanySetting.firstPosition
                                .overrides.stack
                                ? employeeData?.office_stack_overrides_amount
                                : '',
                        },
                        additional_office_override:
                            SHOW_BASED_ON_HOST.additionalOfficeOverrides &&
                            positionAndCompanySetting.firstPosition.overrides.office &&
                            userAssociatedOffices?.length > 0 &&
                            employeeData?.is_manager
                                ? additional_office_override
                                : [],
                    }

                    setOverrideLoading(true)
                    if (userType == USER_TYPE.onboardEmployee) {
                        hireNowStep4Service(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setOverrideLoading(false))
                    } else {
                        updateUserOverrideDetailService(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setOverrideLoading(false))
                    }
                }),
            agreementValidation: () =>
                new Promise((resolve, reject) => {
                    if (Number(employeeData?.offer_include_bonus) == 1) {
                        if (!isInputValueExist(employeeData.hiring_bonus_amount))
                            return CustomToast.error('Enter hiring bonus amount')
                        if (!employeeData.date_to_be_paid)
                            return CustomToast.error('Select date to be paid')
                    }
                    if (!employeeData.period_of_agreement_start_date)
                        return CustomToast.error('Select agreement start date')
                    if (!employeeData.offer_expiry_date)
                        return CustomToast.error('Select offer expiry date')

                    const body = {
                        user_id: employeeData?.id,
                        employee_agreement: {
                            probation_period: employeeData.probation_period,
                            offer_include_bonus: employeeData.offer_include_bonus,
                            hiring_bonus_amount: employeeData.hiring_bonus_amount,
                            date_to_be_paid: getValidDate(
                                employeeData.date_to_be_paid,
                                'YYYY/MM/DD'
                            ),
                            period_of_agreement: getValidDate(
                                employeeData.period_of_agreement_start_date,
                                'YYYY/MM/DD'
                            ),
                            end_date: getValidDate(employeeData.end_date, 'YYYY/MM/DD'),
                            offer_expiry_date: getValidDate(
                                employeeData.offer_expiry_date,
                                'YYYY/MM/DD'
                            ),
                        },
                    }
                    setAgreementLoading(true)
                    if (userType == USER_TYPE.onboardEmployee) {
                        hireNowStep5Service(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(error?.data?.message)
                                reject(error)
                            })
                            .finally(() => setAgreementLoading(false))
                    } else {
                        updateUserAgreementDetailService(body)
                            .then(() => {
                                resolve('success')
                            })
                            .catch((error) => {
                                CustomToast.error(getErrorMessageFromResponse(error))
                                reject(error)
                            })
                            .finally(() => setAgreementLoading(false))
                    }
                }),
            deductionsValidation: () =>
                new Promise((resolve, reject) => {
                    setDeductionLoading(true)
                    const body = {
                        user_id: employeeData?.id,
                        position_id: employeeData?.sub_position_id,
                        deductions: employeeData?.deduction,
                    }
                    updateUserOverrideDetailService(body)
                        .then(() => {
                            resolve('success')
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                            reject(e)
                        })
                        .finally(() => {
                            setDeductionLoading(false)
                        })
                }),
        }),

        [
            employeeData.first_name,
            employeeData.last_name,
            employeeData.email,
            employeeData?.work_email,
            employeeData.mobile_no,
            employeeData.state_id,
            employeeData.office_id,
            employeeData.recruiter_id,
            employeeData.id,
            employeeData.department_id,
            employeeData.sub_position_id,
            employeeData?.is_manager,
            employeeData.manager_id,
            employeeData.team_id,
            employeeData?.self_gen_accounts,
            employeeData?.additional_locations,
            employeeData.additional_recruter,
            employeeData?.employee_compensation,
            employeeData?.commission_selfgen,
            employeeData?.commission_selfgen_effective_date,
            employeeData?.override_effective_date,
            employeeData.direct_overrides_amount,
            employeeData.direct_overrides_type,
            employeeData.indirect_overrides_amount,
            employeeData.indirect_overrides_type,
            employeeData.office_overrides_amount,
            employeeData.office_overrides_type,
            employeeData?.office_stack_overrides_amount,
            employeeData.offer_include_bonus,
            employeeData.period_of_agreement_start_date,
            employeeData.offer_expiry_date,
            employeeData.probation_period,
            employeeData.hiring_bonus_amount,
            employeeData.date_to_be_paid,
            employeeData.end_date,
            employeeData?.deduction,
            lead_id,
            userType,
            updateEmployeeData,
            allPositionList,
            firstPositionDetail?.deduction,
            bothPositionData.firstPosition?.parentPositionId,
            bothPositionData.firstPosition.name,
            bothPositionData.secondPosition?.parentPositionId,
            bothPositionData.secondPosition.name,
            positionAndCompanySetting.firstPosition,
            positionAndCompanySetting.secondPosition,
            minMAxRedline?.redline_min,
            minMAxRedline?.redline_max,
            userAssociatedOffices,
        ]
    )

    const EditPersonalDetailSection = useMemo(() => {
        return (
            <UserPersonalDetailContainer
                updateMultipleKeysOfEmployeeData={updateMultipleKeysOfEmployeeData}
                updateEmployeeData={updateEmployeeData}
                employeeData={employeeData}
            />
        )
    }, [employeeData, updateEmployeeData, updateMultipleKeysOfEmployeeData])

    const ViewPersonalDetailSection = useMemo(
        () => <ViewPersonolDetailBlock employeeData={employeeData} />,
        [employeeData]
    )

    const EditOrganisationSection = useMemo(() => {
        return (
            <UserOrganisationContainer
                userType={userType}
                teamList={teamList}
                managerList={managerList}
                updateMultipleKeysOfEmployeeData={updateMultipleKeysOfEmployeeData}
                managerLoading={managerLoading}
                updateEmployeeData={updateEmployeeData}
                employeeData={employeeData}
                parentPositionData={parentPositionData}
                getPositionData={getPositionData}
                getEmployeeData={getEmployeeData}
                getTopCardUserProfile={getTopCardUserProfile}
                saveEmploymentPackage={saveEmploymentPackage.organisationValidation}
            />
        )
    }, [
        userType,
        teamList,
        managerList,
        updateMultipleKeysOfEmployeeData,
        managerLoading,
        updateEmployeeData,
        employeeData,
        parentPositionData,
        getPositionData,
        getEmployeeData,
        getTopCardUserProfile,
        saveEmploymentPackage.organisationValidation,
    ])
    const ViewOrganisationSection = useMemo(
        () => <ViewOrganisationBlock employeeData={employeeData} type={userType} />,
        [employeeData, userType]
    )

    const EditRedlineComissionUpfrontSection = useMemo(() => {
        return (
            <>
                <UserRedlineComissionUpfrontContainer
                    userType={userType}
                    firstPositionDetail={firstPositionDetail}
                    secondPositionDetail={secondPositionDetail}
                    updateEmployeeData={updateEmployeeData}
                    employeeData={employeeData}
                    parentPositionData={parentPositionData}
                    setAuditToggleView={() => setAuditToggleView(true)}
                    setSelfGenAuditToggleView={() => setSelfGenAuditToggleView(true)}
                    isStackModalEnabled={isStackModalEnabled}
                    bothPositionData={bothPositionData}
                />
                {auditToggleView ? (
                    <ViewUserRedlineChanges
                        redlineData={employeeData}
                        toggleView={auditToggleView}
                        closeToggle={() => {
                            setAuditToggleView(false)
                        }}
                    />
                ) : null}
                {selfGenAuditToggleView ? (
                    <ViewUserRedlineChanges
                        redlineData={employeeData}
                        toggleView={selfGenAuditToggleView}
                        closeToggle={() => {
                            setSelfGenAuditToggleView(false)
                        }}
                        self_gen={true}
                    />
                ) : null}
            </>
        )
    }, [
        userType,
        firstPositionDetail,
        secondPositionDetail,
        updateEmployeeData,
        employeeData,
        parentPositionData,
        isStackModalEnabled,
        bothPositionData,
        auditToggleView,
        selfGenAuditToggleView,
    ])

    const ViewRedlineComissionUpfrontSection = useMemo(
        () => (
            <>
                <ViewRedlineComissionUpfrontBlock
                    employeeData={employeeData}
                    userType={userType}
                    setToggleView={setToggleView}
                    setSelfGenToggleView={setSelfGenToggleView}
                    parentPositionData={parentPositionData}
                    toggleView={toggleView}
                    key={employeeData?.id}
                    firstPositionDetail={firstPositionDetail}
                    secondPositionDetail={secondPositionDetail}
                    bothPositionData={bothPositionData}
                    isStackModalEnabled={isStackModalEnabled}
                    companySetting={companySetting}
                />
                {toggleView ? (
                    <ViewChanges
                        toggleView={toggleView}
                        closeToggle={() => {
                            setToggleView(false)
                        }}
                        id={employeeData?.id}
                    />
                ) : null}
                {selfGenToggleView ? (
                    <ViewChanges
                        toggleView={selfGenToggleView}
                        closeToggle={() => {
                            setSelfGenToggleView(false)
                        }}
                        id={employeeData?.id}
                    />
                ) : null}
            </>
        ),
        [
            employeeData,
            userType,
            parentPositionData,
            toggleView,
            firstPositionDetail,
            secondPositionDetail,
            bothPositionData,
            isStackModalEnabled,
            companySetting,
            selfGenToggleView,
        ]
    )

    const EditOverridesSection = useMemo(() => {
        return (
            <UserOverridesContainer
                selectedPrimaryOffice={selectedPrimaryOffice}
                userAssociatedOffices={userAssociatedOffices}
                userType={userType}
                firstPositionDetail={firstPositionDetail}
                secondPositionDetail={secondPositionDetail}
                updateEmployeeData={updateEmployeeData}
                employeeData={employeeData}
                isStackModalEnabled={isStackModalEnabled}
            />
        )
    }, [
        selectedPrimaryOffice,
        userAssociatedOffices,
        userType,
        firstPositionDetail,
        secondPositionDetail,
        updateEmployeeData,
        employeeData,
        isStackModalEnabled,
    ])

    const ViewOverridesSection = useMemo(
        () => (
            <ViewOverridesBlock
                selectedPrimaryOffice={selectedPrimaryOffice}
                userAssociatedOffices={userAssociatedOffices}
                employeeData={employeeData}
                firstPositionDetail={firstPositionDetail}
                secondPositionDetail={secondPositionDetail}
                isStackModalEnabled={isStackModalEnabled}
                userType={userType}
                positionAndCompanySetting={positionAndCompanySetting}
            />
        ),
        [
            selectedPrimaryOffice,
            userAssociatedOffices,
            employeeData,
            firstPositionDetail,
            secondPositionDetail,
            isStackModalEnabled,
            userType,
            positionAndCompanySetting,
        ]
    )

    const EditAgreementsSection = useMemo(() => {
        return (
            <UserAgreementsContainer
                updateMultipleKeysOfEmployeeData={updateMultipleKeysOfEmployeeData}
                selectedDocument={selectedDocument}
                setSelectedDocument={setSelectedDocument}
                agreementStep={agreementStep}
                updateEmployeeData={updateEmployeeData}
                employeeData={employeeData}
            />
        )
    }, [
        agreementStep,
        employeeData,
        selectedDocument,
        updateEmployeeData,
        updateMultipleKeysOfEmployeeData,
    ])

    const ViewAgreementsSection = useMemo(
        () => (
            <ViewAgreementsBlock
                employeeData={employeeData}
                getEmployeeData={getEmployeeData}
                userType={userType}
            />
        ),
        [employeeData, getEmployeeData, userType]
    )

    const ViewDeductionsSection = useMemo(
        () => <ViewDeductionsBlock employeeData={employeeData} />,
        [employeeData]
    )

    const EditDeductionsSection = useMemo(() => {
        return (
            <UserDeductionsContainer
                updateEmployeeData={updateEmployeeData}
                employeeData={employeeData}
            />
        )
    }, [employeeData, updateEmployeeData])

    return {
        employeeData,
        setEmployeeData,
        getEmployeeData,
        loading,
        personalDetailLoading,
        organizationLoading,
        parentPositionData,
        redlineLoading,
        overrideLoading,
        agreementLoading,
        deductionLoading,
        saveEmploymentPackage,
        bothPositionData,
        selectedDocument,
        agreementStep,
        setAgreementStep,
        userAssociatedOffices,
        getPositionData,
        isStackModalEnabled,
        firstPositionDetail,
        secondPositionDetail,
        getTopCardUserProfile,
        selectedPrimaryOffice,

        // Edit Section
        EditPersonalDetailSection,
        EditOrganisationSection,
        EditRedlineComissionUpfrontSection,
        EditOverridesSection,
        EditAgreementsSection,
        EditDeductionsSection,

        // View Section
        ViewPersonalDetailSection,
        ViewOrganisationSection,
        ViewRedlineComissionUpfrontSection,
        ViewOverridesSection,
        ViewAgreementsSection,
        ViewDeductionsSection,
    }
}

export default useUserEmploymentPackage
