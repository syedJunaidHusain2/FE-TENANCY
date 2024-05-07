import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'

import BillingSidebar from './BillingSidebar'
import {PageTitle} from '../../../../../_metronic/layout/core'
import ManageSubscriptionTable from './ManageSubscriptionTable'
import ManageAddressesTable from './ManageAddressesTable'
import BillingHistoryTable from './BillingHistoryTable'

const profileBreadCrumbs = [
    {
        title: 'Settings/Billing',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const BillingUserRoute = () => {
    return (
        <div className='mt-6 pe-sm-15 ps-sm-15'>
            <Routes>
                <Route
                    path='subscription'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Subscriptions</PageTitle>
                            <ManageSubscriptionTable />
                        </>
                    }
                />

                <Route
                    path='addresses'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Addresses</PageTitle>
                            <ManageAddressesTable />
                        </>
                    }
                />
                <Route
                    path='billing-history'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Addresses</PageTitle>
                            <BillingHistoryTable />
                        </>
                    }
                />

                <Route index element={<Navigate to='/settings' />} />
            </Routes>
        </div>
    )
}

export default BillingUserRoute
