import {useSelector} from 'react-redux'
import {SidebarMenuMain} from './SidebarMenuMain'
import {
    getActiveRoleSelector,
    getUserRolesSelector,
} from '../../../../../redux/selectors/AuthSelectors'
import {ROLES} from '../../../../../accessRights/AccessRightsConstants'
import {SwitchRoleUI} from '../../header/Navbar'
import {useDispatch} from 'react-redux'
import {setActiveRoleAction} from '../../../../../redux/actions/AuthActions'
import {useNavigate} from 'react-router-dom'

const SidebarMenu = () => {
    const dispatch = useDispatch()
    var navigate = useNavigate()
    var activeRole = useSelector(getActiveRoleSelector)
    const userRoles = useSelector(getUserRolesSelector)
    const handleUser = (role) => {
        dispatch(setActiveRoleAction(role))
        navigate('/dashboard', {state: role})
    }

    return (
        <div className='app-sidebar-menu  flex-column-fluid'
            style={{overflowY: 'auto', overflowX: 'hidden'}}
        
        >
            <div
                id='kt_app_sidebar_menu_wrapper'
                // className='app-sidebar-wrapper hover-scroll-overlay-y my-5'
                data-kt-scroll='true'
                data-kt-scroll-activate='true'
                data-kt-scroll-height='auto'
                data-kt-scroll-dependencies='#kt_app_sidebar_logo, #kt_app_sidebar_footer'
                // data-kt-scroll-wrappers='#kt_app_sidebar_menu'
                // data-kt-scroll-offset='5px'
                data-kt-scroll-save-state='true'
            >
                <div
                    className='menu menu-column menu-rounded menu-sub-indention px-3'
                    id='#kt_app_sidebar_menu'
                    data-kt-menu='true'
                    data-kt-menu-expand='false'
                >
                    <SidebarMenuMain />
                    <div
                        className='d-flex align-items-center d-flex flex-row d-lg-none d-inline p-5'
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
            </div>
        </div>
    )
}

export {SidebarMenu}
