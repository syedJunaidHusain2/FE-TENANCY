/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect, useMemo} from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ROLES} from '../../../../../accessRights/AccessRightsConstants'
import {getActiveRoleSelector} from '../../../../../redux/selectors/AuthSelectors'
import AccessRights from '../../../../../accessRights/AccessRights'
import {useDispatch} from 'react-redux'
import {getAlertCenterListAction} from '../../../../../redux/actions/DashboardActions'
import {
    getAlertCenterCount,
    getAlertCenterListSelector,
} from '../../../../../redux/selectors/DashboardSelectors'
import useCustomAccessRights, {
    allPermissionsAccess,
} from '../../../../../accessRights/useCustomAccessRights'
import {getCompanySettingSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {KTSVG} from '../../../../helpers'

const SidebarMenuMain = () => {
    const intl = useIntl()
    // const alertCenterListCount = useSelector(getAlertCenterListSelector)
    const alertCenterListCount = useSelector(getAlertCenterCount)

    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const activeRole = useSelector(getActiveRoleSelector)
    const {sideBarAccess} = useCustomAccessRights()

    const companySetting = useSelector(getCompanySettingSelector)

    useEffect(() => {
        dispatch(getAlertCenterListAction())
    }, [])

    const alertsCount = useMemo(() => {
        return (
            alertCenterListCount?.closedPayroll +
            alertCenterListCount?.locationRedline +
            alertCenterListCount?.missingRep +
            alertCenterListCount?.repRedline +
            alertCenterListCount?.sales +
            alertCenterListCount?.people
        )
    }, [
        alertCenterListCount?.closedPayroll,
        alertCenterListCount?.locationRedline,
        alertCenterListCount?.missingRep,
        alertCenterListCount?.people,
        alertCenterListCount?.repRedline,
        alertCenterListCount?.sales,
    ])

    const redirectRoute = useMemo(() => {
        return getRedirectRoute({companySetting})
    }, [companySetting])

    return activeRole ? (
        <>
            {activeRole === ROLES.standard.roleValue ? (
                <>
                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.dashboard}>
                        <SidebarMenuItem
                            to={redirectRoute.standard.dashboard}
                            icon={
                                pathname.includes('dashboard')
                                    ? '/media/icons/duotune/art/dashboard1.svg'
                                    : '/media/icons/duotune/art/shape.svg'
                            }
                            title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>
                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.mySales}>
                        <SidebarMenuItem
                            to={redirectRoute.standard.mySales}
                            icon={
                                pathname.includes('/mysales')
                                    ? '/media/icons/duotune/art/MySales.svg'
                                    : '/media/icons/duotune/art/MySalesInactive.svg'
                            }
                            title='My Sales'
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>
                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.referrals}>
                        <SidebarMenuItem
                            to='/referrals'
                            icon={
                                pathname.includes('/referrals')
                                    ? '/media/icons/duotune/art/HiringActive.svg'
                                    : '/media/icons/duotune/art/Hiring.svg  '
                            }
                            title='Referrals'
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>
                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.sequiDocs}>
                        <SidebarMenuItem
                            to={redirectRoute.standard.sequiDocs}
                            icon={
                                pathname.includes('sequidocs')
                                    ? '/media/icons/duotune/art/doc1.svg'
                                    : '/media/icons/duotune/art/doc.svg'
                            }
                            title={
                                <KTSVG
                                    path='/media/icons/duotune/art/SequiDocLogo.svg'
                                    svgStyle={{height: '25px', width: '100px', marginLeft: '-8px'}}
                                />
                            }
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.hiring}>
                        <SidebarMenuItem
                            to={redirectRoute.standard.hiring}
                            icon={
                                pathname.includes('/hiring')
                                    ? '/media/icons/duotune/art/HiringActive.svg'
                                    : '/media/icons/duotune/art/Hiring.svg'
                            }
                            title='Hiring'
                        />
                    </AccessRights>

                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.calendar}>
                        <SidebarMenuItem
                            to={redirectRoute.standard.calendar}
                            icon={
                                pathname.includes('/calendar')
                                    ? '/media/icons/duotune/art/ClaendarActive.svg'
                                    : '/media/icons/duotune/art/Calendar.svg'
                            }
                            title='Calendar'
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>
                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.standard.management}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.standard.management}
                            icon={
                                pathname.includes('/management')
                                    ? '/media/icons/duotune/art/OficeActive.svg'
                                    : '/media/icons/duotune/art/OfficeIcon.svg'
                            }
                            title='Management'
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    {/* <SidebarMenuItem
            to='/community'
            icon={
              pathname.includes('/dashboard')
                ? '/media/icons/duotune/art/CommunityActive.svg'
                : '/media/icons/duotune/art/CommunityIcon.svg'
            }
            title='Community'
            fontIcon='bi-app-indicator'
          /> */}

                    {/* <SidebarMenuItem
            to='/projections'
            icon={
              pathname.includes('/builder')
                ? '/media/icons/duotune/art/ProjectionsActive.svg'
                : '/media/icons/duotune/art/ProjectionICon.svg'
            }
            title='Projections'
            fontIcon=''
          /> */}

                    <AccessRights ignorePosition customCondition={sideBarAccess.standard.reports}>
                        <SidebarMenuItem
                            to={redirectRoute.standard.reports}
                            icon={
                                pathname.includes('/smReports')
                                    ? '/media/icons/duotune/art/ReportsActive.svg'
                                    : '/media/icons/duotune/art/ReportsIcon.svg'
                            }
                            title='Reports'
                            fontIcon=''
                        />
                    </AccessRights>

                    {/* <SidebarMenuItem
            to='/builder'
            icon={
              pathname.includes('/builder')
                ? '/media/icons/duotune/art/TrainingActive.svg'
                : '/media/icons/duotune/art/TrainingIcon.svg'
            }
            title='Training'
            fontIcon=''
          /> */}
                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.standard.requestAndApprovals}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.standard.requestAndApprovals}
                            icon={
                                pathname.includes('/requests/')
                                    ? '/media/icons/duotune/art/Request&AprovalActive.svg'
                                    : '/media/icons/duotune/art/Request&Aproval.svg'
                            }
                            title='Requests & Approvals'
                            fontIcon='Training'
                        />
                    </AccessRights>
                    {/* <SidebarMenuItem
            to='/builder'
            icon={
              pathname.includes('/builder')
                ? '/media/icons/duotune/art/SupportActive.svg'
                : '/media/icons/duotune/art/SupportIcon.svg'
            }
            title='Supports'
            fontIcon='Training'
          /> */}
                </>
            ) : (
                <>
                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.dashboard}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.dashboard}
                            icon={
                                pathname.includes('dashboard')
                                    ? '/media/icons/duotune/art/dashboard1.svg'
                                    : '/media/icons/duotune/art/shape.svg'
                            }
                            title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.setting}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.settings}
                            icon={
                                pathname.includes('setting')
                                    ? '/media/icons/duotune/art/setting1.svg'
                                    : '/media/icons/duotune/art/setting.svg'
                            }
                            title='Settings'
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.integrations}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.integrations}
                            icon={
                                pathname.includes('intregation')
                                    ? '/media/icons/duotune/art/IntregationsActive.svg'
                                    : '/media/icons/duotune/art/intregation.svg'
                            }
                            title='Integrations        '
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.sequiDocs}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.sequiDocs}
                            icon={
                                pathname.includes('sequidocs')
                                    ? '/media/icons/duotune/art/doc1.svg'
                                    : '/media/icons/duotune/art/doc.svg'
                            }
                            title={
                                <KTSVG
                                    path='/media/icons/duotune/art/SequiDocLogo.svg'
                                    svgStyle={{height: '25px', width: '100px', marginLeft: '-8px'}}
                                />
                            }
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.payroll}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.payroll}
                            icon={
                                pathname.includes('payroll/')
                                    ? '/media/icons/duotune/art/payroll1.svg'
                                    : '/media/icons/duotune/art/payroll.svg'
                            }
                            // icon='/media/icons/duotune/art/payroll.svg'
                            title='Payroll        '
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.reports}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.reports}
                            icon={
                                pathname.includes('reports')
                                    ? '/media/icons/duotune/art/reports1.svg'
                                    : '/media/icons/duotune/art/reports.svg'
                            }
                            // icon='/media/icons/duotune/art/reports.svg'
                            title='Reports        '
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.permissions}
                    >
                        <SidebarMenuItem
                            to={redirectRoute.administrator.permissions}
                            icon={
                                pathname.includes('permissions')
                                    ? '/media/icons/duotune/art/PermissionsActive.svg'
                                    : '/media/icons/duotune/art/PermissionsInactive.svg'
                            }
                            title='Permissions        '
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    {/* <SidebarMenuItem
            to='/marketing-deal/md-list'
            icon='/media/icons/duotune/art/marketting.svg'
            title='Marketting Deals'
            fontIcon='bi-app-indicator'
          /> */}

                    {/* <SidebarMenuItem
            to='/import-export     '
            icon='/media/icons/duotune/art/import.svg'
            title='Import / Export'
            fontIcon='bi-app-indicator'
          /> */}

                    <AccessRights
                        ignorePosition
                        customCondition={sideBarAccess.administrator.alertCenter}
                    >
                        <SidebarMenuItem
                            badgeCount={alertsCount}
                            to={redirectRoute.administrator.alertCenter}
                            icon={
                                pathname.includes('alert-center')
                                    ? '/media/icons/duotune/art/alert-triangle-active.svg'
                                    : '/media/icons/duotune/art/alert-triangle-inActive.svg'
                            }
                            title='Alert Center'
                            fontIcon='bi-app-indicator'
                        />
                    </AccessRights>

                    {/* <SidebarMenuItem
            to='/support     '
            icon='/media/icons/duotune/art/support.svg'
            title='Support'
            fontIcon='bi-app-indicator'
          /> */}
                </>
            )}
        </>
    ) : null
}

