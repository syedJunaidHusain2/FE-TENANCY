import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {PersonMdHeader} from './PersonMdHeader'

import PersonCosts from './personComponents/PersonCosts'
import PersonCostTracking from './personComponents/PersonCostTracking'
import PersonEarnings from './personComponents/PersonEarnings'
import PersonEmplyoeCard from './personComponents/PersonEmplyoeCard'
import PersonHealth from './personComponents/PersonHealth'
import PersonPayroll from './personComponents/PersonPayroll'
import PersonReconciliations from './personComponents/PersonReconciliations'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const PersonMdPage = () => {
    return (
        <div className='mt-6 mx-sm-10'>
            <Routes>
                <Route
                    element={
                        <>
                            <PersonMdHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='health'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Health</PageTitle>
                                <PersonHealth />
                            </>
                        }
                    />

                    <Route
                        path='employees'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Employees</PageTitle>
                                <PersonEmplyoeCard />
                            </>
                        }
                    />

                    <Route
                        path='cost-tracking'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Cost Tracking
                                </PageTitle>
                                <PersonCostTracking />
                            </>
                        }
                    />
                    <Route
                        path='earnings'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Earnings</PageTitle>
                                <PersonEarnings />
                            </>
                        }
                    />
                    <Route
                        path='costs'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Costs</PageTitle>
                                <PersonCosts />
                            </>
                        }
                    />
                    <Route
                        path='payroll'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Payroll</PageTitle>
                                <PersonPayroll />
                            </>
                        }
                    />
                    <Route
                        path='reconcilliations'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Reconcilliations
                                </PageTitle>
                                <PersonReconciliations />
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default PersonMdPage
