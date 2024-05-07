import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import React from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import CompanySetup from './components/companySetup/CompanySetup'
import Alert from './components/Alert'
import ProfileHeader from './ProfileHeader'
import Location from './components/Location'
import CostCenter from './components/CostCenter'
import Department from './components/Department'
import Position from './components/Position'
import {Permission} from './components/Permission'
import {Compensation} from './components/Compensation'
import Costs from '../costs/component/costs/Costs'
import SettingsEditProfile from './components/SettingsEditProfile'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import SetupPaperwork from './components/setupPaperwork/SetupPaperwork'
import SetupBankAcc from './components/setupBankAcc/SetupBankAcc'
import PositionPeople from './components/Position/PositionPeople'
import useCustomAccessRights, {
    allPermissionsAccess,
} from '../../../../accessRights/useCustomAccessRights'
import HiringConfiguration from './components/hiringConfiguration/HiringConfiguration'
import SettingHiringPage from './components/hiringConfiguration/SettingHiringPage'
const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
        
    },
    {
        title: 'Settings/',
        path: 'setting/setup',
        isSeparator: false,
        isActive: false,
    },
]

const SettingHeader = () => {
    const {hiringAccess} = useCustomAccessRights()
    return (
        <div className='mx-sm-10'>
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
                        path='setup'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}> Setup</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.setup.view
                                    }
                                    showPlaceHolder
                                >
                                    <CompanySetup />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='hiring'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}> Hiring</PageTitle>
                                <AccessRights
                                    customCondition={hiringAccess.showConfigurationButtonAccess}
                                    showPlaceHolder
                                >
                                    <SettingHiringPage />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='alert'
                        element={
                            <>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.alerts.view
                                    }
                                    showPlaceHolder
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>Alert</PageTitle>
                                    <Alert />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route
                        path='bank-account'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Alert</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.bankAccounts.view
                                    }
                                    showPlaceHolder
                                >
                                    <SetupBankAcc />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='paperwork'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Alert</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.paperWork.view
                                    }
                                    showPlaceHolder
                                >
                                    <SetupPaperwork />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='costs'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Costs</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.costTracking.view
                                    }
                                    showPlaceHolder
                                >
                                    <Costs />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='location'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Location</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.locations.view
                                    }
                                    showPlaceHolder
                                >
                                    <Location />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='cost-center'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Cost Center</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.costTracking.view
                                    }
                                >
                                    <CostCenter />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='department'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Department</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.departments.view
                                    }
                                    showPlaceHolder
                                >
                                    <Department />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='position'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Position</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.positions.view
                                    }
                                    showPlaceHolder
                                >
                                    <Position />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='position/peoples'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Position</PageTitle>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.administrator.setting.positions.view
                                    }
                                    showPlaceHolder
                                >
                                    <PositionPeople />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route
                        path='compensation-plan'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Compensation Plan
                                </PageTitle>
                                <Compensation />
                            </>
                        }
                    />
                    <Route
                        path='permissions'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Permission</PageTitle>
                                <Permission />
                            </>
                        }
                    />
                    <Route
                        path='edit-profile'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>
                                    Edit Company Profile
                                </PageTitle>
                                <AccessRights showPlaceHolder forSuperAdmin>
                                    <SettingsEditProfile />
                                </AccessRights>
                            </>
                        }
                    />
                    <Route index element={<Navigate to='/setting' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default SettingHeader
