import {useCallback, useEffect, useMemo, useState} from 'react'
import {Navigate, Routes, Route, Outlet, useLocation} from 'react-router-dom'
import {
    getEmployeeProfileService,
    getOnBoardingConfigurationService,
    getOnBoardingEmployeeDetailService,
} from '../../../../../services/Services'
import {PageTitle} from '../../../../../_metronic/layout/core'
import DocumentsPage from './compoents/documents/DocumentsPage'
import NetorkPage from './compoents/network/NetorkPage'
import PermissionsPage from './compoents/permissions/PermissionsPage'
import {ParticularEmployeHeader} from './ParticularEmployeHeader'
import UserEmployementPackage from './compoents/UserEmployementPackage'
import ProfilePersonalTax from '../../../common/components/ProfilePersonalTax'
import ProfilePersonalBanking from '../../../common/components/ProfilePersonalBanking'
import ProfilePersonalInfoPage from '../../../common/components/ProfilePersonalInfoPage'
import useCustomAccessRights from '../../../../../accessRights/useCustomAccessRights'
import AccessRights from '../../../../../accessRights/AccessRights'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import useQueryString from '../../../../../hooks/useQueryString'

const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const ParticularEmployePage = () => {
    const [employeeData, setEmployeeData] = useState('')
    const [searchParams] = useQueryString()
    const [loading, setLoading] = useState(true)
    const employee_id = useMemo(
        () => searchParams?.employeeId ?? employeeData?.id,
        [employeeData?.id, searchParams?.employeeId]
    )

    const {employeeProfileAccess} = useCustomAccessRights({employeeData})

    useEffect(() => {
        getEmployeeProfile(true)
    }, [employee_id])

    const getEmployeeProfile = useCallback(
        (firstTime = false) =>
            new Promise((resolve, reject) => {
                if (employee_id) {
                    if (firstTime) setLoading(true)
                    getEmployeeProfileService(employee_id)
                        .then((res) => {
                            setEmployeeData(res.data)
                        })
                        .finally(() => {
                            setLoading(false)
                            resolve(true)
                        })
                }
            }),
        [employee_id]
    )

    return (
        <div className='px-sm-10' style={{marginTop: -20}}>
            <CustomLoader visible={loading} />
            {!loading ? (
                <Routes>
                    <Route
                        element={
                            <AccessRights
                                title={''}
                                customCondition={employeeProfileAccess.viewPersonalInfoAccess}
                                showPlaceHolder
                            >
                                <ParticularEmployeHeader
                                    employeeData={employeeData}
                                    loading={loading}
                                    getProfile={getEmployeeProfile}
                                />
                                <Outlet />
                            </AccessRights>
                        }
                    >
                        <Route
                            path='personal-info'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={employeeProfileAccess.viewPersonalInfoAccess}
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Personal Info
                                    </PageTitle>
                                    <ProfilePersonalInfoPage getProfile={getEmployeeProfile} />
                                </AccessRights>
                            }
                        />
                        <Route
                            path='employment-package'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={
                                        employeeProfileAccess.viewEmploymentPackageInfoAccess
                                    }
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Employment Package
                                    </PageTitle>
                                    <UserEmployementPackage
                                        id={employee_id}
                                        getTopCardUserProfile={getEmployeeProfile}
                                    />
                                </AccessRights>
                            }
                        />
                        <Route
                            path='document'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={employeeProfileAccess.viewDocumentAccess}
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Documents{' '}
                                    </PageTitle>
                                    <DocumentsPage employeeData={employeeData} />
                                </AccessRights>
                            }
                        />
                        {/* s */}
                        <Route
                            path='network'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={employeeProfileAccess.viewNetworkAccess}
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>Network</PageTitle>
                                    <NetorkPage employeeData={employeeData} />
                                </AccessRights>
                            }
                        />
                        <Route
                            path='permissions'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={employeeProfileAccess.viewPermissionAccess}
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>
                                        Permissions
                                    </PageTitle>
                                    <PermissionsPage
                                        employeeData={employeeData}
                                        getEmployeeProfile={getEmployeeProfile}
                                    />
                                </AccessRights>
                            }
                        />
                        <Route
                            path='tax-info'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={employeeProfileAccess.viewNetworkAccess}
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>Tax Info</PageTitle>
                                    <ProfilePersonalTax
                                        employeeData={employeeData}
                                        getEmployeeProfile={getEmployeeProfile}
                                    />
                                </AccessRights>
                            }
                        />
                        <Route
                            path='banking'
                            element={
                                <AccessRights
                                    showPlaceHolder
                                    customCondition={employeeProfileAccess.viewBankingAccess}
                                >
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>Banking</PageTitle>
                                    <ProfilePersonalBanking
                                        employeeData={employeeData}
                                        getBankData={getEmployeeProfile}
                                    />
                                </AccessRights>
                            }
                        />
                        <Route index element={<Navigate to='/dashboard' />} />
                    </Route>
                </Routes>
            ) : null}
        </div>
    )
}

export default ParticularEmployePage
