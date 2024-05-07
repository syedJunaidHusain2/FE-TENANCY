import clsx from 'clsx'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {
    getUserDataSelector,
    isUserManagerSelector,
} from '../../../../../redux/selectors/AuthSelectors'
import {getCompanySettingSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {
    forgotPasswordService,
    updateUserAccountStatusService,
    updateUserImageService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {
    formattedPhoneNumber,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import AccessRights from '../../../../../accessRights/AccessRights'
import TransferModal from './TransferModal'
import useCustomAccessRights from '../../../../../accessRights/useCustomAccessRights'
import CustomDialog from '../../../../../customComponents/customDialog/CustomDialog'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import ChangePasswordModal from './ChangePasswordModal'

const ParticularEmployeHeader = ({employeeData, loading, getProfile}) => {
    const [pageLoading, setPageLoading] = useState(false)
    const navigate = useNavigate()
    const [transferModalView, setTransferModalView] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const location = useLocation()
    const {employeeProfileAccess} = useCustomAccessRights({
        employeeData,
    })

    const companyProfileFilePickerRef = useRef()
    const [hover, setHover] = useState(false)
    const companySetting = useSelector(getCompanySettingSelector)
    const employee_id = location?.state?.employee_id ?? location?.search.split('=')?.[1]

    const onHover = () => {
        setHover(true)
    }

    const onLeave = () => {
        setHover(false)
    }
    const updateEmployeeProfilePhoto = useCallback(
        (field, value) => {
            setPageLoading(true)
            const body = {
                user_id: employee_id,
                image: value,
            }
            updateUserImageService(body)
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    getProfile()
                    setPageLoading(false)
                    CustomToast.success('Profile updated successfully')
                })
        },
        [employee_id, getProfile]
    )

    const updateStatus = (value, ableDisable) => {
        const body = {
            user_id: employee_id,
            type: value,
            value: ableDisable == 1 ? '0' : '1',
        }
        if (['stop_payroll', 'disable_login', 'dismiss'].includes(value)) {
            CustomDialog.warn('Are you sure you want to do this action ?', () => {
                setPageLoading(true)
                updateStatusWithoutPrompt(ableDisable, value, body)
            })
        } else {
            setPageLoading(true)
            updateStatusWithoutPrompt(ableDisable, value, body)
        }
    }

    const updateStatusWithoutPrompt = useCallback(
        (ableDisable, value, body) => {
            updateUserAccountStatusService(body).finally(() => {
                getProfile().finally(() => {
                    setPageLoading(false)
                })
                if (ableDisable == 1) {
                    if (value == 'stop_payroll') CustomToast.success('Payroll started')
                    else if (value == 'disable_login') CustomToast.success('User login enabled')
                } else {
                    if (value == 'stop_payroll') CustomToast.success('Payroll stopped')
                    else if (value == 'disable_login') CustomToast.success('User login disabled')
                }
            })
        },
        [getProfile]
    )
    const resetPassword = () => {
        CustomDialog.warn('Are you sure want to reset password ?', () => {
            setPageLoading(true)
            const body = {
                email: employeeData?.email,
            }
            forgotPasswordService(body)
                .then((res) => {
                    CustomToast.success('Email sent successfully')
                })
                .finally(() => {
                    setPageLoading(false)
                })
        })
    }

    const handleTransferClose = () => {
        setTransferModalView(false)
    }
    const handleTransferModal = () => {
        CustomDialog.warn(
            `Are you sure want to transfer employee to another office ?
            It will effect your office overrides if it is exist.`,
            () => {
                setTransferModalView(true)
            }
        )
    }

    const handlePayrollHistory = useCallback(() => {
        navigate('/smReports/pay-stubs', {state: {userId: employee_id}})
    }, [navigate, employee_id])

    const handleChangePassword = () => {
        CustomDialog.warn('Are you sure want to change password ?', () => {
            setChangePasswordModal(true)
        })
    }

    return (
        <div
            className='card mb-15  shadow-sm  bg-cmwhite'
            style={{borderRadius: '12px', fontFamily: 'Manrope'}}
        >
            <CustomLoader full visible={loading} />
            <CustomLoader full visible={pageLoading} />
            <div className='card-body pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                    <div className='me-7 mb-4'>
                        <div
                            className='symbol symbol-100px ms-6 symbol-lg-160px symbol-fixed position-relative cursor-pointer'
                            onMouseEnter={onHover}
                            onMouseLeave={onLeave}
                            style={{
                                borderRadius: '100px',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{position: 'relative', width: '130px', height: '130px'}}>
                                {hover && (
                                    <div
                                        onClick={() =>
                                            companyProfileFilePickerRef?.current?.click()
                                        }
                                        style={{
                                            position: 'absolute',
                                            height: '100%',
                                            borderRadius: '100px',
                                            overflow: 'hidden',
                                            justifyContent: 'center',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        <span className='bi bi-pencil-fill fs-15 py-1 px-2 text-white shadow-sm rounded cursor-pointer'></span>
                                    </div>
                                )}
                                <CustomImage
                                    style={{width: '130px', height: '130px'}}
                                    src={employeeData?.image}
                                />
                            </div>
                        </div>
                        <input
                            ref={companyProfileFilePickerRef}
                            type='file'
                            name='logo'
                            accept='.png,.jpeg,.jpg,.heic'
                            onChange={(e) => {
                                updateEmployeeProfilePhoto(e?.target?.name, e?.target?.files?.[0])
                            }}
                            style={{display: 'none'}}
                        />
                    </div>
                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start flex-wrap'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex align-items-center'>
                                    <div
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                        }}
                                        className='me-1 text-gray-800'
                                    >
                                        {employeeData?.first_name} {employeeData?.last_name}
                                    </div>
                                    <div
                                        className='ms-1 px-5 text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10'
                                        style={{
                                            height: '20px',
                                            borderRadius: '12px',
                                            fontFamily: 'Manrope',
                                            display: 'flex',
                                            fontWeight: '600',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {employeeData?.position}
                                    </div>
                                </div>

                                <div
                                    style={{fontFamily: 'Manrope', fontWeight: '500'}}
                                    className='d-flex-col flex-wrap col fs-12 pe-2'
                                >
                                    <div
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                        }}
                                        className='d-flex align-items-center text-cmGrey600 me-5'
                                    >
                                        <span className=' text-cmGrey400' style={{fontWeight: 600}}>
                                            #{employeeData?.employee_id}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                        }}
                                        className='d-flex align-items-center text-cmGrey600 me-5 mb-2'
                                    >
                                        Office Location:{' '}
                                        <span className=' text-cmGrey800' style={{fontWeight: 600}}>
                                            {employeeData?.office?.office_name}
                                            {employeeData?.office?.state?.name &&
                                                `, ${employeeData?.office?.state?.name}`}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                        }}
                                        className='d-flex align-items-center text-cmGrey600 me-5 mb-2'
                                    >
                                        Manager:
                                        <span className='text-cmgrey800' style={{fontWeight: 600}}>
                                            {employeeData?.manager_name}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2 '
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.52px',
                                                // height: '12.54px'
                                            }}
                                            className='bi bi-telephone me-2 mt-0'
                                        ></i>
                                        {formattedPhoneNumber(employeeData.mobile_no)}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center text-hover-primary mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.54px',
                                                // height: '10.79px'
                                            }}
                                            className='bi bi-envelope me-3 mt-0'
                                        ></i>
                                        {employeeData?.email}
                                    </div>
                                </div>
                            </div>
                            <AccessRights
                                forSuperAdmin={false}
                                customCondition={employeeProfileAccess.showTransferButtonAccess}
                            >
                                <div className='d-flex gap-5  mt-sm-0 mt-5'>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.primaryBorder}
                                        buttonLabel='Transfer'
                                        onClick={handleTransferModal}
                                    />
                                </div>
                            </AccessRights>
                        </div>

                        <div className='d-flex flex-wrap gap-sm-10 gap-5 mt-5'>
                            <AccessRights
                                forSuperAdmin={false}
                                customCondition={
                                    employeeProfileAccess.showEnableDismissButtonAccess
                                }
                            >
                                <CustomButton
                                    buttonType={
                                        employeeData?.dismiss == 1
                                            ? BUTTON_TYPE.success
                                            : BUTTON_TYPE.error
                                    }
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonLabel={employeeData?.dismiss == 1 ? 'Enable' : 'Dismiss'}
                                    onClick={() => updateStatus('dismiss', employeeData?.dismiss)}
                                />
                            </AccessRights>
                            <AccessRights
                                forSuperAdmin={false}
                                customCondition={
                                    employeeProfileAccess.showStartStopPayrollButtonAccess
                                }
                            >
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonType={
                                        employeeData?.stop_payroll == 1
                                            ? BUTTON_TYPE.success
                                            : BUTTON_TYPE.error
                                    }
                                    buttonLabel={
                                        employeeData?.stop_payroll == 1
                                            ? 'Start Payroll'
                                            : 'Stop Payroll'
                                    }
                                    onClick={() =>
                                        updateStatus('stop_payroll', employeeData?.stop_payroll)
                                    }
                                />
                            </AccessRights>
                            <AccessRights
                                forSuperAdmin={false}
                                customCondition={
                                    employeeProfileAccess.showStartStopLoginButtonAccess
                                }
                            >
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonType={
                                        employeeData?.disable_login == 1
                                            ? BUTTON_TYPE.success
                                            : BUTTON_TYPE.error
                                    }
                                    buttonLabel={
                                        employeeData?.disable_login == 1
                                            ? 'Enable Login'
                                            : 'Disable Login'
                                    }
                                    onClick={() =>
                                        updateStatus('disable_login', employeeData?.disable_login)
                                    }
                                />
                            </AccessRights>
                            <AccessRights
                                customCondition={
                                    employeeProfileAccess.showResetPasswordButtonAccess
                                }
                            >
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonLabel='Reset Password'
                                    icon='bi bi-wrench-adjustable-circle'
                                    onClick={resetPassword}
                                />
                            </AccessRights>
                            <AccessRights
                                customCondition={employeeProfileAccess.showPayrollHistoryButton}
                            >
                                <CustomButton
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonLabel='Payroll History'
                                    onClick={handlePayrollHistory}
                                />
                            </AccessRights>
                            <AccessRights
                                customCondition={employeeProfileAccess.showChangePasswordButton}
                            >
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonLabel='Change Password'
                                    onClick={handleChangePassword}
                                />
                            </AccessRights>
                        </div>
                    </div>
                </div>
                {/* <div className='modal-header'></div> */}
                <hr className='text-cmGrey400 py-0 my-0' />
                <div className=''>
                    <ul
                        style={{
                            fontFamily: 'Manrope',
                            fontSize: '16px',
                            fontWeight: '800',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                        }}
                        className='nav nav-stretch nav-line-tabs nav-line-tabs-8x border-transparent gap-7 flex-nowrap ms-5'
                    >
                        <AccessRights
                            customCondition={employeeProfileAccess.viewPersonalInfoAccess}
                        >
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link text-nowrap ${
                                        location.pathname.includes('personal-info') && 'active'
                                            ? 'text-cmBlue-Crayola '
                                            : 'text-cmGrey500'
                                    }`}
                                    to={`personal-info?employeeId=${employee_id}`}
                                    state={{employee_id: employee_id}}
                                >
                                    Personal Info
                                </Link>
                            </li>
                        </AccessRights>
                        <AccessRights
                            customCondition={employeeProfileAccess.viewEmploymentPackageInfoAccess}
                        >
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link text-nowrap  ${
                                        location.pathname.includes('employment-package') && 'active'
                                            ? 'text-cmBlue-Crayola'
                                            : 'text-cmGrey500'
                                    }`}
                                    to={`employment-package?employeeId=${employee_id}`}
                                    state={{employee_id: employee_id}}
                                >
                                    Employment Package
                                </Link>
                            </li>
                        </AccessRights>
                        <AccessRights customCondition={employeeProfileAccess.viewTaxInfoAccess}>
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link text-nowrap  ${
                                        location.pathname.includes('tax-info') && 'active'
                                            ? 'text-cmBlue-Crayola'
                                            : 'text-cmGrey500'
                                    }`}
                                    to={`tax-info?employeeId=${employee_id}`}
                                    state={{employee_id: employee_id}}
                                >
                                    Tax Info
                                </Link>
                            </li>
                        </AccessRights>
                        <AccessRights customCondition={employeeProfileAccess.viewBankingAccess}>
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link ${
                                        location.pathname.includes('banking') && 'active'
                                            ? 'text-cmBlue-Crayola'
                                            : 'text-cmGrey500'
                                    }`}
                                    to={`banking?employeeId=${employee_id}`}
                                    state={{employee_id: employee_id}}
                                >
                                    Banking
                                </Link>
                            </li>
                        </AccessRights>
                        <AccessRights customCondition={employeeProfileAccess.viewDocumentAccess}>
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link ${
                                        location.pathname.includes('document') && 'active'
                                            ? 'text-cmBlue-Crayola'
                                            : 'text-cmGrey500'
                                    }`}
                                    to={`document?employeeId=${employee_id}`}
                                    state={{employee_id: employee_id}}
                                >
                                    Document
                                </Link>
                            </li>
                        </AccessRights>
                        <AccessRights customCondition={employeeProfileAccess.viewPermissionAccess}>
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link ${
                                        location.pathname.includes('permissions') && 'active'
                                            ? 'text-cmBlue-Crayola'
                                            : 'text-cmGrey500'
                                    }`}
                                    to={`permissions?employeeId=${employee_id}`}
                                    state={{employee_id: employee_id}}
                                >
                                    Permissions
                                </Link>
                            </li>
                        </AccessRights>
                        {companySetting?.overrides ? (
                            <AccessRights
                                forSuperAdmin={false}
                                customCondition={employeeProfileAccess.viewNetworkAccess}
                            >
                                <li className='nav-item'>
                                    <Link
                                        className={`nav-link ${
                                            location.pathname.includes('Network') && 'active'
                                                ? 'text-cmBlue-Crayola'
                                                : 'text-cmGrey500'
                                        }`}
                                        to={`Network?employeeId=${employee_id}`}
                                        state={{employee_id: employee_id}}
                                    >
                                        Network
                                    </Link>
                                </li>
                            </AccessRights>
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>
            </div>
            {transferModalView && (
                <TransferModal
                    show={transferModalView}
                    handleClose={handleTransferClose}
                    userId={employee_id}
                    getProfile={getProfile}
                />
            )}
            {changePasswordModal ? (
                <ChangePasswordModal
                    show={changePasswordModal}
                    handleClose={() => setChangePasswordModal(false)}
                />
            ) : null}
        </div>
    )
}

export {ParticularEmployeHeader}
