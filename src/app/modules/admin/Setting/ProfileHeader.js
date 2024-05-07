/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useCallback, useEffect, useMemo} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../../redux/selectors/SettingsSelectors'
import {getCompanyProfileAction} from '../../../../redux/actions/SettingActions'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {IMAGE_TYPE, formattedPhoneNumber, getServerImage} from '../../../../helpers/CommonHelpers'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import CustomButton, {BUTTON_SIZE} from '../../../../customComponents/customButtton/CustomButton'
import useCustomAccessRights, {
    allPermissionsAccess,
} from '../../../../accessRights/useCustomAccessRights'

const ProfileHeader = () => {
    const location = useLocation()
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const companyProfile = useSelector(getCompanyProfileSelector)

    const {hiringAccess} = useCustomAccessRights()

    useEffect(function () {
        dispatch(getCompanyProfileAction())
    }, [])

    const showEditProfileButton = useMemo(
        () => !location.pathname.includes('edit-profile'),
        [location.pathname]
    )

    return (
        <div
            className='card mb-13  shadow-sm overflow-hidden bg-cmwhite'
            style={{marginTop: '-20px', borderRadius: '12px'}}
        >
            <div className='card-body pt-5 pe-5 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                    <div className='me-sm-7 mb-4 mx-auto'>
                        <div className='symbol symbol-100px ms-6 symbol-lg-160px symbol-fixed position-relative'>
                            <CustomImage
                                // style={{width: '130px', height: '130px'}}
                                style={{width: '130px', height: '112px'}}
                                // src={companyProfile?.logo}
                                type={IMAGE_TYPE.companyLogo}
                                customSrc={getServerImage(
                                    companyProfile?.logo,
                                    IMAGE_TYPE.companyLogo
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start flex-wrap'>
                            <div className='d-flex flex-column mx-sm-0 mx-auto '>
                                <div className='d-flex align-items-center mb-3'>
                                    <span
                                        style={{
                                            fontSize: '18px',
                                            color: '#3F4254',
                                            fontFamily: 'Manrope',
                                            fontWeight: '600',
                                        }}
                                        className=' text-hover-primary me-1'
                                    >
                                        {companyProfile?.business_name}
                                    </span>
                                    <div
                                        className='ms-1'
                                        style={{
                                            background: 'rgba(0, 194, 71, 0.1)',
                                            width: '70px',
                                            height: '20px',
                                            color: '#00C247',
                                            borderRadius: '12px',
                                            fontFamily: 'Manrope',
                                            display: 'flex',
                                            fontWeight: '600',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {companyProfile?.company_type}
                                    </div>
                                </div>

                                <div
                                    style={{fontFamily: 'Manrope', fontWeight: '500', fontSize: 14}}
                                    className='d-flex-col flex-wrap col pe-2 mb-sm-0 mb-5'
                                >
                                    <span
                                        style={{
                                            fontFamily: 'Manrope',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2 '
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '10.94px',
                                                // height: '12.55px'
                                            }}
                                            className='bi bi-geo-alt me-3 mt-1'
                                        ></i>
                                        {companyProfile?.business_address ?? '-'}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'Manrope',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.52px',
                                                // height: '12.54px'
                                            }}
                                            className='bi bi-telephone me-2 mt-0'
                                        ></i>

                                        {formattedPhoneNumber(companyProfile?.phone_number)}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'Manrope',
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
                                        {companyProfile?.company_email}
                                    </span>
                                </div>
                            </div>

                            {showEditProfileButton && (
                                <AccessRights forSuperAdmin>
                                    <div className='d-flex mx-auto mx-sm-0'>
                                        <CustomButton
                                            buttonLabel='Edit Profile'
                                            onClick={() => Navigate('/setting/edit-profile')}
                                            buttonSize={BUTTON_SIZE.small}
                                        />
                                    </div>
                                </AccessRights>
                            )}
                        </div>
                    </div>
                </div>
                <hr className='text-cmGrey400 py-0 my-0' />
                <ul
                    style={{
                        fontFamily: 'Manrope',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#9E9E9E',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                    }}
                    className=' w-100 px-5 nav nav-stretch gap-5 nav-line-tabs nav-line-tabs-8x border-transparent flex-nowrap'
                >
                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.setup.view}
                    >
                        <li className='nav-item my-0 py-0'>
                            <Link
                                className={
                                    `nav-link text-nowrap ` +
                                    (location.pathname === '/setting/setup' && 'active')
                                }
                                to='/setting/setup'
                                style={{
                                    color:
                                        location.pathname === '/setting/setup' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                            >
                                Setup
                            </Link>
                        </li>
                    </AccessRights>
                    <AccessRights customCondition={hiringAccess.showConfigurationButtonAccess}>
                        <li className='nav-item my-0 py-0'>
                            <Link
                                className={
                                    `nav-link text-nowrap ` +
                                    (location.pathname === '/setting/hiring' && 'active')
                                }
                                to='/setting/hiring'
                                style={{
                                    color:
                                        location.pathname === '/setting/hiring' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                            >
                                Hiring
                            </Link>
                        </li>
                    </AccessRights>

                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.locations.view}
                    >
                        <li className='nav-item text-nowrap my-0 py-0'>
                            <Link
                                style={{
                                    color:
                                        location.pathname === '/setting/location' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link  ` +
                                    (location.pathname === '/setting/location' && 'active')
                                }
                                to='/setting/location'
                            >
                                Locations
                            </Link>
                        </li>
                    </AccessRights>

                    <AccessRights
                        customCondition={
                            allPermissionsAccess.administrator.setting.costTracking.view
                        }
                    >
                        <li className='nav-item my-0 py-0 text-nowrap'>
                            <Link
                                style={{
                                    color:
                                        location.pathname === '/setting/cost-center' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link ` +
                                    (location.pathname === '/setting/cost-center' && 'active')
                                }
                                to='/setting/cost-center'
                            >
                                Cost Centers
                            </Link>
                        </li>
                    </AccessRights>

                    <li className='nav-item my-0 py-0 text-nowrap'>
                        <AccessRights
                            customCondition={
                                allPermissionsAccess.administrator.setting.departments.view
                            }
                        >
                            <Link
                                style={{
                                    color:
                                        location.pathname === '/setting/department' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link  ` +
                                    (location.pathname === '/setting/department' && 'active')
                                }
                                to='/setting/department'
                            >
                                Departments
                            </Link>
                        </AccessRights>
                    </li>

                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.positions.view}
                    >
                        <li className='nav-item my-0 py-0 text-nowrap'>
                            <Link
                                style={{
                                    color:
                                        location.pathname === '/setting/position' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link ` +
                                    (location.pathname === '/setting/position' && 'active')
                                }
                                to='/setting/position'
                            >
                                Positions
                            </Link>
                        </li>
                    </AccessRights>

                    {/* Alerts */}
                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.alerts.view}
                    >
                        <li className='nav-item my-0 py-0 text-nowrap'>
                            <Link
                                className={
                                    `nav-link  ` +
                                    (location.pathname === '/setting/alert' && 'active')
                                }
                                style={{
                                    color:
                                        location.pathname === '/setting/alert' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                to='/setting/alert'
                            >
                                Alerts
                            </Link>
                        </li>
                    </AccessRights>
                    <AccessRights
                        customCondition={
                            allPermissionsAccess.administrator.setting.bankAccounts.view
                        }
                    >
                        <li className='nav-item my-0 py-0 text-nowrap '>
                            <Link
                                className={
                                    `nav-link ` +
                                    (location.pathname === '/setting/bank-account' && 'active')
                                }
                                style={{
                                    color:
                                        location.pathname === '/setting/bank-account' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                to='/setting/bank-account'
                            >
                                Bank Account
                            </Link>
                        </li>
                    </AccessRights>
                    {/* Access_remaning */}
                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.paperWork.view}
                    >
                        <li className='nav-item my-0 py-0 text-nowrap'>
                            <Link
                                className={
                                    `nav-link  ` +
                                    (location.pathname === '/setting/paperwork' && 'active')
                                }
                                style={{
                                    color:
                                        location.pathname === '/setting/paperwork' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                to='/setting/paperwork'
                            >
                                Paperwork
                            </Link>
                        </li>
                    </AccessRights>
                </ul>
            </div>
        </div>
    )
}

export default ProfileHeader
