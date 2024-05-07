import {Navigate, Routes, Route, Outlet, useSearchParams, useLocation} from 'react-router-dom'
import React, {useEffect, lazy} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import ProfileHeader from './ProfileHeader'
import Company from './component/company/Company'
import Sales from './component/sales/Sales'
import Costs from '../costs/component/costs/Costs'
import Payroll from './component/payrolll/Payroll'
import Clawback from './component/clawback/Clawback'
import Pending from './component/pending/Pending'
import Reconciliation from './component/reconciliation/Reconciliation'
import SingleSalePage from './component/sales/SingleSalePage'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import ManageSalesPage from './component/sales/salesTableComponent/manageSales'
import {useDispatch} from 'react-redux'
import {getPayFrequencySettingAction} from '../../../../redux/actions/SettingActions'
import useQueryString from '../../../../hooks/useQueryString'
import SalesAccountSummary from './component/sales/AccountSummary/SalesAccountSummary'
import PayrollReport from './component/payrolll/PayrollReport'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import ImportHistoryPage from './component/sales/salesTableComponent/importHistoryComponents/ImportHistoryPage'

const profileBreadCrumbs = [
    {
        title: 'Dashboard /',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Reports /',
        path: 'reports/company',
        isSeparator: false,
        isActive: false,
    },
]

const SALES_FILTERS = {
    filter: 'this_year',
    m1: 0,
    m2: 0,
    closed: 0,
    search: '',
    page: 1,
    start_date: null,
    end_date: null,
    office_id: null,
}
const ReportsHeader = () => {
    const location = useLocation()
    const [saleSearchParam, setSaleSearchParam] = useQueryString()

    useEffect(() => {
        if (location.pathname == '/reports/sales') {
            setSaleSearchParam({
                ...SALES_FILTERS,
                ...saleSearchParam,
            })
        }
    }, [location.pathname])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPayFrequencySettingAction())
    }, [])
    const [params, setParams] = useSearchParams({
        filter: 'this_year',
        m1: '',
        m2: '',
        closed: '',
    })

    return (
        <div className='px-sm-10' style={{marginTop: -20}}>
            <Routes>
                <Route
                    element={
                        location.pathname.includes('import-history') ? (
                            <Outlet />
                        ) : (
                            <>
                                <ProfileHeader />
                                <Outlet />
                            </>
                        )
                    }
                >
                    <Route
                        path='company'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Company</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.company.view
                                    }
                                    showPlaceHolder
                                >
                                    <Company />
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
                                        allPermissionsAccess.administrator.reports.sales.view
                                    }
                                    showPlaceHolder
                                >
                                    <Sales
                                        params={saleSearchParam}
                                        setParams={setSaleSearchParam}
                                    />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='costs'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Costs</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.cost.view
                                    }
                                    showPlaceHolder
                                >
                                    <Costs />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='payroll/particular-payroll'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Payroll</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.payroll.view
                                    }
                                    showPlaceHolder
                                >
                                    <Payroll />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='payroll/particular-payroll'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Payroll</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.payroll.view
                                    }
                                    showPlaceHolder
                                >
                                    <PayrollReport />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='payroll'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Payroll</PageTitle>
                                <AccessRights
                                    permission={PERMISSIONS_GROUP.administrator.reports.payroll}
                                    type={PERMISSION_TYPE.view}
                                    showPlaceHolder
                                >
                                    <PayrollReport />
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
                                        allPermissionsAccess.administrator.reports.reconciliation
                                            .view
                                    }
                                    showPlaceHolder
                                >
                                    <Reconciliation />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='clawback'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}> Clawback</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.clawback.view
                                    }
                                    showPlaceHolder
                                >
                                    <Clawback />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='pending-installs'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Pending Installs
                                </PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.reports.pendingInstall
                                            .view
                                    }
                                    showPlaceHolder
                                >
                                    <Pending />
                                </AccessRights>
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
                        path='sales/customer-Info/account-summary'
                        element={
                            <>
                                <SalesAccountSummary />
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
                    <Route
                        path='sales/import-history'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Integrations</PageTitle>
                                <ImportHistoryPage />
                            </>
                        }
                    />
                    <Route index element={<Navigate to='/payroll' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default ReportsHeader
