import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../../accessRights/AccessRights'

import {PageLink, PageTitle} from '../../../../../../../_metronic/layout/core'
import SingleSalePage from '../../../../../admin/reports/component/sales/SingleSalePage'
import SetupCard1 from './BackendCard'
import MyOverrides from './myOverrides/MyOverrides'
import {MySalesHeader} from './MySalesHeader'
import PayStabPage from './payStab/PayStabPage'
import {allPermissionsAccess} from '../../../../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard /',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const MySalesRoute = () => {
    return (
        <div style={{marginTop: -20}} className='px-sm-10'>
            <Routes>
                <Route
                    element={
                        <>
                            <MySalesHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='sales'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>My Sales</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.mySales.mysales.view
                                    }
                                    showPlaceHolder
                                >
                                    <SetupCard1 />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route
                        path='my-overrides'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>My Overrides</PageTitle>
                                {/* <Overview /> */}
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.mySales.myOverrides.view
                                    }
                                    showPlaceHolder
                                >
                                    <MyOverrides />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='pay-stubs'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Pay Stubs</PageTitle>
                                {
                                    /* <Overview /> */
                                    <AccessRights
                                        customCondition={
                                            allPermissionsAccess.standard.mySales.payStubs.view
                                        }
                                        showPlaceHolder
                                    >
                                        <PayStabPage current={true} />
                                    </AccessRights>
                                }
                            </>
                        }
                    />
                    <Route
                        path='sales/mycustomer-Info'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>My Sales</PageTitle>
                                <SingleSalePage />
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/mysales' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default MySalesRoute
