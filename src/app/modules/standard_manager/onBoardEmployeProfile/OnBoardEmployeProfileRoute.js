import {Navigate, Routes, Route, Outlet, useLocation} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import OnBoardEmployeProfileHeader from './OnBoardEmployeProfileHeader'
import OnBoardPersonalInfo from './components/OnBoardPersonalInfo'
import OnBoardEmployementPackage from './components/OnBoardEmployementPackage'
import OnBoardEmployementComments from './components/OnBoardEmployementComments'
import {getLeadByIdServices, getOnbordingEmployeebyIdService} from '../../../../services/Services'
import AccessRights from '../../../../accessRights/AccessRights'
import DocumentsPage from '../management/particularEmployee/compoents/documents/DocumentsPage'
import useCustomAccessRights from '../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const OnBoardEmployeProfileRoute = () => {
    const location = useLocation()
    const [userData, setUserData] = useState(null)

    const [loading, setLoading] = useState(false)
    const {employeeProfileAccess} = useCustomAccessRights({userData})

    useEffect(() => {
        if (location?.state?.moduleType == 'onboarding') {
            getOnBoardingData()
        } else {
            getLeadData()
        }
    }, [])
    const getOnBoardingData = () => {
        setLoading(true)
        getOnbordingEmployeebyIdService(location?.state?.id)
            .then((res) => setUserData(res?.data))
            .finally(() => setLoading(false))
    }
    const getLeadData = () => {
        setLoading(true)
        getLeadByIdServices(location?.state?.id)
            .then((res) => setUserData(res?.data))
            .finally(() => setLoading(false))
    }

    const getData = () => {
        if (location?.state?.moduleType == 'leads') getLeadData()
        else getOnBoardingData()
    }
    return (
        <div className='mt-6 mx-sm-10 '>
            <Routes>
                <Route
                    element={
                        <>
                            <OnBoardEmployeProfileHeader
                                userData={userData}
                                loading={loading}
                                getData={getData}
                                setLoading={setLoading}
                                moduleType={location?.state?.moduleType}
                            />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='personal-info'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}> Setup</PageTitle>
                                <OnBoardPersonalInfo userData={userData} getData={getLeadData} />
                            </>
                        }
                    />
                    <Route
                        path='employement-package'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}> Setup</PageTitle>
                                <OnBoardEmployementPackage id={location?.state?.id} />
                            </>
                        }
                    />
                    <Route
                        path='comments'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}> Setup</PageTitle>
                                <OnBoardEmployementComments />
                            </>
                        }
                    />
                    <Route
                        path='document'
                        element={
                            <AccessRights
                                showPlaceHolder
                                customCondition={employeeProfileAccess.viewDocumentAccess}
                            >
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Documents </PageTitle>
                                <DocumentsPage employeeData={userData} />
                            </AccessRights>
                        }
                    />

                    <Route index element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default OnBoardEmployeProfileRoute