const getRedirectRoute = ({companySetting}) => {
    return {
        administrator: {
            dashboard: allPermissionsAccess.administrator.dashboard.dashboard.viewFunc()
                ? '/admin-dashboard'
                : '',
            settings: allPermissionsAccess.administrator.setting.setup.viewFunc()
                ? '/setting/setup'
                : allPermissionsAccess.administrator.setting.locations.viewFunc()
                ? '/setting/location'
                : allPermissionsAccess.administrator.setting.costTracking.viewFunc()
                ? '/cost-center'
                : allPermissionsAccess.administrator.setting.departments.viewFunc()
                ? '/setting/department'
                : allPermissionsAccess.administrator.setting.positions.viewFunc()
                ? '/setting/position'
                : allPermissionsAccess.administrator.setting.alerts.viewFunc()
                ? '/setting/alert'
                : allPermissionsAccess.administrator.setting.bankAccounts.viewFunc()
                ? '/setting/bank-account'
                : allPermissionsAccess.administrator.setting.paperWork.viewFunc()
                ? '/setting/paperwork'
                : '',
            integrations: allPermissionsAccess.administrator.integrations.integrations.viewFunc()
                ? '/intregation'
                : '',
            sequiDocs: allPermissionsAccess.administrator.sequiDocs.templates.viewFunc()
                ? '/sequidocs/templates'
                : allPermissionsAccess.administrator.sequiDocs.documents.viewFunc()
                ? '/sequidocs/documents'
                : '',
            payroll: allPermissionsAccess.administrator.payroll.runPayrollAndApprovals.viewFunc()
                ? '/payroll/run-payroll'
                : allPermissionsAccess.administrator.payroll.oneTimePayment.viewFunc()
                ? 'payroll/one-time-payment'
                : allPermissionsAccess.administrator.payroll.paymentRequest.viewFunc()
                ? '/payroll/payment-request'
                : companySetting?.reconciliation &&
                  allPermissionsAccess.administrator.payroll.payrollReconciliation.viewFunc()
                ? '/payroll/reconciliation'
                : allPermissionsAccess.administrator.payroll.runPayrollAndApprovals.viewFunc()
                ? '/payroll/run-payroll'
                : '',
            reports: allPermissionsAccess.administrator.reports.company.viewFunc()
                ? '/reports/company'
                : allPermissionsAccess.administrator.reports.sales.viewFunc()
                ? '/reports/sales'
                : allPermissionsAccess.administrator.reports.cost.viewFunc()
                ? '/reports/costs'
                : allPermissionsAccess.administrator.reports.payroll.viewFunc()
                ? '/reports/payroll'
                : companySetting?.reconciliation &&
                  allPermissionsAccess.administrator.reports.reconciliation.viewFunc()
                ? '/reports/reconciliation'
                : allPermissionsAccess.administrator.reports.clawback.viewFunc()
                ? '/reports/clawback'
                : allPermissionsAccess.administrator.reports.pendingInstall.viewFunc()
                ? '/reports/pending-installs'
                : '',
            permissions: allPermissionsAccess.administrator.permissions.group.viewFunc()
                ? '/permissions/groups'
                : allPermissionsAccess.administrator.permissions.policies.viewFunc()
                ? '/permissions/policies'
                : '',
            alertCenter: allPermissionsAccess.administrator.alertCenter.alerts.viewFunc()
                ? '/alert-center/alerts'
                : '',
        },
        standard: {
            dashboard: allPermissionsAccess.standard.dashboard.dashboard.viewFunc()
                ? '/standard-dashboard'
                : '',
            mySales: allPermissionsAccess.standard.mySales.mysales.viewFunc()
                ? '/mysales/sales'
                : allPermissionsAccess.standard.mySales.myOverrides.viewFunc()
                ? '/mysales/my-overrides'
                : allPermissionsAccess.standard.mySales.payStubs.viewFunc()
                ? '/mysales/pay-stubs'
                : '',
            calendar: '/calendar',
            sequiDocs: allPermissionsAccess.standard.sequidocs.templates.viewFunc()
                ? '/std-sequidocs/templates'
                : allPermissionsAccess.standard.sequidocs.documents.viewFunc()
                ? '/sequidocs/documents'
                : '',
            hiring: allPermissionsAccess.standard.hiring.hiringProgress.viewFunc()
                ? '/hiring/hiring-process'
                : allPermissionsAccess.standard.hiring.leads.viewFunc()
                ? '/hiring/hiring-leads'
                : allPermissionsAccess.standard.hiring.onboardingEmployees.viewFunc()
                ? '/hiring/hiring-onBoardingEmployees'
                : '',
            management: allPermissionsAccess.standard.management.employee.viewFunc()
                ? '/management/employee'
                : allPermissionsAccess.standard.management.team.viewFunc()
                ? '/management/teams'
                : '',
            reports: allPermissionsAccess.standard.reports.office.viewFunc()
                ? '/smReports/office'
                : allPermissionsAccess.standard.reports.sales.viewFunc()
                ? '/smReports/sales'
                : allPermissionsAccess.standard.reports.pastPayStubs.viewFunc()
                ? '/smReports/pay-stubs'
                : companySetting?.reconciliation &&
                  allPermissionsAccess.standard.reports.reconciliation.viewFunc()
                ? '/smReports/reconciliation'
                : '',
            requestAndApprovals:
                allPermissionsAccess.standard.requestAndApprovels.myRequests.viewFunc()
                    ? '/requests/request'
                    : allPermissionsAccess.standard.requestAndApprovels.approvals.viewFunc()
                    ? '/requests/approvals'
                    : '',
        },
    }
}

export {SidebarMenuMain, getRedirectRoute}
