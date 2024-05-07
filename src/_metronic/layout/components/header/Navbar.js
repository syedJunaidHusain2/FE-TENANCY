import clsx from 'clsx'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import {ROLES} from '../../../../accessRights/AccessRightsConstants'
import {setActiveRoleAction} from '../../../../redux/actions/AuthActions'
import {
    getActiveRoleSelector,
    getUserDataSelector,
    getUserRolesSelector,
} from '../../../../redux/selectors/AuthSelectors'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, Search, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import AccessRights from '../../../../accessRights/AccessRights'
import CustomLink from '../../../../customComponents/customButtton/CustomLink'
import CustomButton, {BUTTON_SIZE} from '../../../../customComponents/customButtton/CustomButton'
import NotificationSidebar from './NotificationSidebar'

const itemClass = 'ms-1 ms-lg-3'
const btnClass =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
    const dispatch = useDispatch()
    var navigate = useNavigate()
    const userData = useSelector(getUserDataSelector)
    const userRoles = useSelector(getUserRolesSelector)
    var activeRole = useSelector(getActiveRoleSelector)
    const handleUser = (role) => {
        dispatch(setActiveRoleAction(role))
        navigate('/dashboard', {state: role})
    }
    const [profileView, setProfileView] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [notificationData, setNotificationData] = useState([1, 2])
    const [showNotificationSidebar, setShowNotificationSidebar] = useState(false)

    const {config} = useLayout()

    const handleNotificationSidebar = () => {
        setShowNotificationSidebar(!showNotificationSidebar)
    }
    return (
        <div className='app-navbar flex-shrink-0 gap-sm-0 gap-2'>
            <div className={clsx('app-navbar-item  me-2 d-lg-inline my-auto d-none', itemClass)}>
                <div
                    className='d-flex align-items-center d-flex flex-row'
                    data-kt-search-element='toggle'
                    id='kt_header_search_toggle'
                >
                    {activeRole ? (
                        <>
                            {activeRole !== ROLES.administrator.roleValue &&
                            userRoles.includes(ROLES.administrator.roleValue) ? (
                                <SwitchRoleUI
                                    title={'Switch to Admin'}
                                    activeRole={activeRole}
                                    handleUser={handleUser}
                                />
                            ) : activeRole !== ROLES.standard.roleValue &&
                              userRoles.includes(ROLES.standard.roleValue) ? (
                                <SwitchRoleUI
                                    title={'Switch to Standard'}
                                    activeRole={activeRole}
                                    handleUser={handleUser}
                                />
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>
            <div className={clsx('app-navbar-item align-items-stretch me-2', itemClass)}>
                <div
                    className='d-flex gap-2 align-items-center'
                    data-kt-search-element='toggle'
                    id='kt_header_search_toggle'
                >
                    {/* Notification Icon */}

                    {/* <div className='btn btn-icon'>
                        <button
                            style={{background: 'white', border: 'none'}}
                            type='button'
                            className='position-relative'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                            data-kt-menu-placement='bottom-center'
                        >
                            <i
                                style={{fontSize: '22px'}}
                                className='svg-icon-1 bi bi-bell text-cmGrey700'
                            />
                            <span
                                style={{marginLeft: '-9px'}}
                                className='position-absolute top-20 start-100 translate-middle p-2'
                            >
                                <span className='bi bi-circle-fill text-cmError fs-9'></span>
                            </span>
                        </button>
                        <div
                            className='dropdown-menu text-cmGrey600 w-sm-350px w-95'
                            data-kt-menu='true'
                            style={{
                                borderRadius: '10px',
                                fontSize: '12px',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <div
                                className='text-cmBlack p-5 border-bottom border-cmGrey200'
                                style={{fontSize: '16px', fontWeight: 700, lineHeight: '24px'}}
                            >
                                Notifications (2)
                            </div>
                            <div className='' style={{fontSize: 14, fontWeight: 600}}>
                                {notificationData.map((i) => (
                                    <div className='p-5 border-bottom border-cmGrey200'>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <i class='bi bi-circle-fill fs-9 text-cmgreen'></i>
                                            <div className='text-cmBlack' style={{fontWeight: 700}}>
                                                Integrations done!
                                            </div>
                                        </div>
                                        <div className='d-flex gap-3 align-items-center mb-2'>
                                            <i class='text-cmwhite bi bi-circle-fill fs-9'></i>
                                            <div className='text-cmGrey600'>
                                                Hubspot has been successfully integrate.
                                            </div>
                                        </div>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <i class='text-cmwhite bi bi-circle-fill fs-9'></i>
                                            <div>
                                                <CustomLink label={'View Now'} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='my-5 d-flex flex-end pe-10'>
                                    <CustomButton
                                        buttonLabel='View All'
                                        buttonSize={BUTTON_SIZE.small}
                                        onClick={handleNotificationSidebar}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {showNotificationSidebar ? (
                        <NotificationSidebar
                            open={showNotificationSidebar}
                            onClose={handleNotificationSidebar}
                        />
                    ) : null}
                    <>
                        <AccessRights
                            forSuperAdmin={false}
                            customCondition={
                                activeRole === ROLES.administrator.roleValue &&
                                userRoles.includes(ROLES.administrator.roleValue)
                            }
                        >
                            <div
                                className='bi bi-gear fs-2 text-cmGrey700 text-hover-dark cursor-pointer'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                data-kt-menu-placement='bottom-center'
                            />
                        </AccessRights>
                        <div
                            className='dropdown-menu text-cmGrey600 py-5 mw-sm-450px w-95'
                            data-kt-menu='true'
                            style={{
                                borderRadius: '10px',
                                fontSize: '12px',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <div
                                className='text-cmGrey800 mb-10 px-7'
                                style={{fontSize: '16px', fontWeight: 700}}
                            >
                                Settings
                            </div>

                            <div>
                                <div
                                    className='text-uppercase mb-3 px-7'
                                    style={{fontWeight: 600, fontFamily: fontsFamily.manrope}}
                                >
                                    Sequifi Admin
                                </div>
                                <div className='d-flex flex-column flex-start'>
                                    <div
                                        className='dropdown-item d-flex gap-3 text-wrap w-100 px-7 py-3 bg-hover-cmGrey100'
                                        onClick={() => navigate('settings/subscriptions')}
                                    >
                                        <KTSVG
                                            path='/media/icons/duotune/art/people.svg'
                                            className='cursor-pointer'
                                            svgClassName='w-35px h-35px'
                                        />
                                        <div className='d-flex flex-column'>
                                            <div
                                                className='text-cmGrey800'
                                                style={{fontWeight: 600, fontSize: 14}}
                                            >
                                                User Management
                                            </div>
                                            <div
                                                className='text-cmGrey600'
                                                style={{fontWeight: 500}}
                                            >
                                                Manage users, group administration, and access
                                                requests.
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='dropdown-item d-flex gap-3  text-wrap cursor-pointer w-100 px-7 py-3 bg-hover-cmGrey100 '
                                        onClick={() => navigate('settings/billings/subscription')}
                                    >
                                        <KTSVG
                                            path='/media/icons/duotune/art/Billing.svg'
                                            className='cursor-pointer'
                                            svgClassName='w-35px h-35px'
                                        />
                                        <div className='d-flex flex-column'>
                                            <div
                                                className='text-cmGrey800'
                                                style={{fontWeight: 600, fontSize: 14}}
                                            >
                                                Billing
                                            </div>
                                            <div
                                                className='text-cmGrey600'
                                                style={{fontWeight: 500}}
                                            >
                                                Update your billing details, Manage subscriptions
                                                and more.
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='dropdown-item d-flex gap-3 cursor-pointer  text-wrap w-100 py-3 px-7 bg-hover-cmGrey100'
                                        onClick={() => navigate('settings/system/general')}
                                    >
                                        <KTSVG
                                            path='/media/icons/duotune/art/ScreenMirrioring.svg'
                                            className='cursor-pointer'
                                            svgClassName='w-35px h-35px'
                                        />
                                        <div className='d-flex flex-column'>
                                            <div
                                                className='text-cmGrey800'
                                                style={{fontWeight: 600, fontSize: 14}}
                                            >
                                                System
                                            </div>
                                            <div
                                                className='text-cmGrey600'
                                                style={{fontWeight: 500}}
                                            >
                                                Manage general configuration, global permissions
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>

            <div className={clsx('app-navbar-item', itemClass)}>
                <div
                    className='d-flex align-items-center'
                    data-kt-search-element='toggle'
                    id='kt_header_search_toggle'
                >
                    <div className='me-5' style={{fontFamily: fontsFamily.manrope}}>
                        <div className=' d-flex flex-end'>
                            <div style={{color: '#9E9E9E', fontSize: '11px'}} className='me-1'>
                                Hi,
                            </div>
                            <div style={{color: '#757575', fontSize: '13px'}}>
                                {userData?.first_name}
                            </div>{' '}
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx('app-navbar-item', itemClass)}>
                <div
                    className={clsx('cursor-pointer symbol', userAvatarClass)}
                    data-kt-menu-trigger="{default: 'click'}"
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    <CustomImage
                        style={{borderRadius: '50%', width: '33px', height: '33px'}}
                        src={userData?.image}
                        className='avatar '
                    />
                </div>
                <HeaderUserMenu
                    open={open}
                    handleClose={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                />
            </div>
        </div>
    )
}

export {Navbar}

export const SwitchRoleUI = ({title, activeRole, handleUser}) => {
    return (
        <div
            onClick={() => {
                if (activeRole === ROLES.standard.roleValue) {
                    handleUser(ROLES.administrator.roleValue)
                } else if (activeRole == ROLES.administrator.roleValue) {
                    handleUser(ROLES.standard.roleValue)
                }
            }}
            className='d-flex flex-row cursor-pointer align-items-center justify-content-center'
        >
            <i className='bi bi-toggle-off' style={{color: '#6078EC', fontSize: '16px'}}></i>
            <div
                style={{
                    color: '#6078EC',
                    fontSize: '14px',
                    fontWeight: '600',
                    textDecoration: 'underline',
                    fontFamily: fontsFamily.manrope,
                }}
                className='ms-3'
            >
                {title}
            </div>
        </div>
    )
}
