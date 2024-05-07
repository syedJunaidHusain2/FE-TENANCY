import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../../../_metronic/layout/core'
import OnBoardingTable from '../onBoardingEmp/OnBoardingTable'
import LeadsTable from '../hiringLeads/LeadsTable'
import HiringProcessPage from '../hiringProcess/HiringProcessPage'
import HiringHeader from './HiringHeader'
import ConfigureEmploye from '../onBoardingEmp/ConfigureEmploye'
import PipeLineCard from '../pipeLine/PipeLineCard'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../accessRights/AccessRights'
import useCustomAccessRights, {
    allPermissionsAccess,
} from '../../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Hiring/',
        path: '/hiring/hiring-process',
        isSeparator: false,
        isActive: false,
    },
]

const HiringRoutes = () => {
    const {hiringAccess} = useCustomAccessRights()

    return (
        <div className='px-sm-10' style={{marginTop: -20}}>
            <Routes>
                <Route
                    element={
                        <>
                            <HiringHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='hiring-process'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Hiring Process
                                </PageTitle>
                                {/* <Overview /> */}
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.hiring.hiringProgress.view
                                    }
                                    showPlaceHolder
                                >
                                    <HiringProcessPage />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='hiring-leads'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Leads</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.hiring.leads.view
                                    }
                                    showPlaceHolder
                                >
                                    <LeadsTable />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route
                        path='hiring-pipeline'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Pipeline</PageTitle>
                                <PipeLineCard />
                            </>
                        }
                    />

                    <Route
                        path='hiring-onBoardingEmployees'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Onboarding Employees
                                </PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.hiring.onboardingEmployees
                                            .view
                                    }
                                    showPlaceHolder
                                >
                                    <OnBoardingTable />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='cost-center'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Cost Center</PageTitle>
                                {/* <CostCenter /> */}
                            </>
                        }
                    />
                    <Route
                        path='hiring-onBoardingEmployees/config'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Configuration
                                </PageTitle>
                                <AccessRights
                                    customCondition={hiringAccess.showConfigurationButtonAccess}
                                >
                                    <ConfigureEmploye />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/hiring' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default HiringRoutes
