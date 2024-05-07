import {useState, useEffect} from 'react'
import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import ApprovalsTable from './components/ApprovalsTable'
import IncentivesTable from './components/IncentivesTable'
import {RequestsHeader} from './components/RequestsHeader'
import RequestsTable from './components/RequestsTable'
import {useLocation} from 'react-router-dom'
import ParticularRequest from './components/particularRequest/ParticularRequest'
import ParticularApprovalHistory from './components/particularRequest/ParticularApprovalHistory'
import AccessRights from '../../../../accessRights/AccessRights'
import {getPayFrequencySettingAction} from '../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import {getApprovalListAction} from '../../../../redux/actions/RequestApprovalActions'

const profileBreadCrumbs = [
    {
        title: 'Dashboard /',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const RequestsPage = () => {
    const location = useLocation()
    const [showIncentive, setShowIncentive] = useState(false)

    const [requestFilters, setRequestFilters] = useState(null)
    const [approvalFilters, setApprovalFilters] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPayFrequencySettingAction())
        dispatch(getApprovalListAction({page: 1, api_type: 'approval', filter: ''}))
    }, [])

    return (
        <div className='px-sm-10'>
            <Routes>
                <Route
                    element={
                        <>
                            {!location.pathname.includes('particular') && (
                                <RequestsHeader
                                    showIncentive={showIncentive}
                                    setShowIncentive={setShowIncentive}
                                />
                            )}
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='request'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Requests</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.requestAndApprovels.myRequests
                                            .view
                                    }
                                    showPlaceHolder
                                >
                                    <RequestsTable
                                        setRequestFilters={setRequestFilters}
                                        requestFilters={requestFilters}
                                    />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='approvals'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Approvals</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.requestAndApprovels.approvals
                                            .view
                                    }
                                    showPlaceHolder
                                >
                                    <ApprovalsTable
                                        setApprovalFilters={setApprovalFilters}
                                        approvalFilters={approvalFilters}
                                    />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='Incentives'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Incentives</PageTitle>
                                <IncentivesTable />
                            </>
                        }
                    />
                    <Route
                        path='approvals/particular-request'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Approvals</PageTitle>
                                <ParticularRequest />
                            </>
                        }
                    />
                    <Route
                        path='request/particular-request'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Requests</PageTitle>
                                <ParticularRequest />
                            </>
                        }
                    />
                    <Route
                        path='approvals/particular-request-history'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Approvals</PageTitle>
                                <ParticularApprovalHistory />
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default RequestsPage
