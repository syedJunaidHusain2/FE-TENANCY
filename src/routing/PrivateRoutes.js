import {lazy, Suspense, useEffect, useMemo, useState} from 'react'
import {Route, Routes, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {MasterLayout} from '../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../_metronic/assets/ts/_utils'
import {PageTitle} from '../_metronic/layout/core'
import AccessRights from '../accessRights/AccessRights'
import AdminDashbaord from '../app/modules/admin/dashboard/AdminDashbaord'
import StandardDashboard from '../app/modules/standard_manager/standardDashboard/StandardDashboard'
import {useSelector} from 'react-redux'
import {getActiveRoleSelector} from '../redux/selectors/AuthSelectors'
import {ROLES} from '../accessRights/AccessRightsConstants'
import {allPermissionsAccess} from '../accessRights/useCustomAccessRights'
import {getCompanySettingSelector} from '../redux/selectors/SettingsSelectors'
import {getRedirectRoute} from '../_metronic/layout/components/sidebar/sidebar-menu/SidebarMenuMain'

const PrivateRoutes = () => {
    const Referrals = lazy(() => import('../app/modules/standard_manager/referrals/Referrals'))
    const IntregationPage = lazy(() =>
        import('../app/modules/standard_manager/integration/IntregationPage')
    )
    const CalendarPage = lazy(() => import('../app/modules/standard_manager/calendar/CalendarPage'))
    const ReportsRoutes = lazy(() =>
        import('../app/modules/standard_manager/smReports/ReportsRoutes')
    )
    const HeaderPage = lazy(() => import('../app/modules/admin/Setting/SettingHeader'))
    const PayrollPage = lazy(() => import('../app/modules/admin/payroll/PayrollHeader'))
    const ReportsPage = lazy(() => import('../app/modules/admin/reports/ReportsHeader'))
    const ParticularEmployePage = lazy(() =>
        import(
            '../app/modules/standard_manager/management/particularEmployee/ParticularEmployePage'
        )
    )
    const HiringPage = lazy(() =>
        import('../app/modules/standard_manager/hiring/hiringRoutes/HiringRoutes')
    )
    const ManagementPage = lazy(() =>
        import('../app/modules/standard_manager/management/ManagementRoutes')
    )
    const RequestsPage = lazy(() =>
        import('../app/modules/standard_manager/smRequests/RequestsPage')
    )
    const SequiDocs = lazy(() => import('../app/modules/admin/sequidocs/SequiDocsRoutes'))
    const MarketingDealPage = lazy(() => import('../app/modules/admin/marketingDeals/MdPage'))
    const MySalesPage = lazy(() =>
        import(
            '../app/modules/standard_manager/Setting/components/SetupCard/backendCard/MySalesRoute'
        )
    )

    const PersonMdPage = lazy(() =>
        import('../app/modules/admin/marketingDeals/perPersonDeal/PersonMdPage')
    )

    const PermissionsTab = lazy(() => import('../app/modules/admin/permissions/PermissionsTab'))
    const AlertsPage = lazy(() => import('../app/modules/admin/alert-center/AlertCenterPage'))

    const OnBoardEmployeProfileRoute = lazy(() =>
        import('../app/modules/standard_manager/onBoardEmployeProfile/OnBoardEmployeProfileRoute')
    )

    const UserManageRoute = lazy(() =>
        import('../app/modules/common/navSettings/userManagement/UserManagementPage')
    )

    const BillingRoute = lazy(() => import('../app/modules/common/navSettings/billing/BillingPage'))
    const ViewLogPage = lazy(() =>
        import('../app/modules/standard_manager/integration/components/ViewLogPage')
    )
    const SmSequiDocRouting = lazy(() =>
        import('../app/modules/standard_manager/smSequiDocs/SmSequiDocRouting')
    )
    const SettingSystemPage = lazy(() =>
        import('../app/modules/common/navSettings/system/SettingSystemPage')
    )

    const profileBreadCrumbs = [
        {
            title: 'Dashboard/',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
    ]

    return (
        <Routes>
            <Route element={<MasterLayout />}>
                <Route path='auth/*' element={<Navigate to='/company-onboarding/dashboard/' />} />

                <Route
                    path='/dashboard'
                    element={
                        <SuspensedView>
                            <Dashboard />
                        </SuspensedView>
                    }
                />
                <Route
                    path='/standard-dashboard'
                    element={
                        <SuspensedView>
                            <AccessRights
                                customCondition={
                                    allPermissionsAccess.standard.dashboard.dashboard.view
                                }
                                showPlaceHolder
                            >
                                <StandardDashboard />
                            </AccessRights>
                        </SuspensedView>
                    }
                />

                {/* Pages */}
                <Route
                    path='/admin-dashboard'
                    element={
                        <SuspensedView>
                            <AccessRights
                                customCondition={
                                    allPermissionsAccess.administrator.dashboard.dashboard.view
                                }
                                showPlaceHolder
                            >
                                <AdminDashbaord />
                            </AccessRights>
                        </SuspensedView>
                    }
                />
                <Route
                    path='standard-dashboard'
                    element={
                        <SuspensedView>
                            <AccessRights
                                customCondition={
                                    allPermissionsAccess.standard.dashboard.dashboard.view
                                }
                                showPlaceHolder
                            >
                                <StandardDashboard />
                            </AccessRights>
                        </SuspensedView>
                    }
                />

                <Route
                    path='intregation'
                    element={
                        <SuspensedView>
                            <IntregationPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='intregation/view-log'
                    element={
                        <SuspensedView>
                            <ViewLogPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='import-export'
                    element={
                        <SuspensedView>
                            <IntregationPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='calendar'
                    element={
                        <SuspensedView>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Calendar</PageTitle>
                            <CalendarPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='referrals'
                    element={
                        <SuspensedView>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Referrals</PageTitle>
                            <AccessRights
                                customCondition={
                                    allPermissionsAccess.standard.referrals.referrals.view
                                }
                                showPlaceHolder
                            >
                                <Referrals />
                            </AccessRights>
                        </SuspensedView>
                    }
                />

                {/* Lazy Modules */}
                <Route
                    path='setting/*'
                    element={
                        <SuspensedView>
                            <HeaderPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='settings/subscriptions'
                    element={
                        <SuspensedView>
                            <UserManageRoute />
                        </SuspensedView>
                    }
                />
                <Route
                    path='settings/billings/*'
                    element={
                        <SuspensedView>
                            <BillingRoute />
                        </SuspensedView>
                    }
                />

                <Route
                    path='settings/system/*'
                    element={
                        <SuspensedView>
                            <SettingSystemPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='alert-center/*'
                    element={
                        <SuspensedView>
                            <AlertsPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='permissions/*'
                    element={
                        <SuspensedView>
                            <PermissionsTab />
                        </SuspensedView>
                    }
                />

                <Route
                    path='sequidocs/*'
                    element={
                        <SuspensedView>
                            <SequiDocs />
                        </SuspensedView>
                    }
                />

                <Route
                    path='/std-sequidocs/*'
                    element={
                        <SuspensedView>
                            <SmSequiDocRouting />
                        </SuspensedView>
                    }
                />

                <Route
                    path='marketing-deal/*'
                    element={
                        <SuspensedView>
                            <MarketingDealPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='marketing-deal/md-list/md-per-person/*'
                    element={
                        <SuspensedView>
                            <PersonMdPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='user/*'
                    element={
                        <SuspensedView>
                            <ParticularEmployePage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='management/*'
                    element={
                        <SuspensedView>
                            <ManagementPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='hiring/*'
                    element={
                        <SuspensedView>
                            <HiringPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='mysales/*'
                    element={
                        <SuspensedView>
                            <MySalesPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='payroll/*'
                    element={
                        <SuspensedView>
                            <PayrollPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='reports/*'
                    element={
                        <SuspensedView>
                            <ReportsPage />
                        </SuspensedView>
                    }
                />

                <Route
                    path='requests/*'
                    element={
                        <SuspensedView>
                            <RequestsPage />
                        </SuspensedView>
                    }
                />

                {/* Sm reports */}
                <Route
                    path='smReports/*'
                    element={
                        <SuspensedView>
                            <ReportsRoutes />
                        </SuspensedView>
                    }
                />
                {/* Sm onBoarding Employe Prifle */}
                <Route
                    path='onboard-employe-profile/*'
                    element={
                        <SuspensedView>
                            <OnBoardEmployeProfileRoute />
                        </SuspensedView>
                    }
                />

                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>
        </Routes>
    )
}

export const SuspensedView = ({children}) => {
    const baseColor = getCSSVariableValue('--kt-primary')
    TopBarProgress.config({
        barColors: {
            0: baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}

const Dashboard = () => {
    const activeRole = useSelector(getActiveRoleSelector)
    const [showPlaceholder, setPlaceHolder] = useState(false)
    const navigate = useNavigate()
    const companySetting = useSelector(getCompanySettingSelector)
    const redirectRoute = useMemo(() => {
        return getRedirectRoute({companySetting})
    }, [companySetting])
    const adminFirstScreen = useMemo(() => {
        const adminRoute = redirectRoute.administrator
        return (
            adminRoute?.dashboard ||
            adminRoute?.settings ||
            adminRoute?.integrations ||
            adminRoute?.sequiDocs ||
            adminRoute?.payroll ||
            adminRoute?.reports ||
            adminRoute?.permissions ||
            adminRoute?.alertCenter ||
            null
        )
    }, [redirectRoute.administrator])

    const standardFirstScreen = useMemo(() => {
        const standardRoute = redirectRoute.standard
        return (
            standardRoute?.dashboard ||
            standardRoute?.mySales ||
            standardRoute?.hiring ||
            standardRoute?.calendar ||
            standardRoute?.sequiDocs ||
            standardRoute?.management ||
            standardRoute?.reports ||
            standardRoute?.requestAndApprovals ||
            null
        )
    }, [redirectRoute.standard])

    useEffect(() => {
        const pathName =
            activeRole === ROLES.standard.roleValue ? standardFirstScreen : adminFirstScreen
        if (pathName) navigate(pathName)
        setTimeout(() => setPlaceHolder(true), 1500)
    }, [])

    return <AccessRights showPlaceHolder={showPlaceholder} customCondition={false} />
}
