import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {getRecuiterFilterService} from '../../../../../../../services/Services'
import TrashIcon from '../../../../../../../assets/icons/TrashIcon.png'
import {
    HIRE_FIELD_KEYS,
    MAIN_POSITTIONS_ID,
    SHOW_BASED_ON_HOST,
} from '../../../../../../../constants/constants'
import CustomSearchInput from '../../../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import {useSelector} from 'react-redux'
import {
    getDepartmentWithPositionSelector,
    geyAllStatesWithOfficesSelector,
} from '../../../../../../../redux/selectors/SettingsSelectors'
import _ from 'lodash'
import {getBooleanValue} from '../../../../../../../helpers/CommonHelpers'
import CustomDialog from '../../../../../../../customComponents/customDialog/CustomDialog'
import AssignManagerModal from './AssignManagerModal'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {USER_TYPE} from '../../../../../../../hooks/useUserEmploymentPackage'
import ChangePositionModal from './ChangePositionModal'

const UserOrganisationContainer = ({
    managerList,
    userType = 'onboardEmployee',
    employeeData,
    updateEmployeeData,
    teamList,
    getPositionData,
    parentPositionData,
    updateMultipleKeysOfEmployeeData,
    managerLoading,
    getEmployeeData,
    getTopCardUserProfile,
    saveEmploymentPackage,
}) => {
    const recruiterDataRef = useRef({
        recruiter: employeeData?.recruiter_id,
        additional_recruiter1: employeeData?.additional_recruter?.[0]?.recruiter_id,
        additional_recruiter2: employeeData?.additional_recruter?.[1]?.recruiter_id,
    })
    const [showAssignedManagerDialog, setShowAssignedManagerDialog] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showChangePositionModal, setShowChangePositionModal] = useState(false)

    useEffect(() => {
        recruiterDataRef.current = {
            recruiter: employeeData?.recruiter_id,
            additional_recruiter1: employeeData?.additional_recruter?.[0]?.recruiter_id,
            additional_recruiter2: employeeData?.additional_recruter?.[1]?.recruiter_id,
        }
    }, [employeeData?.recruiter_id, employeeData?.additional_recruter])

    const handleAssignedManagerDialog = useCallback(() => {
        setShowAssignedManagerDialog(!showAssignedManagerDialog)
    }, [showAssignedManagerDialog])

    const reassignManager = useCallback(() => {
        if (userType == USER_TYPE.hiredEmployee && getBooleanValue(employeeData?.is_manager)) {
            if (employeeData?.manager_id) {
                if (employeeData?.total_employee > 0) {
                    CustomDialog.warn(
                        'Are you sure you want to Re-assign all the personnel ?',
                        () => {
                            handleAssignedManagerDialog()
                        },
                        () => {
                            setShowDialog(false)
                        }
                    )
                } else {
                    updateEmployeeData(
                        HIRE_FIELD_KEYS.is_manager,
                        !getBooleanValue(employeeData?.is_manager)
                    )
                }
            } else {
                updateEmployeeData(HIRE_FIELD_KEYS.is_manager, 1)
                CustomToast.error('Please select own manager first')
            }
        } else {
            updateEmployeeData(
                HIRE_FIELD_KEYS.is_manager,
                !getBooleanValue(employeeData?.is_manager)
            )
        }
    }, [
        employeeData?.is_manager,
        employeeData?.manager_id,
        employeeData?.total_employee,
        handleAssignedManagerDialog,
        userType,
        updateEmployeeData,
    ])

    const departmentWithPositionList = useSelector(getDepartmentWithPositionSelector)
    const departmentList = useMemo(() => {
        return departmentWithPositionList?.filter((item) => item?.position?.length > 0)
    }, [departmentWithPositionList])

    const positionList = useMemo(
        () => departmentList?.find((item) => item?.id == employeeData?.department_id)?.position,
        [departmentList, employeeData?.department_id]
    )
    const allStatesWithOffices = useSelector(geyAllStatesWithOfficesSelector)

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }

    const onSeachRecruiter = useCallback(
        (searchText, type) =>
            new Promise((resolve) => {
                getRecuiterFilterService(searchText)
                    .then((res) => {
                        const data = res?.data?.map((item) => ({
                            ...item,
                            name: `${item?.first_name} ${item?.last_name}`,
                        }))
                        let finalData = null
                        if (type == 'recruiter') {
                            finalData = data.filter(
                                (item) =>
                                    ![
                                        recruiterDataRef.current?.additional_recruiter1,
                                        recruiterDataRef.current?.additional_recruiter2,
                                    ].includes(item?.id)
                            )
                        } else if (type == 'add_rec_0') {
                            finalData = data.filter(
                                (item) =>
                                    ![
                                        recruiterDataRef.current?.recruiter,
                                        recruiterDataRef.current?.additional_recruiter2,
                                    ].includes(item?.id)
                            )
                        } else if (type == 'add_rec_1') {
                            finalData = data.filter(
                                (item) =>
                                    ![
                                        recruiterDataRef.current?.recruiter,
                                        recruiterDataRef.current?.additional_recruiter1,
                                    ].includes(item?.id)
                            )
                        }
                        resolve(finalData)
                    })
                    .catch(() => {
                        resolve([])
                    })
            }),
        []
    )

    const onSuccessAssignManager = useCallback(() => {
        setShowAssignedManagerDialog(!showAssignedManagerDialog)
        saveEmploymentPackage(0).then(() => {
            getEmployeeData()
        })
    }, [getEmployeeData, saveEmploymentPackage, showAssignedManagerDialog])

    const managerNames = useMemo(() => {
        const filteredData = managerList?.filter((item) => item?.id != employeeData?.id)
        return filteredData?.map((item) => ({
            ...item,
            name: `${item?.first_name}  ${item?.last_name}`,
        }))
    }, [employeeData?.id, managerList])

    const officeList = useCallback(
        (index) => {
            const offArr = employeeData?.office_id ? [Number(employeeData?.office_id)] : []
            const additionalOfficeArr = employeeData?.additional_locations
                ?.filter((item, ind) => item?.office_id && ind != index)
                ?.map((item) => Number(item?.office_id))
            const finalOfficeArr = [...offArr, ...additionalOfficeArr]
            const stateOfficeList =
                employeeData?.additional_locations?.[index]?.state_id &&
                allStatesWithOffices?.length > 0 &&
                allStatesWithOffices?.find(
                    (item) => item?.id == employeeData?.additional_locations?.[index]?.state_id
                )?.office

            return stateOfficeList?.length > 0
                ? stateOfficeList?.filter((item) => !finalOfficeArr.includes(Number(item?.id)))
                : []
        },
        [allStatesWithOffices, employeeData?.additional_locations, employeeData?.office_id]
    )

    const onChangePositionPress = useCallback(() => {
        setShowChangePositionModal(true)
    }, [])

    const onCloseChangePositionModal = useCallback(() => {
        setShowChangePositionModal(false)
        getEmployeeData()
        getTopCardUserProfile()
    }, [getEmployeeData, getTopCardUserProfile])

    const employeeDataWithTodayEffectiveDate = useMemo(() => {
        if (employeeData?.employee_compensation?.length > 0) {
            let effectiveDate = new Date()
            let employee_compensation = _.cloneDeep(employeeData?.employee_compensation)
            employee_compensation[0].commission_effective_date = effectiveDate
            employee_compensation[0].upfront_effective_date = effectiveDate
            employee_compensation[0].redline_effective_date = effectiveDate
            employee_compensation[0].withheld_effective_date = effectiveDate
            employee_compensation[1].commission_effective_date = effectiveDate
            employee_compensation[1].upfront_effective_date = effectiveDate
            employee_compensation[1].redline_effective_date = effectiveDate
            employee_compensation[1].withheld_effective_date = effectiveDate
            return {...employeeData, override_effective_date: effectiveDate, employee_compensation}
        }
    }, [employeeData])

    return (
        <div
            className='pb-5 mb-sm-15 px-2'
            style={{fontSize: '14px'}}
            data-kt-stepper-element='content'
        >
            {showChangePositionModal ? (
                <ChangePositionModal
                    showChangePositionModal={showChangePositionModal}
                    onCloseChangePositionModal={onCloseChangePositionModal}
                    userType={USER_TYPE.hiredEmployee}
                    empData={employeeDataWithTodayEffectiveDate}
                />
            ) : null}
            <div className='w-sm-75 w-100 mx-auto'>
                {userType === USER_TYPE.hiredEmployee ? (
                    <div className='row align-items-end'>
                        <div className='col-sm text-cmGrey700'>
                            <CustomDropdown
                                label={'Office'}
                                required
                                name={HIRE_FIELD_KEYS.state_id}
                                value={employeeData?.state_id ?? ''}
                                onChange={(e) => {
                                    updateMultipleKeysOfEmployeeData({
                                        ...employeeData,
                                        [HIRE_FIELD_KEYS.state_id]: e?.target?.value,
                                        [HIRE_FIELD_KEYS.office_id]: null,
                                        [HIRE_FIELD_KEYS.manager_id]: null,
                                    })
                                }}
                                options={allStatesWithOffices}
                                valueKey='id'
                                disabled={userType == USER_TYPE.hiredEmployee}
                            />
                        </div>
                        <div className='col-sm '>
                            <CustomDropdown
                                value={employeeData?.office_id}
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.office_id}
                                options={
                                    allStatesWithOffices?.find(
                                        (item) => item?.id == employeeData?.state_id
                                    )?.office
                                }
                                valueKey='id'
                                displayKey='office_name'
                                disabled={userType == USER_TYPE.hiredEmployee}
                            />
                        </div>
                    </div>
                ) : null}

                <div className='mt-4 '>
                    <div className='row -align-items-center'>
                        <div className='col-sm text-cmGrey700'>
                            <div className=''>
                                <CustomDropdown
                                    label={'Department'}
                                    required
                                    disabled={userType == USER_TYPE.hiredEmployee}
                                    showClear={false}
                                    options={departmentList}
                                    placeholder='Select Department'
                                    name={HIRE_FIELD_KEYS.department_id}
                                    value={employeeData.department_id ?? ''}
                                    valueKey='id'
                                    onChange={(e) => {
                                        updateMultipleKeysOfEmployeeData({
                                            ...employeeData,
                                            [HIRE_FIELD_KEYS.position_id]: null,
                                            [HIRE_FIELD_KEYS.sub_position_id]: null,
                                            [HIRE_FIELD_KEYS.department_id]: e?.target?.value,
                                        })
                                    }}
                                />
                                <div className='row d-flex mt-5 justify-content-center align-items-center'>
                                    <div
                                        className='col text-cmGrey700 d-flex flex-wrap align-items-center'
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <div className='me-2'>
                                            <CustomCheckbox
                                                checked={
                                                    getBooleanValue(employeeData?.is_manager) == 1
                                                }
                                                onChange={(e) => {
                                                    reassignManager()
                                                }}
                                            />
                                        </div>
                                        Is Manager ?
                                        {showDialog
                                            ? CustomDialog.warn(
                                                  'Are you sure you want to Re-assign all the personnel ?',
                                                  () => {
                                                      handleAssignedManagerDialog()
                                                  },
                                                  () => {
                                                      setShowDialog(false)
                                                      onChangeInputData({
                                                          target: {
                                                              name: HIRE_FIELD_KEYS.is_manager,
                                                              value: !getBooleanValue(
                                                                  employeeData?.is_manager
                                                              ),
                                                          },
                                                      })
                                                  }
                                              )
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm text-cmGrey700'>
                            <div className=''>
                                <CustomDropdown
                                    showLink={userType == USER_TYPE.hiredEmployee}
                                    linkLabel='Change'
                                    onLinkPress={onChangePositionPress}
                                    disabled={userType == USER_TYPE.hiredEmployee}
                                    label={'Position'}
                                    required
                                    showClear={false}
                                    options={positionList}
                                    placeholder='Select Position'
                                    valueKey='id'
                                    onChange={(e) => {
                                        getPositionData(e?.target?.value, false, true)
                                    }}
                                    name={HIRE_FIELD_KEYS.sub_position_id}
                                    value={employeeData.sub_position_id ?? ''}
                                    displayKey='position_name'
                                />
                                <div className='mt-5 d-flex align-itmes-center gap-3 mt-5'>
                                    <CustomCheckbox
                                        disable={userType == USER_TYPE.hiredEmployee}
                                        checked={
                                            getBooleanValue(employeeData?.self_gen_accounts) == 1
                                                ? true
                                                : false
                                        }
                                        onChange={(e) => {
                                            const val =
                                                getBooleanValue(employeeData?.self_gen_accounts) ==
                                                1
                                                    ? 0
                                                    : 1
                                            if (val) {
                                                getPositionData(
                                                    MAIN_POSITTIONS_ID.closer ==
                                                        parentPositionData?.id
                                                        ? MAIN_POSITTIONS_ID.setter
                                                        : MAIN_POSITTIONS_ID.closer,
                                                    true,
                                                    true
                                                )
                                            } else {
                                                updateEmployeeData(
                                                    HIRE_FIELD_KEYS.self_gen_accounts,
                                                    val
                                                )
                                            }
                                        }}
                                    />

                                    <span
                                        className='text-cmGrey700 text-wrap'
                                        style={{fontWeight: 600}}
                                    >
                                        May act as both setter and closer
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-5'>
                    <div className='row align-items-center'>
                        <div className='col-sm'>
                            <CustomDropdown
                                label={'Manager'}
                                required={
                                    getBooleanValue(employeeData?.is_manager) == 0 ? true : false
                                }
                                options={managerNames}
                                placeholder={managerLoading ? 'Loading...' : 'Select Manager'}
                                valueKey='id'
                                displayKey='name'
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.manager_id}
                                value={employeeData?.manager_id ?? ''}
                            />
                        </div>
                        <div className='col-sm'>
                            <CustomDropdown
                                required={SHOW_BASED_ON_HOST?.teamRequiredForOnboarding}
                                label={'Team'}
                                options={teamList}
                                placeholder={managerLoading ? 'Loading...' : 'Select Team'}
                                valueKey='id'
                                displayKey='team_name'
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.team_id}
                                value={employeeData.team_id ?? ''}
                            />
                        </div>
                    </div>
                </div>
                {getBooleanValue(employeeData?.is_manager) == 1 ? (
                    <div
                        className='text-cmGrey700 mt-9'
                        style={{fontWeight: '600', fontFamily: 'Manrope'}}
                    >
                        <div className='mb-2'> Additional Office Location</div>
                        {employeeData?.additional_locations?.map((item, index) => (
                            <div className='d-flex flex-wrap mb-4 gap-3' key={index}>
                                <div
                                    className='text-cmGrey700'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    {/* Additional Office Location<label className='text-cmError'>*</label> */}
                                    <label className='d-flex w-175px flex-row'>
                                        <CustomDropdown
                                            options={allStatesWithOffices}
                                            placeholder={'Select State'}
                                            valueKey='id'
                                            value={item?.state_id}
                                            onChange={(e) => {
                                                const temp = [...employeeData?.additional_locations]
                                                temp[index].state_id = e.target.value
                                                onChangeInputData({
                                                    target: HIRE_FIELD_KEYS.additional_locations,
                                                    value: temp,
                                                })
                                            }}
                                        />
                                    </label>
                                </div>
                                <div
                                    className=''
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                    }}
                                >
                                    <label className='d-flex w-175px flex-row'>
                                        <CustomDropdown
                                            options={officeList(index)}
                                            placeholder={'Select Office'}
                                            valueKey='id'
                                            displayKey='office_name'
                                            value={item?.office_id ?? ''}
                                            onChange={(e) => {
                                                const temp = [...employeeData?.additional_locations]
                                                temp[index].office_id = e.target.value
                                                onChangeInputData({
                                                    target: HIRE_FIELD_KEYS.additional_locations,
                                                    value: temp,
                                                })
                                            }}
                                            name={HIRE_FIELD_KEYS.office_id}
                                        />
                                    </label>
                                </div>
                                <div
                                    className='col-sm-2 cursor-pointer '
                                    style={{
                                        alignSelf: 'center',
                                        fontWeight: '600',
                                        fontFamily: 'Manrope',
                                    }}
                                    onClick={() => {
                                        const temp = [...employeeData?.additional_locations]
                                        const finalTemp = temp?.filter((im, ind) => ind != index)
                                        onChangeInputData({
                                            target: {
                                                name: HIRE_FIELD_KEYS.additional_locations,
                                                value: finalTemp,
                                            },
                                        })
                                    }}
                                >
                                    <img src={TrashIcon} alt='' width={32} />
                                </div>
                            </div>
                        ))}
                        <ul
                            style={{
                                fontFamily: 'Manrope',
                                fontSize: '14px',
                            }}
                            className='nav nav-stretch  nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap text-cmBlue-Crayola cursor-pointer'
                        >
                            {employeeData?.additional_locations?.length < 5 && (
                                <li className='nav-item d-flex mb-5'>
                                    <div
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                        }}
                                        className='d-flex text-center align-item-center justify-content-center border border-cmBlue-Crayola border-2'
                                    >
                                        <b style={{marginTop: '-5px'}}>+</b>
                                    </div>
                                </li>
                            )}
                            <li
                                className='ms-2 text-cmBlue-Crayola'
                                style={{
                                    fontSize: '14px',
                                    textDecoration: 'underline',
                                    padding: '0px',
                                    marginTop: '-3px',
                                    fontWeight: 600,
                                }}
                                onClick={() => {
                                    onChangeInputData({
                                        target: {
                                            name: HIRE_FIELD_KEYS.additional_locations,
                                            value: [
                                                ...employeeData?.additional_locations,
                                                {
                                                    state_id: null,
                                                    office_id: null,
                                                },
                                            ],
                                        },
                                    })
                                }}
                            >
                                Add Location
                            </li>
                        </ul>
                    </div>
                ) : null}
                <div className='mt-7 '>
                    <div className='row'>
                        <div
                            className='col-sm-12 text-cmGrey700'
                            style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                        >
                            <div className='mb-1'>Recruiter</div>
                            <div className='d-flex'>
                                <CustomSearchInput
                                    style={{width: '98%'}}
                                    zIndex={30}
                                    onSearch={(text) => onSeachRecruiter(text, 'recruiter')}
                                    onSelectValue={(value) => {
                                        updateMultipleKeysOfEmployeeData({
                                            ...employeeData,
                                            [HIRE_FIELD_KEYS.recruiter_id]: value?.id,
                                            [HIRE_FIELD_KEYS.recruiter_name]: value?.name,
                                        })
                                    }}
                                    selectedValue={employeeData?.recruiter_name}
                                />
                                {employeeData?.recruiter_id ? (
                                    <div
                                        className='cursor-pointer  bg-cmError px-3 btn btn-sm d-flex align-items-center justify-content-center bg-opacity-10 '
                                        onClick={() => {
                                            const data = [...employeeData?.additional_recruter]
                                            data[0] = {
                                                ...data?.[0],
                                                recruiter_id: null,
                                                recruiter_first_name: null,
                                                recruiter_last_name: null,
                                            }
                                            data[1] = {
                                                ...data?.[1],
                                                recruiter_id: null,
                                                recruiter_first_name: null,
                                                recruiter_last_name: null,
                                            }
                                            updateMultipleKeysOfEmployeeData({
                                                ...employeeData,
                                                [HIRE_FIELD_KEYS.recruiter_id]: null,
                                                [HIRE_FIELD_KEYS.recruiter_name]: null,
                                                [HIRE_FIELD_KEYS.additional_recruter]: data,
                                            })
                                        }}
                                    >
                                        <i className=' bi bi-x text-cmError fs-1' />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                {employeeData?.recruiter_id ? (
                    <>
                        <div className=' mt-7'>
                            <div className='d-flex flex-wrap justify-content-between gap-5 '>
                                <div
                                    className='text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Additional Recruiter
                                    <label
                                        className='text-cmGrey500'
                                        style={{fontWeight: 600, fontSize: '12px'}}
                                    >
                                        {' '}
                                        (or Override)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='row'>
                                <div style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                                    <label className=' d-flex'>
                                        <CustomSearchInput
                                            style={{width: '100%'}}
                                            onSearch={(text) => onSeachRecruiter(text, 'add_rec_0')}
                                            onSelectValue={(value) => {
                                                const data = [...employeeData?.additional_recruter]
                                                data[0] = {
                                                    ...data?.[0],
                                                    recruiter_id: value?.id,
                                                    recruiter_first_name: value?.first_name,
                                                    recruiter_last_name: value?.last_name,
                                                }
                                                onChangeInputData({
                                                    target: {
                                                        name: HIRE_FIELD_KEYS.additional_recruter,
                                                        value: data,
                                                    },
                                                })
                                            }}
                                            zIndex={10}
                                            selectedValue={
                                                employeeData?.additional_recruter?.[0]
                                                    ?.recruiter_first_name
                                                    ? `${employeeData?.additional_recruter?.[0]?.recruiter_first_name} ${employeeData?.additional_recruter?.[0]?.recruiter_last_name}`
                                                    : null
                                            }
                                        />
                                        {employeeData?.additional_recruter?.[0]?.recruiter_id ? (
                                            <div
                                                className='cursor-pointer  bg-cmError px-3 ms-5 btn btn-sm d-flex align-items-center justify-content-center bg-opacity-10 '
                                                onClick={() => {
                                                    const data = [
                                                        ...employeeData?.additional_recruter,
                                                    ]
                                                    data[0] = {
                                                        ...data?.[0],
                                                        recruiter_id: null,
                                                        recruiter_first_name: null,
                                                        recruiter_last_name: null,
                                                    }
                                                    updateMultipleKeysOfEmployeeData({
                                                        ...employeeData,
                                                        [HIRE_FIELD_KEYS.additional_recruter]: data,
                                                    })
                                                }}
                                            >
                                                <i className=' bi bi-x text-cmError fs-1' />
                                            </div>
                                        ) : null}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='row'>
                                <div style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                                    <label className=' d-flex'>
                                        <CustomSearchInput
                                            style={{width: '100%'}}
                                            onSearch={(text) => onSeachRecruiter(text, 'add_rec_1')}
                                            onSelectValue={(value) => {
                                                const data = [...employeeData?.additional_recruter]
                                                data[1] = {
                                                    ...data?.[1],
                                                    recruiter_id: value?.id,
                                                    recruiter_first_name: value?.first_name,
                                                    recruiter_last_name: value?.last_name,
                                                }
                                                onChangeInputData({
                                                    target: {
                                                        name: HIRE_FIELD_KEYS.additional_recruter,
                                                        value: data,
                                                    },
                                                })
                                            }}
                                            zIndex={1}
                                            selectedValue={
                                                employeeData?.additional_recruter?.[1]
                                                    ?.recruiter_first_name
                                                    ? `${employeeData?.additional_recruter?.[1]?.recruiter_first_name} ${employeeData?.additional_recruter?.[1]?.recruiter_last_name}`
                                                    : null
                                            }
                                        />
                                        {employeeData?.additional_recruter?.[1]?.recruiter_id ? (
                                            <div
                                                className='cursor-pointer  bg-cmError px-3 ms-5 btn btn-sm d-flex align-items-center justify-content-center bg-opacity-10 '
                                                onClick={() => {
                                                    const data = [
                                                        ...employeeData?.additional_recruter,
                                                    ]
                                                    data[1] = {
                                                        ...data?.[1],
                                                        recruiter_id: null,
                                                        recruiter_first_name: null,
                                                        recruiter_last_name: null,
                                                    }
                                                    updateMultipleKeysOfEmployeeData({
                                                        ...employeeData,
                                                        [HIRE_FIELD_KEYS.additional_recruter]: data,
                                                    })
                                                }}
                                            >
                                                <i className=' bi bi-x text-cmError fs-1' />
                                            </div>
                                        ) : null}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
            <AssignManagerModal
                show={showAssignedManagerDialog}
                handleClose={handleAssignedManagerDialog}
                employeeData={employeeData}
                onSuccess={onSuccessAssignManager}
            />
        </div>
    )
}

export default UserOrganisationContainer
