import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {
    getUserDataSelector,
    isUserManagerSelector,
    isUserSuperAdminSelector,
} from '../redux/selectors/AuthSelectors'
import {PERMISSIONS_GROUP, PERMISSION_TYPE} from './AccessRightsConstants'
import {isPermittedForAccess} from './AccessRights'

const commonCRUDAccessPermission = (permission) => {
    return {
        add: {
            permission,
            type: PERMISSION_TYPE.add,
        },
        view: {
            permission,
            type: PERMISSION_TYPE.view,
        },
        edit: {
            permission,
            type: PERMISSION_TYPE.edit,
        },
        delete: {
            permission,
            type: PERMISSION_TYPE.delete,
        },
        hireNow: {
            permission,
            type: PERMISSION_TYPE.hireNow,
        },
        viewFunc: () =>
            isPermittedForAccess({
                permission,
                type: PERMISSION_TYPE.view,
            }),
        addFunc: () =>
            isPermittedForAccess({
                permission,
                type: PERMISSION_TYPE.add,
            }),
        editFunc: () =>
            isPermittedForAccess({
                permission,
                type: PERMISSION_TYPE.edit,
            }),
        deleteFunc: () =>
            isPermittedForAccess({
                permission,
                type: PERMISSION_TYPE.delete,
            }),
        hireNowFunc: () =>
            isPermittedForAccess(
                {
                    permission,
                    type: PERMISSION_TYPE.hireNow,
                },
                true
            ),
    }
}

export const allPermissionsAccess = {
    administrator: {
        integrations: {
            integrations: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.integrations.integrations
            ),
        },
        setting: {
            setup: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.setting.setup),
            locations: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.setting.locations
            ),
            costTracking: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.setting.costTracking
            ),
            departments: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.setting.departments
            ),
            positions: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.setting.positions
            ),
            alerts: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.setting.alerts),
            bankAccounts: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.setting.bankAccounts
            ),
            paperWork: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.setting.paperWork
            ),
        },

        dashboard: {
            dashboard: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.dashboard.dashboard
            ),
        },
        sequiDocs: {
            templates: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.sequiDocs.templates
            ),
            documents: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.sequiDocs.documents
            ),
        },
        payroll: {
            runPayrollAndApprovals: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.payroll.runPayrollAndApprovals
            ),
            oneTimePayment: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.payroll.oneTimePayment
            ),
            paymentRequest: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.payroll.paymentRequest
            ),
            payrollReconciliation: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.payroll.payrollReconciliation
            ),
        },
        reports: {
            company: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.reports.company),
            sales: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.reports.sales),
            cost: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.reports.cost),
            payroll: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.reports.payroll),
            reconciliation: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.reports.reconciliation
            ),
            clawback: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.reports.clawback),
            pendingInstall: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.reports.pendingInstall
            ),
        },
        permissions: {
            group: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.permissions.group),
            policies: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.permissions.policies
            ),
        },
        marketingDeals: {
            marketingDeals: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.administrator.marketingDeal.marketingDeal
            ),
        },
        importExport: {},
        alertCenter: {
            alerts: commonCRUDAccessPermission(PERMISSIONS_GROUP.administrator.alertCenter.alerts),
        },
        support: {},
    },
    standard: {
        dashboard: {
            dashboard: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.dashboard.dashboard),
        },
        mySales: {
            mysales: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.mySales.mySales),
            myOverrides: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.mySales.myOverrides),
            payStubs: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.mySales.payStubs),
        },
        hiring: {
            hiringProgress: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.standard.hiring.hiringProgress
            ),
            leads: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.hiring.leads),
            onboardingEmployees: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.standard.hiring.onboardingEmployees
            ),
        },
        calendar: {
            calendar: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.calendar.calendar),
        },
        management: {
            employee: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.management.employee),
            team: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.management.teams),
        },
        community: {},
        projections: {},
        reports: {
            office: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.reports.office),
            sales: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.reports.sales),
            pastPayStubs: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.standard.reports.pastPayStubs
            ),
            reconciliation: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.standard.reports.reconciliation
            ),
            marketingDeal: null,
        },
        training: {},
        requestAndApprovels: {
            myRequests: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.standard.requestsAndApprovals.myRequests
            ),
            approvals: commonCRUDAccessPermission(
                PERMISSIONS_GROUP.standard.requestsAndApprovals.approvals
            ),
        },
        support: {},
        sequidocs: {
            templates: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.sequiDocs.templates),
            documents: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.sequiDocs.documents),
        },
        referrals: {
            referrals: commonCRUDAccessPermission(PERMISSIONS_GROUP.standard.referrals.referrals),
        },
    },
}

