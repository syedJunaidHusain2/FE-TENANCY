import {Navigate, Routes, Route, useLocation} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import AlertsTable from './AlertsTable'
import AlertAdders from './alertTypes/AlertAdders'
import AlertsClawback from './alertTypes/AlertsClawback'
import PayrollAlert from './alertTypes/PayrollAlert'
import AccessRights from '../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import MissingInfoPage from './alertTypes/MissingInfoPage'
import useQueryString from '../../../../hooks/useQueryString'
import {useEffect} from 'react'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const ReportsHeader = () => {
    const location = useLocation()

    const [param, setParam] = useQueryString()

    useEffect(() => {
        let params = {...param, alertType: 'sales', page: 1, search: null, allSearchTerm: ''}
        if (location?.state?.alertType) params.alertType = location?.state?.alertType
        if (location?.state?.pid) params.allSearchTerm = location?.state?.pid
        if (location?.state?.search) params.search = location?.state?.search
        setParam(params)
    }, [])

    return (
        <div className='m-0 p-0'>
            <Routes>
                <Route
                    path='alerts'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Alerts</PageTitle>
                            <AccessRights
                                showPlaceHolder
                                customCondition={
                                    allPermissionsAccess.administrator.alertCenter.alerts.view
                                }
                            >
                                <AlertsTable param={param} setParam={setParam} />
                            </AccessRights>
                        </>
                    }
                />
                <Route
                    path='missing-info'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Add Sales</PageTitle>
                            {/* <ManageSalesPage /> */}
                            <MissingInfoPage />
                        </>
                    }
                />
                <Route
                    path='clawback'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Alerts</PageTitle>
                            <AlertsClawback />
                        </>
                    }
                />
                <Route
                    path='adders'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Alerts</PageTitle>
                            <AlertAdders />
                        </>
                    }
                />
                <Route
                    path='payroll'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Alerts</PageTitle>
                            <PayrollAlert />
                        </>
                    }
                />
                <Route index element={<Navigate to='/dashboard' />} />
            </Routes>
        </div>
    )
}

export default ReportsHeader
