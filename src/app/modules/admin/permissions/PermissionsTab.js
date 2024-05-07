import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {PageTitle} from '../../../../_metronic/layout/core'
import {PermissionsHeader} from './PermissionsHeader'
import {lazy} from 'react'
import {SuspensedView} from '../../../../routing/PrivateRoutes'
import UsersOfGroup from './tabs/permissionsGroup/UsersOfGroup'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Permissions/',
        path: 'permissions/groups',
        isSeparator: false,
        isActive: false,
    },
]

const PermissionsTab = () => {
    const PermissionsGroupPage = lazy(() => import('./tabs/permissionsGroup/PermissionsGroupPage'))
    const PermissionsPoliciesPage = lazy(() =>
        import('./tabs/permissionsPolicies/PermissionsPoliciesPage')
    )

    return (
        <div style={{marginTop: -20}} className='px-sm-10'>
            <Routes>
                <Route
                    element={
                        <>
                            <PermissionsHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='groups'
                        element={
                            <SuspensedView>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Groups</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.permissions.group.view
                                    }
                                    showPlaceHolder
                                >
                                    <PermissionsGroupPage />
                                </AccessRights>
                            </SuspensedView>
                        }
                    />
                    <Route
                        path='usersOfGroup'
                        element={
                            <SuspensedView>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Users</PageTitle>
                                {/* <AccessRights
                  permission={PERMISSIONS_GROUP.administrator.permissions.group}
                  type={PERMISSION_TYPE.view}
                  showPlaceHolder
                > */}
                                <UsersOfGroup />
                                {/* </AccessRights> */}
                            </SuspensedView>
                        }
                    />
                    <Route
                        path='policies'
                        element={
                            <SuspensedView>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Policies</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.permissions.policies.view
                                    }
                                    showPlaceHolder
                                >
                                    <PermissionsPoliciesPage />
                                </AccessRights>
                            </SuspensedView>
                        }
                    />

                    <Route index element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default PermissionsTab