const useCustomAccessRights = ({employeeData = null} = {}) => {
    const logggedInUserData = useSelector(getUserDataSelector)
    const isLoggedInUserSuperAdmin = useSelector(isUserSuperAdminSelector)
    const isLoggedInUserManager = useSelector(isUserManagerSelector)

    const isOwnUser = useMemo(
        () => logggedInUserData?.id == employeeData?.id,
        [employeeData?.id, logggedInUserData?.id]
    )

    const isOwnUserSuperAdmin = useMemo(
        () => isOwnUser && logggedInUserData?.is_super_admin,
        [isOwnUser, logggedInUserData?.is_super_admin]
    )

    const isManagerOfUser = useMemo(
        () => logggedInUserData?.id == employeeData?.manager_id,
        [employeeData?.manager_id, logggedInUserData?.id]
    )

    const isSameOffice = useMemo(
        () => logggedInUserData?.office_id == employeeData?.office_id,
        [employeeData?.office_id, logggedInUserData?.office_id]
    )

    // Hiring
    const showConfigurationButtonAccess = useMemo(
        () => isLoggedInUserSuperAdmin,
        [isLoggedInUserSuperAdmin]
    )

    const showEditHireDateButton = useMemo(
        () => isLoggedInUserSuperAdmin,
        [isLoggedInUserSuperAdmin]
    )

    const employeeProfileAccess = useMemo(() => {
        return {
            // Top Button
            showTransferButtonAccess: !isOwnUser && (isLoggedInUserSuperAdmin || isManagerOfUser),
            showEnableDismissButtonAccess:
                !isOwnUser && (isLoggedInUserSuperAdmin || isManagerOfUser),
            showStartStopPayrollButtonAccess: isLoggedInUserSuperAdmin && !isOwnUser,
            showStartStopLoginButtonAccess: isLoggedInUserSuperAdmin && !isOwnUser,
            showResetPasswordButtonAccess: isLoggedInUserSuperAdmin,
            showPayrollHistoryButton: isOwnUser || isLoggedInUserSuperAdmin,
            showChangePasswordButton: isOwnUser,

            // Personal Info
            viewPersonalInfoAccess:
                isLoggedInUserSuperAdmin || isOwnUser || (isLoggedInUserManager && isSameOffice),
            editPersonalInfo: isLoggedInUserSuperAdmin || isOwnUser,

            // Employment Package
            viewEmploymentPackageInfoAccess: isLoggedInUserSuperAdmin || isOwnUser,
            editEmploymentPackageAccess: isLoggedInUserSuperAdmin,
            showViewRedlineChangesAccess: isLoggedInUserSuperAdmin || isOwnUser,

            // Tax Info
            viewTaxInfoAccess: isLoggedInUserSuperAdmin || isOwnUser,
            editTaxInfoAccess: isLoggedInUserSuperAdmin || isOwnUser,

            // Bankingg Info
            viewBankingAccess: isLoggedInUserSuperAdmin || isOwnUser,
            editBankingInfoAccess: isLoggedInUserSuperAdmin || isOwnUser,

            // Documet Tab
            viewDocumentAccess: isLoggedInUserSuperAdmin || isOwnUser,
            addDocumentAccess: isLoggedInUserSuperAdmin || isOwnUser || isManagerOfUser,
            deleteDocumentAccess: isLoggedInUserSuperAdmin || isOwnUser,

            // Permission Tab
            viewPermissionAccess: isLoggedInUserSuperAdmin,
            editPermissionsAccess: isLoggedInUserSuperAdmin,

            // Network Tab
            showEnableDisableOverrideButttonAccess: isLoggedInUserSuperAdmin,
            viewNetworkAccess: (isOwnUser || isLoggedInUserSuperAdmin) && !isOwnUserSuperAdmin,
            addManualOverrideAccess: isLoggedInUserSuperAdmin,
            showOverridesOnButtonAccess: isLoggedInUserSuperAdmin,
        }
    }, [
        isLoggedInUserManager,
        isLoggedInUserSuperAdmin,
        isManagerOfUser,
        isOwnUser,
        isOwnUserSuperAdmin,
        isSameOffice,
    ])

    const sideBarAccess = useMemo(
        () => ({
            administrator: {
                dashboard: allPermissionsAccess.administrator.dashboard.dashboard.viewFunc(),
                setting:
                    isPermittedForAccess({
                        customCondition:
                            allPermissionsAccess.administrator.setting.setup.viewFunc(),
                    }) ||
                    allPermissionsAccess.administrator.setting.locations.viewFunc() ||
                    allPermissionsAccess.administrator.setting.costTracking.viewFunc() ||
                    allPermissionsAccess.administrator.setting.departments.viewFunc() ||
                    allPermissionsAccess.administrator.setting.positions.viewFunc() ||
                    allPermissionsAccess.administrator.setting.alerts.viewFunc() ||
                    allPermissionsAccess.administrator.setting.bankAccounts.viewFunc() ||
                    allPermissionsAccess.administrator.setting.paperWork.viewFunc(),
                integrations:
                    allPermissionsAccess.administrator.integrations.integrations.viewFunc(),
                sequiDocs:
                    allPermissionsAccess.administrator.sequiDocs.documents.viewFunc() ||
                    allPermissionsAccess.administrator.sequiDocs.templates.viewFunc(),
                payroll:
                    allPermissionsAccess.administrator.payroll.oneTimePayment.viewFunc() ||
                    allPermissionsAccess.administrator.payroll.paymentRequest.viewFunc() ||
                    allPermissionsAccess.administrator.payroll.payrollReconciliation.viewFunc(),
                reports:
                    allPermissionsAccess.administrator.reports.company.viewFunc() ||
                    allPermissionsAccess.administrator.reports.clawback.viewFunc() ||
                    allPermissionsAccess.administrator.reports.cost.viewFunc() ||
                    allPermissionsAccess.administrator.reports.payroll.viewFunc() ||
                    allPermissionsAccess.administrator.reports.reconciliation.viewFunc() ||
                    allPermissionsAccess.administrator.reports.pendingInstall.viewFunc() ||
                    allPermissionsAccess.administrator.reports.sales.viewFunc(),
                permissions:
                    allPermissionsAccess.administrator.permissions.group.viewFunc() ||
                    allPermissionsAccess.administrator.permissions.policies.viewFunc(),
                alertCenter: allPermissionsAccess.administrator.alertCenter.alerts.viewFunc(),
            },
            standard: {
                dashboard: allPermissionsAccess.standard.dashboard.dashboard.viewFunc(),
                mySales:
                    allPermissionsAccess.standard.mySales.mysales.viewFunc() ||
                    allPermissionsAccess.standard.mySales.myOverrides.viewFunc() ||
                    allPermissionsAccess.standard.mySales.payStubs.viewFunc(),
                hiring:
                    allPermissionsAccess.standard.hiring.hiringProgress.viewFunc() ||
                    allPermissionsAccess.standard.hiring.leads.viewFunc() ||
                    allPermissionsAccess.standard.hiring.onboardingEmployees.viewFunc(),
                referrals: allPermissionsAccess.standard.referrals.referrals.viewFunc(),
                sequiDocs:
                    allPermissionsAccess.standard.sequidocs.documents.viewFunc() ||
                    allPermissionsAccess.standard.sequidocs.templates.viewFunc(),
                calendar: allPermissionsAccess.standard.calendar.calendar.viewFunc(),
                management:
                    allPermissionsAccess.standard.management.employee.viewFunc() ||
                    allPermissionsAccess.standard.management.team.viewFunc(),
                reports:
                    allPermissionsAccess.standard.reports.office.viewFunc() ||
                    allPermissionsAccess.standard.reports.pastPayStubs.viewFunc() ||
                    allPermissionsAccess.standard.reports.reconciliation.viewFunc() ||
                    allPermissionsAccess.standard.reports.sales.viewFunc(),
                requestAndApprovals:
                    allPermissionsAccess.standard.requestAndApprovels.myRequests.viewFunc() ||
                    allPermissionsAccess.standard.requestAndApprovels.approvals.viewFunc(),
            },
        }),
        []
    )

    return {
        // Sidebar
        sideBarAccess: sideBarAccess,

        // Hiring
        hiringAccess: {
            showConfigurationButtonAccess,
            showEditHireDateButton,
        },
        // Employee Profile
        employeeProfileAccess: employeeProfileAccess,
    }
}

export default useCustomAccessRights
