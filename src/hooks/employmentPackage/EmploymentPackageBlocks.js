import {useCallback, useEffect, useState} from 'react'
import {getValidDate, SHOW_BASED_ON_HOST} from '../../constants/constants'
import CustomNoData from '../../customComponents/customNoData/CustomNoData'
import {
    formattedNumberFields,
    formattedPhoneNumber,
    getBooleanValue,
    getErrorMessageFromResponse,
} from '../../helpers/CommonHelpers'
import {updateHireDateOfEmployeeService} from '../../services/Services'
import CustomToast from '../../customComponents/customToast/CustomToast'
import CustomModal from '../../customComponents/customModal/CustomModal'
import CustomLoader from '../../customComponents/customLoader/CustomLoader'
import CustomDatePicker from '../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomButton, {BUTTON_TYPE} from '../../customComponents/customButtton/CustomButton'
import {USER_TYPE} from '../useUserEmploymentPackage'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCompanyOverrideSettingSelector} from '../../redux/selectors/SettingsSelectors'
import CustomViewChnagesEmployementPackageModal, {
    MODAL_NAME,
} from '../../app/modules/standard_manager/management/particularEmployee/compoents/EmpolymentPackageViewChangesModals.js/CustomViewChnagesEmployementPackageModal'
import CustomEditIcon from '../../customComponents/customIcons/CustomEditIcon'
import CustomLink from '../../customComponents/customButtton/CustomLink'
import AccessRights from '../../accessRights/AccessRights'
import useCustomAccessRights from '../../accessRights/useCustomAccessRights'

const CommonTableRow = ({
    fieldName = null,
    fieldValue = null,
    showViewChangesButton = false,
    showEditButton,
    onEditButtonPress,
    onViewChangesPress = () => {},
    equalColumn = false,
}) => (
    <div
        className={`px-10 py-4 d-flex flex-wrap align-items-center stripRow 
            justify-content-between 
        `}
        style={{
            fontSize: '14px',
            fontFamily: 'Manrope',
            fontWeight: 600,
        }}
    >
        <div className={`${equalColumn ? 'col-xxl-6' : 'col-xxl-4'} text-cmBlack`}>
            {fieldName}:
        </div>
        <div className={` ${equalColumn ? 'col-xxl-6' : 'col-xxl-8'}`}>
            <div className='d-flex flex-wrap gap-2 gap-sm-5 align-items-center justify-content-between'>
                <div className='text-cmGrey600'>{fieldValue}</div>
                {showViewChangesButton ? (
                    <div className=''>
                        <CustomLink label={'View Changes'} onClick={onViewChangesPress} />
                    </div>
                ) : null}
                {showEditButton ? <CustomEditIcon onClick={onEditButtonPress} /> : null}
            </div>
        </div>
    </div>
)

