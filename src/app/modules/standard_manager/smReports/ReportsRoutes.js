import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import ManageSalesPage from '../../admin/reports/component/sales/salesTableComponent/manageSales'
import SingleSalePage from '../../admin/reports/component/sales/SingleSalePage'
import ReportsOffice from './components/ReportsOffice'
import {SmReportsHeader} from './components/SmReportsHeader'
import MarketingDealCard from './marketingDealsReports/MarketingDealCard'
import PayPeriodPage from './paySubs/payPeriod/PayPeriodPage'
import PayStubs from './paySubs/PayStubs'
import ReconciliationPage from './reconciliation/ReconciliationPage'
import SalesReport from './salesReports/SalesReport'
import PayStabPage from '../Setting/components/SetupCard/backendCard/payStab/PayStabPage'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Reports/',
        path: 'smReports/office/',
        isSeparator: false,
        isActive: false,
    },
]

const ReportsRoutes = () => {
    return (
        <div className='px-sm-10'>
            <Routes>
                <Route
                    element={
                        <>
                            <SmReportsHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='office'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Office</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.reports.office.view
                                    }
                                    showPlaceHolder
                                >
                                    <ReportsOffice />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='sales'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Sales</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.reports.sales.view
                                    }
                                    showPlaceHolder
                                >
                                    <SalesReport />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='pay-stubs'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Pay Stubs</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.reports.pastPayStubs.view
                                    }
                                    showPlaceHolder
                                >
                                    <PayStubs />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='reconciliation'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Reconciliation
                                </PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.reports.reconciliation.view
                                    }
                                    showPlaceHolder
                                >
                                    <ReconciliationPage />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='pay-stubs/pay-period'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Pay Stubs</PageTitle>
                                <PayStabPage />
                            </>
                        }
                    />
                    <Route
                        path='marketing-deal'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Marketing Deal
                                </PageTitle>
                                <MarketingDealCard />
                            </>
                        }
                    />
                    <Route
                        path='sales/customer-Info'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Sales</PageTitle>
                                <SingleSalePage />
                            </>
                        }
                    />
                    <Route
                        path='sales/add-sales'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Add Sales</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.sales.add
                                    }
                                    showPlaceHolder
                                >
                                    <ManageSalesPage />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route index element={<Navigate to='/smReports' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default ReportsRoutes
