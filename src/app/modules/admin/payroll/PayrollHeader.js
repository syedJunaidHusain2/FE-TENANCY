import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ProfileHeader} from './ProfileHeader'
import {SuspensedView} from '../../../../routing/PrivateRoutes'
import RunPayroll from './component/runpayroll/RunPayroll'
import OneTimePayment from './component/onetimepayment/OneTimePayment'
import PaymentRequest from './component/paymentrequest/PaymentRequest'
import Reconciliation from './component/reconciliation/Reconciliation'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Payroll/',
        path: 'payroll/run-payroll',
        isSeparator: false,
        isActive: false,
    },
]

const SettingHeader = () => {
    return (
        <div className='px-sm-10' style={{marginTop: -20}}>
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
                        path='run-payroll'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Run-Payroll</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.payroll
                                            .runPayrollAndApprovals.view
                                    }
                                    showPlaceHolder
                                >
                                    <RunPayroll />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='one-time-payment'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    One-Time Payment
                                </PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.payroll.oneTimePayment
                                            .view
                                    }
                                    showPlaceHolder
                                >
                                    <OneTimePayment />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='payment-request'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Payment Request
                                </PageTitle>

                                <PaymentRequest />
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
                                        allPermissionsAccess.administrator.payroll
                                            .payrollReconciliation.view
                                    }
                                    showPlaceHolder
                                >
                                    <Reconciliation />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route index element={<Navigate to='/payroll' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default SettingHeader