const ViewPersonolDetailBlock = ({employeeData}) => (
    <div>
        <div className='w-100'>
            <div className='px-10 py-4 stripRow'>
                <div className='d-flex flex-wrap justify-content-between gap-3 '>
                    <div
                        className='col-sm text-cmGrey900 d-flex flex-wrap'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                    >
                        First Name:{' '}
                        {<span className='ms-2 text-cmGrey700'>{employeeData?.first_name}</span>}
                    </div>
                    <div
                        className='col-sm text-cmGrey900 d-flex flex-wrap'
                        style={{
                            fontFamily: 'Manrope',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Last Name:{' '}
                        {<span className='ms-2 text-cmGrey700'>{employeeData?.last_name}</span>}
                    </div>
                </div>
            </div>
            <div className='px-10 py-4 d-flex flex-wrap justify-content-between stripRow gap-3'>
                <div className='d-flex flex-wrap justify-content-between gap-3'>
                    <div
                        className='col-sm-12 text-cmGrey900'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                    >
                        Email: {<span className='text-cmGrey700'>{employeeData?.email}</span>}
                    </div>
                </div>
            </div>
            <div className='px-10 py-4 d-flex flex-wrap justify-content-between stripRow gap-3'>
                <div className='d-flex flex-wrap justify-content-between gap-3'>
                    <div
                        className='col-sm-12 text-cmGrey900'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                    >
                        Work Email:{' '}
                        {
                            <span className='text-cmGrey700'>
                                {employeeData?.work_email?.map((i) => i?.email).join(', ')}
                            </span>
                        }
                    </div>
                </div>
            </div>
            <div className='px-10 py-4 d-flex flex-wrap justify-content-between stripRow gap-3'>
                <div className='d-flex flex-wrap justify-content-between'>
                    <div
                        className='col-sm-12 text-cmGrey900'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                    >
                        Phone Number:{' '}
                        {
                            <span className='ms-2 text-cmGrey700'>
                                {formattedPhoneNumber(employeeData?.mobile_no)}
                            </span>
                        }
                    </div>
                </div>
            </div>
            <div className='px-10 py-4 d-flex flex-wrap justify-content-between stripRow gap-3'>
                <div className='d-flex flex-wrap gap-3'>
                    <div
                        className=' text-cmGrey900 d-flex flex-wrap gap-3'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                    >
                        Office:{' '}
                        <span className='text-cmGrey700 d-flex flex-wrap'>
                            {employeeData?.office?.office_name}, {employeeData?.office?.state?.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const ViewOrganisationBlock = ({employeeData, type}) => {
    return (
        <div className='pb-5' style={{fontSize: '14px'}}>
            <div className='w-100 '>
                {type == USER_TYPE.hiredEmployee ? (
                    <div
                        className='stripRow gap-3 d-flex flex-wrap justify-content-between px-10 py-4'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                    >
                        <div className='col-sm d-flex align-items-center gap-3'>
                            <div className='text-cmBlack text-nowrap' style={{}}>
                                Office State:
                            </div>
                            <div className='text-cmGrey600 text-nowrap'>
                                {employeeData?.office?.state?.name}
                            </div>
                        </div>
                        <div className='col-sm d-flex align-items-center gap-3'>
                            <div className='text-cmBlack text-nowrap'> Office Name:</div>
                            <div className='text-cmGrey600 text-nowrap'>
                                {employeeData?.office?.office_name}
                            </div>
                        </div>
                    </div>
                ) : null}

                <div
                    className='px-10 gap-3 py-4 d-flex flex-wrap justify-content-between stripRow '
                    style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                >
                    <div className='d-flex col-sm col-12 align-items-center gap-3 '>
                        <div className='text-cmBlack text-nowrap' style={{}}>
                            Department:
                        </div>
                        <div className='text-cmGrey600 text-nowrap'>
                            {employeeData?.department_name}
                        </div>
                    </div>
                    <div className='d-flex col-sm col-12 align-items-center gap-3'>
                        <div className='text-cmBlack text-nowrap'> Position:</div>
                        <div className='text-cmGrey600 text-nowrap'>
                            {employeeData?.sub_position_name}
                        </div>
                    </div>
                </div>

                <div
                    className='px-10 gap-3 py-4 d-flex flex-wrap justify-content-between stripRow '
                    style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                >
                    <div className='d-flex col-sm col-12 align-items-center gap-3'>
                        <div className='text-cmBlack text-nowrap' style={{}}>
                            Manager:
                        </div>
                        <div className='text-cmGrey600 text-nowrap'>
                            {employeeData?.manager_name}
                        </div>
                    </div>
                    <div className='d-flex col-sm col-12 align-items-center gap-3'>
                        <div className='text-cmBlack text-nowrap'> Team:</div>
                        <div className='text-cmGrey600 text-nowrap'>{employeeData?.team_name}</div>
                    </div>
                </div>

                <div
                    className='px-10 py-4 gap-3 d-flex flex-wrap justify-content-between stripRow '
                    style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                >
                    <div className='col-sm d-flex align-items-center gap-3'>
                        <div className='text-cmBlack text-nowrap' style={{}}>
                            Is Manager:
                        </div>
                        <div className='text-cmGrey600 text-nowrap'>
                            {employeeData?.is_manager == 1 ? 'Yes' : 'No'}
                        </div>
                    </div>
                    <div className='col-sm d-flex align-items-center gap-3'>
                        <div className='text-cmBlack text-nowrap' style={{fontSize: 14}}>
                            May act as both setter and closer
                        </div>
                        <div className='text-cmGrey600 text-nowrap'>
                            {getBooleanValue(employeeData?.self_gen_accounts) == 1 ? 'Yes' : 'No'}
                        </div>
                    </div>
                </div>

                {employeeData.is_manager == 1 && employeeData?.additional_locations?.length > 0 ? (
                    <div
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                        className='stripRow'
                    >
                        <div
                            className='text-cmBlack gap-3 px-10 py-4 d-flex flex-wrap justify-content-between text-decoration-underline'
                            style={{fontSize: '15px', fontFamily: 'Manrope'}}
                        >
                            Additional Office Location:
                        </div>
                        {employeeData?.additional_locations?.map((item) => (
                            <div
                                className='px-10 py-4 d-flex flex-wrap justify-content-between stripRow '
                                key={item?.state_id}
                            >
                                <div className='col-sm d-flex align-items-center gap-3'>
                                    <div className='text-cmBlack text-nowrap'> Office State:</div>
                                    <div className='text-cmGrey600 text-nowrap'>
                                        {item?.state_name}
                                    </div>
                                </div>
                                <div className='d-flex col-sm col-12 align-items-center gap-3'>
                                    <div className='text-cmBlack text-nowrap'> Office Name:</div>
                                    <div className='text-cmGrey600 text-nowrap'>
                                        {item?.office_name ? item?.office_name : '-'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}

                <div
                    className='px-10 py-4 d-flex flex-wrap gap-3 stripRow '
                    style={{fontFamily: 'Manrope'}}
                >
                    <div className='text-cmBlack text-nowrap' style={{fontWeight: 600}}>
                        {' '}
                        Recruiter:
                    </div>
                    <div className='text-cmGrey600 text-nowrap ' style={{fontWeight: 600}}>
                        {employeeData?.recruiter_name ?? 'NA'}
                    </div>
                </div>

                {employeeData?.recruiter_id ? (
                    <>
                        <div
                            className='px-10 py-4 d-flex flex-wrap justify-content-between stripRow gap-3'
                            style={{fontWeight: 600}}
                        >
                            <div
                                className='col-sm text-nowrap text-cmBlack  '
                                style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                            >
                                Additional Recruiter
                                <span
                                    className='text-cmGrey500 text-nowrap'
                                    style={{fontWeight: 600, fontSize: '12px'}}
                                >
                                    (or Override):
                                </span>
                            </div>
                            <div className='col-sm text-cmGrey600 '>
                                {employeeData?.additional_recruter.length > 0
                                    ? employeeData?.additional_recruter?.map((item, index) => (
                                          <span
                                              key={index}
                                              className='text-cmGrey900'
                                              style={{fontWeight: 600}}
                                          >
                                              {index == 1 && item?.recruiter_first_name && (
                                                  <label
                                                      className='mx-2 text-cmGrey500'
                                                      style={{fontWeight: 600, fontSize: '12px'}}
                                                  >
                                                      and
                                                  </label>
                                              )}
                                              {item?.recruiter_first_name}{' '}
                                              {item?.recruiter_last_name}
                                          </span>
                                      ))
                                    : null}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

const ViewRedlineComissionUpfrontBlock = ({
    employeeData,
    userType,
    firstPositionDetail,
    secondPositionDetail,
    bothPositionData,
    isStackModalEnabled,
    companySetting,
}) => {
    const [selectedPositionIndex, setSelectedPositionIndex] = useState(0)
    const [modalType, setModalType] = useState(MODAL_NAME.Commission)
    const [showModal, setShowModal] = useState(false)

    const handleHistoryModalClose = () => {
        setShowModal(false)
    }

    return (
        <div className='pb-5' style={{fontSize: '14px'}} key={employeeData?.id}>
            {showModal ? (
                <CustomViewChnagesEmployementPackageModal
                    show={showModal}
                    modalName={modalType}
                    handleClose={handleHistoryModalClose}
                    title={`${modalType} Changes - ${employeeData?.first_name} ${employeeData?.last_name}`}
                    userId={employeeData?.id}
                    PositionId={
                        bothPositionData?.[
                            selectedPositionIndex == 0 ? 'firstPosition' : 'secondPosition'
                        ]?.parentPositionId
                    }
                />
            ) : null}
            <div className='w-100'>
                {(employeeData?.self_gen_accounts ? [0, 1] : [0])?.map((positionIndex) => {
                    const positionDetail =
                        positionIndex == 0 ? firstPositionDetail : secondPositionDetail
                    const positionName =
                        positionIndex == 0
                            ? bothPositionData?.firstPosition.name
                            : bothPositionData?.secondPosition?.name

                    const data = employeeData?.employee_compensation?.[positionIndex]
                    return (
                        <>
                            <CommonTableRow
                                fieldName={`${positionName} Commissions`}
                                fieldValue={
                                    <>
                                        {data?.commission}%
                                        {userType == USER_TYPE.hiredEmployee &&
                                            data?.commission_effective_date && (
                                                <>
                                                    <span style={{opacity: 0.5}}> since </span>{' '}
                                                    {getValidDate(data?.commission_effective_date)}
                                                </>
                                            )}
                                    </>
                                }
                                showViewChangesButton={userType == USER_TYPE.hiredEmployee}
                                onViewChangesPress={() => {
                                    setShowModal(true)
                                    setModalType(MODAL_NAME.Commission)
                                    setSelectedPositionIndex(positionIndex)
                                }}
                            />

                            <CommonTableRow
                                fieldName={`${positionName} Redline Type`}
                                fieldValue={data?.redline_amount_type}
                            />

                            <CommonTableRow
                                fieldName={
                                    <>
                                        {positionName}
                                        {isStackModalEnabled &&
                                        positionIndex == 0 &&
                                        positionName == 'Closer'
                                            ? ' and Stack'
                                            : ''}{' '}
                                        Redline
                                    </>
                                }
                                fieldValue={
                                    <>
                                        {data?.redline} {data?.redline_type}
                                        {userType == USER_TYPE.hiredEmployee &&
                                            data?.redline_effective_date && (
                                                <>
                                                    <span style={{opacity: 0.5}}> since </span>{' '}
                                                    {getValidDate(data?.redline_effective_date) ??
                                                        '-'}
                                                </>
                                            )}
                                    </>
                                }
                                showViewChangesButton={userType == USER_TYPE.hiredEmployee}
                                onViewChangesPress={() => {
                                    setShowModal(true)
                                    setModalType(MODAL_NAME.Redline)
                                    setSelectedPositionIndex(positionIndex)
                                }}
                            />

                            {positionDetail?.upfront_status ? (
                                <CommonTableRow
                                    fieldName={`${positionName} Upfront Pay`}
                                    fieldValue={
                                        <>
                                            {data?.upfront_pay_amount} {data?.upfront_sale_type}
                                            {userType == USER_TYPE.hiredEmployee &&
                                                data?.upfront_effective_date && (
                                                    <>
                                                        <span style={{opacity: 0.5}}> since </span>{' '}
                                                        {getValidDate(
                                                            data?.upfront_effective_date
                                                        ) ?? '-'}
                                                    </>
                                                )}
                                        </>
                                    }
                                    showViewChangesButton={userType == USER_TYPE.hiredEmployee}
                                    onViewChangesPress={() => {
                                        setShowModal(true)
                                        setModalType(MODAL_NAME.Upfront)
                                        setSelectedPositionIndex(positionIndex)
                                    }}
                                />
                            ) : null}

                            {companySetting?.reconciliation &&
                            positionDetail?.reconciliation_status ? (
                                <CommonTableRow
                                    fieldName={`${positionName} Withheld amount`}
                                    fieldValue={
                                        <>
                                            {data?.withheld_amount} {data?.withheld_type}
                                            {userType == USER_TYPE.hiredEmployee &&
                                                data?.withheld_effective_date && (
                                                    <>
                                                        <span style={{opacity: 0.5}}> since </span>{' '}
                                                        {getValidDate(
                                                            data?.withheld_effective_date
                                                        ) ?? '-'}
                                                    </>
                                                )}
                                        </>
                                    }
                                    showViewChangesButton={userType == USER_TYPE.hiredEmployee}
                                    onViewChangesPress={() => {
                                        setShowModal(true)
                                        setModalType(MODAL_NAME.Withheld)
                                        setSelectedPositionIndex(positionIndex)
                                    }}
                                />
                            ) : null}
                        </>
                    )
                })}
            </div>
        </div>
    )
}

const ViewOverridesBlock = ({
    employeeData,
    firstPositionDetail,
    isStackModalEnabled,
    selectedPrimaryOffice,
    userType,
    userAssociatedOffices,
    positionAndCompanySetting,
}) => {
    const companyOverrideSetting = useSelector(getCompanyOverrideSettingSelector)
    return (
        <div className='pb-5' style={{fontSize: '14px'}}>
            {firstPositionDetail?.override?.[0]?.status ||
            firstPositionDetail?.override?.[1]?.status ||
            firstPositionDetail?.override?.[2]?.status ||
            (isStackModalEnabled && firstPositionDetail?.override?.[3]?.status) ? (
                <div className='w-100'>
                    {/* Effective Date */}
                    {userType == USER_TYPE.hiredEmployee &&
                        employeeData?.override_effective_date && (
                            <CommonTableRow
                                equalColumn
                                fieldName={'Effective Date'}
                                fieldValue={
                                    getValidDate(employeeData?.override_effective_date) ?? '-'
                                }
                            />
                        )}

                    {/* Direct Overrides */}
                    {firstPositionDetail?.override?.[0]?.status ? (
                        <CommonTableRow
                            equalColumn
                            fieldName={'Direct Overrides'}
                            fieldValue={
                                <>
                                    {employeeData?.direct_overrides_amount}{' '}
                                    {employeeData?.direct_overrides_type == 'percent'
                                        ? '%'
                                        : employeeData?.direct_overrides_type}
                                </>
                            }
                        />
                    ) : null}

                    {/* Indirect Overrides */}
                    {firstPositionDetail?.override?.[1]?.status ? (
                        <CommonTableRow
                            equalColumn
                            fieldName={'Indirect Overrides'}
                            fieldValue={
                                <>
                                    {employeeData?.indirect_overrides_amount}{' '}
                                    {employeeData?.indirect_overrides_type == 'percent'
                                        ? '%'
                                        : employeeData?.indirect_overrides_type}
                                </>
                            }
                        />
                    ) : (
                        <></>
                    )}

                    {/* Office Overrides */}
                    {firstPositionDetail?.override?.[2]?.status ? (
                        <>
                            <CommonTableRow
                                equalColumn
                                fieldName={'Office Overrides'}
                                fieldValue={''}
                            />
                            <CommonTableRow
                                equalColumn
                                fieldName={`↳  Office : ${selectedPrimaryOffice?.office_name}, ${selectedPrimaryOffice?.state_name} `}
                                fieldValue={
                                    <>
                                        {employeeData?.office_overrides_amount}{' '}
                                        {employeeData?.office_overrides_type == 'percent'
                                            ? '%'
                                            : employeeData?.office_overrides_type}
                                    </>
                                }
                            />

                            {SHOW_BASED_ON_HOST.additionalOfficeOverrides &&
                                employeeData?.is_manager &&
                                positionAndCompanySetting?.firstPosition?.overrides?.office &&
                                userAssociatedOffices?.length > 0 &&
                                userAssociatedOffices?.map((item) => (
                                    <>
                                        {Number(item?.overrides_amount) > 0 ? (
                                            <CommonTableRow
                                                equalColumn
                                                fieldName={`↳  Office : ${item?.office_name}, ${item?.state_name} `}
                                                fieldValue={
                                                    <>
                                                        {item?.overrides_amount}{' '}
                                                        {item?.overrides_type == 'percent'
                                                            ? '%'
                                                            : item?.overrides_type}
                                                    </>
                                                }
                                            />
                                        ) : null}
                                    </>
                                ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {/* Stack Override */}
                    {isStackModalEnabled && firstPositionDetail?.override?.[3]?.status && (
                        <CommonTableRow
                            equalColumn
                            fieldName={'Office Stack'}
                            fieldValue={formattedNumberFields(
                                employeeData?.office_stack_overrides_amount,
                                '%'
                            )}
                        />
                    )}
                </div>
            ) : (
                <div
                    className='text-cmGrey700 text-center mt-10'
                    style={{fontWeight: 600, fontSize: '14px'}}
                >
                    No direct / indirect / office / office stack overrides found
                </div>
            )}

            {companyOverrideSetting?.allow_manual_override_status &&
            userType == USER_TYPE.hiredEmployee ? (
                <CommonTableRow
                    equalColumn
                    fieldName={'Manual Overrides'}
                    fieldValue={
                        <Link
                            to={`/user/Network?employeeId=${employeeData?.id}&networkType=manual`}
                        >
                            <CustomButton
                                buttonType={BUTTON_TYPE.link}
                                buttonLabel='View Manual Overrides'
                            />
                        </Link>
                    }
                />
            ) : null}
        </div>
    )
}
const ViewAgreementsBlock = ({employeeData, getEmployeeData, userType}) => {
    const [showEditHireDateModal, setEditHireDateModal] = useState(false)
    const [hireDate, setHireDate] = useState(employeeData?.hired_date)
    const [errorMessage, setErrorMessage] = useState('')
    const {hiringAccess} = useCustomAccessRights()
    useEffect(() => {
        setHireDate(employeeData?.hired_date)
    }, [employeeData?.hired_date])

    const [loading, setLoading] = useState(false)
    const onUpdateHireDatePress = useCallback(() => {
        if (!hireDate) return setErrorMessage('Select hire date')
        setLoading(true)
        updateHireDateOfEmployeeService(employeeData?.id, getValidDate(hireDate, 'YYYY-MM-DD'))
            .then(() => {
                CustomToast.success('Hire date udpdated')
                getEmployeeData()
                setEditHireDateModal(false)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
                setErrorMessage('')
            })
    }, [employeeData?.id, getEmployeeData, hireDate])

    return (
        <div className='pb-5' style={{fontSize: '14px'}}>
            {showEditHireDateModal ? (
                <CustomModal
                    maxWidth={400}
                    show={showEditHireDateModal}
                    title={`Edit Hire Date | ${employeeData?.first_name ?? ''} ${
                        employeeData?.last_name ?? ''
                    }`}
                    onHide={() => {
                        setEditHireDateModal(false)
                        setErrorMessage('')
                    }}
                >
                    <CustomLoader full visible={loading} />
                    <CustomDatePicker
                        value={hireDate}
                        onChange={(e) => setHireDate(e?.target?.value)}
                        label={'Hire Date'}
                        errorMessage={errorMessage}
                        className={'mb-5'}
                    />
                    <CustomButton buttonLabel='Update Hire Date' onClick={onUpdateHireDatePress} />
                </CustomModal>
            ) : null}
            <div className='w-100 '>
                {userType == USER_TYPE.hiredEmployee ? (
                    <CommonTableRow
                        equalColumn
                        fieldName={'Hire Date'}
                        fieldValue={getValidDate(employeeData?.hired_date)}
                        showEditButton={hiringAccess.showEditHireDateButton}
                        onEditButtonPress={() => setEditHireDateModal(true)}
                    />
                ) : null}

                <CommonTableRow
                    equalColumn
                    fieldName={'Probation Period'}
                    fieldValue={
                        employeeData?.probation_period
                            ? `${employeeData?.probation_period} Days`
                            : null
                    }
                />

                <CommonTableRow
                    equalColumn
                    fieldName={'Offer includes bonus?'}
                    fieldValue={
                        getBooleanValue(employeeData?.offer_include_bonus) == 1 ? 'Yes' : 'No'
                    }
                />

                {getBooleanValue(employeeData?.offer_include_bonus) == 1 ? (
                    <>
                        <CommonTableRow
                            equalColumn
                            fieldName={'Hiring Bonus / Resign Bonus'}
                            fieldValue={formattedNumberFields(
                                employeeData?.hiring_bonus_amount,
                                '$'
                            )}
                        />
                        <CommonTableRow
                            equalColumn
                            fieldName={'Date to be Paid'}
                            fieldValue={getValidDate(employeeData?.date_to_be_paid)}
                        />
                    </>
                ) : null}

                <CommonTableRow
                    equalColumn
                    fieldName={'Period of Agreement'}
                    fieldValue={
                        <>
                            {getValidDate(employeeData?.period_of_agreement_start_date)}
                            {employeeData?.end_date ? (
                                <> - {getValidDate(employeeData?.end_date)}</>
                            ) : null}
                        </>
                    }
                />

                <CommonTableRow
                    equalColumn
                    fieldName={'Offer Expiry Date'}
                    fieldValue={getValidDate(employeeData?.offer_expiry_date)}
                />
            </div>
        </div>
    )
}

const ViewDeductionsBlock = ({employeeData}) => (
    <div className='pb-5' style={{fontSize: '14px'}}>
        <div className='w-100 '>
            {employeeData?.deduction?.length > 0 ? (
                employeeData?.deduction?.map((item) => (
                    <CommonTableRow
                        equalColumn
                        fieldName={item?.cost_center_name}
                        fieldValue={formattedNumberFields(
                            item?.ammount_par_paycheck,
                            item.deduction_type
                        )}
                    />
                ))
            ) : (
                <CustomNoData label={'No deduction Found'} className={'py-5'} />
            )}
        </div>
    </div>
)

export {
    ViewPersonolDetailBlock,
    ViewOrganisationBlock,
    ViewRedlineComissionUpfrontBlock,
    ViewOverridesBlock,
    ViewDeductionsBlock,
    ViewAgreementsBlock,
}
