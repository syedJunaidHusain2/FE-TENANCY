import React, {useState} from 'react'
import BillingSidebar from './BillingSidebar'
import {PageTitle} from '../../../../../_metronic/layout/core'
import ManageSubscriptionTable from './ManageSubscriptionTable'
import BillingHistoryTable from './BillingHistoryTable'
import ManageAddressesTable from './ManageAddressesTable'
import {Navigate, Route, Routes} from 'react-router-dom'
import SubscriptionDetails from './subscriptionComponents/SubscriptionDetails'
import UniquePidPage from './subscriptionComponents/uniquePid/UniquePidPage'
import M2CompletePage from './subscriptionComponents/m2Complete/M2CompletePage'

const profileBreadCrumbs = [
    {
        title: 'Settings/Billing',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const BillingPage = () => {
    const [navigation, setNavigation] = useState('Subscription')
    const handleNavigation = (nav) => {
        setNavigation(nav)
    }
    return (
        <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>{navigation}</PageTitle>

            <div className='d-xl-flex gap-5' style={{height: '75vh'}}>
                <div className='w-xxl-15 w-xl-20 mb-xl-0 mb-5'>
                    <BillingSidebar navigation={navigation} handleNavigation={handleNavigation} />
                </div>
                <div className='w-xxl-85 w-xl-80'>
                    <Routes>
                        <Route
                            path='subscription'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Subscriptions
                                    </PageTitle>
                                    <ManageSubscriptionTable />
                                </>
                            }
                        />

                        <Route
                            path='subscription/manage'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Subscriptions
                                    </PageTitle>
                                    <SubscriptionDetails />
                                </>
                            }
                        />

                        <Route
                            path='subscription/manage/uniquePid'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Subscriptions
                                    </PageTitle>
                                    <UniquePidPage />
                                </>
                            }
                        />

                        <Route
                            path='subscription/manage/m2complete'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Subscriptions
                                    </PageTitle>
                                    <M2CompletePage />
                                </>
                            }
                        />

                        <Route
                            path='addresses'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Addresses
                                    </PageTitle>
                                    <ManageAddressesTable />
                                </>
                            }
                        />

                        <Route
                            path='billing-history'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Billing History
                                    </PageTitle>
                                    <BillingHistoryTable />
                                </>
                            }
                        />

                        <Route
                            path='billing-history/uniquePid'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Billing History
                                    </PageTitle>
                                    <UniquePidPage />
                                </>
                            }
                        />

                        <Route
                            path='billing-history/m2complete'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Billing History
                                    </PageTitle>
                                    <M2CompletePage />
                                </>
                            }
                        />

                        <Route index element={<Navigate to='/settings' />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default BillingPage
