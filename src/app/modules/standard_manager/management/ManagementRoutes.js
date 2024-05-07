import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ProfileHeader} from './ProfileHeader'
import Employees from './component/employees/Employees'
import Teams from './component/team/Teams'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {useSelector} from 'react-redux'
import {
    isUserManagerSelector,
    isUserSuperAdminSelector,
} from '../../../../redux/selectors/AuthSelectors'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
// import SequiDocsPage from './component/team/sequiDocs/templates/Templates'

const profileBreadCrumbs = [    
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
      title: 'Mangement',
      path: '/management/employee',
      isSeparator: true,
      isActive: false,
    },      
]

const ManagementRoutes = () => {
    const isManager = useSelector(isUserManagerSelector)
    const isSuperAdmin = useSelector(isUserSuperAdminSelector)

    return (
        <div style={{marginTop: -20}} className='px-sm-10'>
            <Routes>
                <Route
                    element={
                        <>
                            <ProfileHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='employee'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Employees</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.management.employee.view
                                    }
                                    showPlaceHolder
                                >
                                    <Employees />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='teams'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Teams</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.management.team.view
                                    }
                                    showPlaceHolder
                                >
                                    <Teams />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/management' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default ManagementRoutes
