import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import {MdHeader} from './MdHeader'
import {lazy} from 'react'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const MdPage = () => {
    const CostTrackingCard = lazy(import('./costTrackingComponent/CostTrackingCard'))
    const MdCard = lazy(import('./mdComponents/MdCard'))

    return (
        <div className='mt-6 px-sm-5'>
            <Routes>
                <Route
                    element={
                        <>
                            <MdHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='md-list'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Marketing Deal
                                </PageTitle>
                                <MdCard />
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
                                <CostTrackingCard />
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default MdPage
