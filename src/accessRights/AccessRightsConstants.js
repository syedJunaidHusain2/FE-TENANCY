// PERMISSIONS_GROUP.map((item) => ({roleName: item?.name, roleValue: item?.name }))
// PERMISSIONS_GROUP[0].grouppolicy.map((item) => ({moduleName: item?.policies?.replace(/[\s\/]/g,''), moduleValue: item?.policies }))
// PERMISSIONS_GROUP[0].grouppolicy[1].policytab.map((item) => ({subModuleName: item?.tabs?.replace(/[\s\/]/g,''), subModuleValue: item?.tabs }))
// PERMISSIONS_GROUP[0].grouppolicy[1].policytab[0].permission.map((item) => ({permissionName: item?.guard_name?.toLowerCase(), permissionValue: item?.name }))

// PERMISSIONS_GROUP.map((roleItem) => {
//     const roleName = roleItem.name.replace(/[\s&\/]/g,'')
//     permissions[roleName] = {};
//     roleItem.grouppolicy.map((moduleItem) => {
//         const moduleName = moduleItem.policies.replace(/[\s&\/]/g,'')
//         permissions[roleName][moduleName] = {}
//         moduleItem.policytab.map((subModuleItem) => {
//             const subModuleName = subModuleItem.tabs.replace(/[\s&\/]/g,'')
//             permissions[roleName][moduleName][subModuleName] = {}
//             permissions[roleName][moduleName][subModuleName] = {
//                     roleName: roleName,
//                     roleValue: roleItem.name,
//                     moduleName: moduleName,
//                     moduleValue: moduleItem.policies,
//                     subModuleName: subModuleName,
//                     subModuleValue: subModuleItem.tabs,
//                     view: subModuleItem?.permission?.some((item) => item.guard_name == 'View'),
//                     add: subModuleItem?.permission?.some((item) => item.guard_name == 'Add'),
//                     edit: subModuleItem?.permission?.some((item) => item.guard_name == 'Edit'),
//                     delete: subModuleItem?.permission?.some((item) => item.guard_name == 'Delete'),
//                 }

//         })
//     })
// })

const ALL_PERMISSIONS = {
    administrator: {
        // Dashboard
        dashboard: {
            view: 'dashboards-view',
            add: 'dashboards-add',
            edit: 'dashboards-edit',
            delete: 'dashboards-delete',
        },
        // Settings
        setup: {
            view: 'setup-view',
            add: 'setup-add',
            edit: 'setup-edit',
            delete: '',
        },
        locations: {
            view: 'locations-view',
            add: 'locations-add',
            edit: 'locations-edit',
            delete: 'locations-delete',
        },
        costTracking: {
            view: 'cost-tracking-view',
            add: 'cost-tracking-add',
            edit: 'cost-tracking-edit',
            delete: 'cost-tracking-delete',
        },
        departments: {
            view: 'departments-view',
            add: 'departments-add',
            edit: 'departments-edit',
            delete: 'departments-delete',
        },
        positions: {
            view: 'positions-view',
            add: 'positions-add',
            edit: 'positions-edit',
            delete: 'positions-delete',
        },
        alerts: {
            view: 'alerts-view',
            add: 'alerts-add',
            edit: 'alerts-edit',
            delete: 'alerts-delete',
        },
        bankAccounts: {
            view: 'bank-account-view',
            add: 'bank-account-add',
            edit: 'bank-account-edit',
            delete: 'bank-account-delete',
        },
        paperWork: {
            view: 'paperwork-view',
            add: 'paperwork-add',
            edit: 'paperwork-edit',
            delete: 'paperwork-delete',
        },

        // Integrations
        integrations: {
            view: 'integrations-view',
            add: 'integrations-add',
            edit: 'integrations-edit',
            delete: 'integrations-delete',
        },

        // Sequi Docs
        templates: {
            view: 'templates-view',
            add: 'templates-add',
            edit: 'templates-edit',
            delete: 'templates-delete',
        },
        documents: {
            view: 'documents-view',
            add: 'documents-add',
            edit: 'documents-edit',
            delete: 'documents-delete',
        },
        // Payroll
        runPayrollAndApprovals: {
            view: 'run-payroll-view',
            add: 'run-payroll-add',
            edit: 'run-payroll-edit',
            delete: 'run-payroll-delete',
        },
        oneTimePayment: {
            view: 'one-time-payment-view',
            add: 'one-time-payment-add',
            edit: 'one-time-payment-edit',
            delete: 'one-time-payment-delete',
        },
        paymentRequest: {
            view: 'payment-request-view',
            add: 'payment-request-add',
            edit: 'payment-request-edit',
            delete: 'payment-request-delete',
        },
        payrollReconciliation: {
            view: 'reconciliation-view',
            add: 'reconciliation-add',
            edit: 'reconciliation-edit',
            delete: 'reconciliation-delete',
        },

        // Reports
        company: {
            view: 'compony-view',
            add: 'compony-add',
            edit: 'compony-edit',
            delete: 'compony-delete',
        },
        sales: {
            view: 'sales-view',
            add: 'sales-add',
            edit: 'sales-edit',
            delete: 'sales-delete',
        },
        cost: {
            view: 'cost-view',
            add: 'cost-add',
            edit: 'cost-edit',
            delete: 'cost-delete',
        },
        payroll: {
            view: 'payroll-view',
            add: 'payroll-add',
            edit: 'payroll-edit',
            delete: 'payroll-delete',
        },
        reconciliation: {
            view: 'report-reconciliation-view',
            add: 'report-reconciliation-add',
            edit: 'report-reconciliation-edit',
            delete: 'report-reconciliation-delete',
        },
        clawback: {
            view: 'clawback-view',
            add: 'clawback-add',
            edit: 'clawback-edit',
            delete: 'clawback-delete',
        },
        pendingInstall: {
            view: 'pending-install-view',
            add: 'pending-install-add',
            edit: 'pending-install-edit',
            delete: 'pending-install-delete',
        },

        // Permissions
        group: {
            view: 'group-view',
            add: 'group-add',
            edit: 'group-edit',
            delete: 'group-delete',
        },
        policies: {
            view: 'policies-view',
            add: 'policies-add',
            edit: 'policies-edit',
            delete: 'policies-delete',
        },

        // Marketing Deal
        marketingDeal: {
            view: 'marketing-deal-view',
            add: 'marketing-deal-add',
            edit: 'marketing-deal-edit',
            delete: 'marketing-deal-delete',
        },
        marketingDealCostTracking: {
            view: 'cast-tracking-view',
            add: 'cast-tracking-add',
            edit: 'cast-tracking-edit',
            delete: 'cast-tracking-delete',
        },
        // Alert Center
        alertCenter: {
            view: 'alert-center-view',
            add: 'alert-center-add',
            edit: 'alert-center-edit',
            delete: 'alert-center-delete',
        },
        support: {
            view: 'support-view',
            add: 'support-add',
            edit: 'support-edit',
            delete: 'support-delete',
        },
    },
    standard: {
        standardSequiDocsTemplates: {
            view: 'sequidoc-templates-view',
            add: 'sequidoc-templates-add',
            edit: 'sequidoc-templates-edit',
            delete: 'sequidoc-templates-delete',
        },
        standardSequiDocsDocuments: {
            view: 'sequidoc-documents-view',
            add: 'sequidoc-documents-add',
            edit: 'sequidoc-documents-edit',
            delete: 'sequidoc-documents-delete',
        },

        dashboard: {
            view: 'dashboard-view',
            add: 'dashboard-add',
            edit: 'dashboard-edit',
            delete: 'dashboard-delete',
        },
        mySales: {
            view: 'my-sales-view',
            add: 'my-sales-add',
            edit: 'my-sales-edit',
            delete: 'my-sales-delete',
        },
        payStubs: {
            view: 'paystub-view',
            add: 'paystub-add',
            edit: 'paystub-edit',
            delete: 'paystub-delete',
        },
        myOverrides: {
            view: 'my-overrides-view',
            add: 'my-overrides-add',
            edit: 'my-overrides-edit',
            delete: 'my-overrides-delete',
        },

        referrals: {
            view: 'referrals-view',
            add: 'referrals-add',
            edit: 'referrals-edit',
            delete: 'referrals-delete',
        },

        hiringProgress: {
            view: 'hiring-progress-view',
            add: 'hiring-progress-add',
            edit: 'hiring-progress-add',
            delete: 'hiring-progress-add',
        },
        leads: {
            view: 'leads-view',
            add: 'leads-add',
            edit: 'leads-edit',
            delete: 'leads-delete',
        },
        pipeline: {
            view: 'pipeline-view',
            add: 'pipeline-add',
            edit: 'pipeline-edit',
            delete: 'pipeline-delete',
        },
        onboardingEmployees: {
            view: 'onboarding-employees-view',
            add: 'onboarding-employees-add',
            edit: 'onboarding-employees-edit',
            delete: 'onboarding-employees-delete',
            hireNow: 'onboarding-employees-hire-now',
        },
        Calendar: {
            view: 'calendar-view',
            add: 'calendar-add',
            edit: 'calendar-edit',
            delete: 'calendar-delete',
        },
        employee: {
            view: 'employee-view',
            add: 'employee-add',
            edit: 'employee-edit',
            delete: 'employee-delete',
        },
        teams: {
            view: 'team-view',
            add: 'team-add',
            edit: 'team-edit',
            delete: 'team-delete',
        },
        sequiDocs: {
            view: 'sequifiDocs-view',
            add: 'sequifiDocs-add',
            edit: 'sequifiDocs-edit',
            delete: 'sequifiDocs-delete',
        },
        community: {
            view: 'community-view',
            add: 'community-add',
            edit: 'community-edit',
            delete: 'community-delete',
        },
        projections: {
            view: 'projections-view',
            add: 'projections-add',
            edit: 'projections-edit',
            delete: 'projections-delete',
        },
        office: {
            view: 'office-view',
            add: 'office-add',
            edit: 'office-edit',
            delete: 'office-delete',
        },
        standardSales: {
            view: 'report-sales-view',
            add: 'report-sales-add',
            edit: 'report-sales-edit',
            delete: 'report-sales-delete',
        },
        reconciliation: {
            view: 'reports-reconciliation-view',
            add: 'reports-reconciliation-add',
            edit: 'reports-reconciliation-edit',
            delete: 'reports-reconciliation-delete',
        },
        pastPayStubs: {
            view: 'past-pay-stubs-view',
            add: 'past-pay-stubs-add',
            edit: 'past-pay-stubs-edit',
            delete: 'past-pay-stubs-delete',
        },
        training: {
            view: 'training-view',
            add: 'training-add',
            edit: 'training-edit',
            delete: 'training-delete',
        },
        request: {
            view: 'request-view',
            add: 'request-add',
            edit: 'request-edit',
            delete: 'request-delete',
        },
        approvals: {
            view: 'approvals-view',
            add: 'approvals-add',
            edit: 'approvals-edit',
            delete: 'approvals-delete',
        },
    },
}

export const ROLES = {
    administrator: {roleName: 'administrator', roleValue: 'administrator'},
    standard: {roleName: 'standard', roleValue: 'standard'},
}

const MODULES = {
    // Administrator
    administrator: {
        dashboard: {moduleName: 'dashboard', moduleValue: 'Dashboard'},
        setting: {moduleName: 'setting', moduleValue: 'Setting'},
        integrations: {moduleName: 'integrations', moduleValue: 'Integrations'},
        sequiDocs: {moduleName: 'sequiDocs', moduleValue: 'SequiDocs'},
        payroll: {moduleName: 'payroll', moduleValue: 'PayRoll'},
        reports: {moduleName: 'reports', moduleValue: 'Reports'},
        permissions: {moduleName: 'permissions', moduleValue: 'Permissions'},
        marketingDeals: {moduleName: 'marketingDeals', moduleValue: 'Marketing Deals'},
        importExport: {moduleName: 'importExport', moduleValue: 'Import/Export'},
        alertCenter: {moduleName: 'alertCenter', moduleValue: 'Alerts Center'},
        support: {moduleName: 'support', moduleValue: 'Support'},
    },
    standard: {
        dashboard: {moduleName: 'dashboard', moduleValue: 'Dashboard'},
        mySales: {moduleName: 'mySales', moduleValue: 'My Sales'},
        hiring: {moduleName: 'hiring', moduleValue: 'Hiring'},
        calendar: {moduleName: 'calendar', moduleValue: 'Calendar'},
        sequiDocs: {moduleName: 'sequiDocs', moduleValue: 'SequiDocs'},
        management: {moduleName: 'management', moduleValue: 'Management'},
        reports: {moduleName: 'reports', moduleValue: 'Reports'},
        community: {moduleName: 'community', moduleValue: 'Community'},
        projections: {moduleName: 'projections', moduleValue: 'Projections'},
        training: {moduleName: 'training', moduleValue: 'Training'},
        requestsAndApprovals: {
            moduleName: 'requestsAndApprovals',
            moduleValue: 'Requests & Approvals',
        },
        support: {moduleName: 'support', moduleValue: 'Support'},
        referrals: {moduleName: 'referrals', moduleValue: 'Referrals'},
    },
}

export const SUB_MODULES = {
    administrator: {
        // Dashboard
        dashboard: {
            subModuleName: 'dashboard',
            subModuleValue: 'Dashboard',
            ...ALL_PERMISSIONS.administrator.dashboard,
        },
        // Setup
        setup: {
            subModuleName: 'setup',
            subModuleValue: 'Setup',
            ...ALL_PERMISSIONS.administrator.setup,
        },
        locations: {
            subModuleName: 'locations',
            subModuleValue: 'Locations',
            ...ALL_PERMISSIONS.administrator.locations,
        },
        costTracking: {
            subModuleName: 'costTracking',
            subModuleValue: 'Cost Traking',
            ...ALL_PERMISSIONS.administrator.costTracking,
        },
        departments: {
            subModuleName: 'departments',
            subModuleValue: 'Departments',
            ...ALL_PERMISSIONS.administrator.departments,
        },
        positions: {
            subModuleName: 'positions',
            subModuleValue: 'Positions',
            ...ALL_PERMISSIONS.administrator.positions,
        },

        alerts: {
            subModuleName: 'alerts',
            subModuleValue: 'Alerts',
            ...ALL_PERMISSIONS.administrator.alerts,
        },
        bankAccounts: {
            subModuleName: 'bankAccounts',
            subModuleValue: 'Bank Accounts',
            ...ALL_PERMISSIONS.administrator.bankAccounts,
        },
        paperWork: {
            subModuleName: 'paperWork',
            subModuleValue: 'Paperwork',
            ...ALL_PERMISSIONS.administrator.paperWork,
        },

        // Integration
        integrations: {
            subModuleName: 'integrations',
            subModuleValue: 'Integrations',
            ...ALL_PERMISSIONS.administrator.integrations,
        },

        // Sequi Docs
        templates: {
            subModuleName: 'templates',
            subModuleValue: 'Templates',
            ...ALL_PERMISSIONS.administrator.templates,
        },
        documents: {
            subModuleName: 'documents',
            subModuleValue: 'Documents',
            ...ALL_PERMISSIONS.administrator.documents,
        },

        // Payroll
        runPayrollAndApprovals: {
            subModuleName: 'runPayrollAndApprovals',
            subModuleValue: 'Run Payroll & Approvals',
            ...ALL_PERMISSIONS.administrator.runPayrollAndApprovals,
        },
        oneTimePayment: {
            subModuleName: 'oneTimePayment',
            subModuleValue: 'One-time Payment',
            ...ALL_PERMISSIONS.administrator.oneTimePayment,
        },
        paymentRequest: {
            subModuleName: 'paymentRequest',
            subModuleValue: 'Payment Request',
            ...ALL_PERMISSIONS.administrator.paymentRequest,
        },
        payrollReconciliation: {
            subModuleName: 'payrollReconciliation',
            subModuleValue: 'Reconciliation',
            ...ALL_PERMISSIONS.administrator.payrollReconciliation,
        },

        // Reports
        company: {
            subModuleName: 'company',
            subModuleValue: 'Company',
            ...ALL_PERMISSIONS.administrator.company,
        },
        sales: {
            subModuleName: 'sales',
            subModuleValue: 'Sales',
            ...ALL_PERMISSIONS.administrator.sales,
        },
        cost: {
            subModuleName: 'cost',
            subModuleValue: 'Cost',
            ...ALL_PERMISSIONS.administrator.cost,
        },
        payroll: {
            subModuleName: 'payroll',
            subModuleValue: 'Payroll',
            ...ALL_PERMISSIONS.administrator.payroll,
        },
        reconciliation: {
            subModuleName: 'reconciliation',
            subModuleValue: 'Reconciliation',
            ...ALL_PERMISSIONS.administrator.reconciliation,
        },
        clawback: {
            subModuleName: 'clawback',
            subModuleValue: 'Clawback',
            ...ALL_PERMISSIONS.administrator.clawback,
        },
        pendingInstall: {
            subModuleName: 'pendingInstall',
            subModuleValue: 'Pending Install',
            ...ALL_PERMISSIONS.administrator.pendingInstall,
        },

        // Permissions
        group: {
            subModuleName: 'group',
            subModuleValue: 'Group',
            ...ALL_PERMISSIONS.administrator.group,
        },
        policies: {
            subModuleName: 'policies',
            subModuleValue: 'Policies',
            ...ALL_PERMISSIONS.administrator.policies,
        },

        // Marketing Deal
        marketingDeal: {
            subModuleName: 'marketingDeal',
            subModuleValue: 'Marketing Deal',
            ...ALL_PERMISSIONS.administrator.marketingDeal,
        },
        marketingDealCostTracking: {
            subModuleName: 'marketingDealCostTracking',
            subModuleValue: 'Cost Tracking',
            ...ALL_PERMISSIONS.administrator.marketingDealCostTracking,
        },

        // Alert Center
        alertCenterAlerts: {
            subModuleName: 'alerts',
            subModuleValue: 'Alerts',
            ...ALL_PERMISSIONS.administrator.alertCenter,
        },
        support: {
            subModuleName: 'support',
            subModuleValue: 'Support',
            ...ALL_PERMISSIONS.administrator.support,
        },
    },
    // standard
    standard: {
        dashboard: {
            subModuleName: 'dashboard',
            subModuleValue: 'Dashboard',
            ...ALL_PERMISSIONS.standard.dashboard,
        },
        mySales: {
            subModuleName: 'mySales',
            subModuleValue: 'My Sales',
            ...ALL_PERMISSIONS.standard.mySales,
        },
        myOverrides: {
            subModuleName: 'myOverrides',
            subModuleValue: 'My Overrides',
            ...ALL_PERMISSIONS.standard.myOverrides,
        },
        payStubs: {
            subModuleName: 'payStubs',
            subModuleValue: 'Pay Stubs',
            ...ALL_PERMISSIONS.standard.payStubs,
        },
        hiringProgress: {
            subModuleName: 'hiringProgress',
            subModuleValue: 'Hiring Progress',
            ...ALL_PERMISSIONS.standard.hiringProgress,
        },
        leads: {
            subModuleName: 'leads',
            subModuleValue: 'Leads',
            ...ALL_PERMISSIONS.standard.leads,
        },
        pipeline: {
            subModuleName: 'pipeline',
            subModuleValue: 'Pipeline',
            ...ALL_PERMISSIONS.standard.pipeline,
        },
        onboardingEmployees: {
            subModuleName: 'onboardingEmployees',
            subModuleValue: 'Onboarding Employees',
            ...ALL_PERMISSIONS.standard.onboardingEmployees,
        },
        calendar: {
            subModuleName: 'calendar',
            subModuleValue: 'Calendar',
            ...ALL_PERMISSIONS.standard.Calendar,
        },
        templates: {
            subModuleName: 'templates',
            subModuleValue: 'Templates',
            ...ALL_PERMISSIONS.standard.standardSequiDocsTemplates,
        },
        documents: {
            subModuleName: 'documents',
            subModuleValue: 'Documents',
            ...ALL_PERMISSIONS.standard.standardSequiDocsDocuments,
        },
        employee: {
            subModuleName: 'employee',
            subModuleValue: 'Employee',
            ...ALL_PERMISSIONS.standard.employee,
        },
        referrals: {
            subModuleName: 'referrals',
            subModuleValue: 'Referrals',
            ...ALL_PERMISSIONS.standard.referrals,
        },

        teams: {
            subModuleName: 'teams',
            subModuleValue: 'Team',
            ...ALL_PERMISSIONS.standard.teams,
        },

        sequiDocs: {
            subModuleName: 'sequiDocs',
            subModuleValue: 'SequifiDocs',
            ...ALL_PERMISSIONS.standard.sequiDocs,
        },

        community: {
            subModuleName: 'community',
            subModuleValue: 'Community',
            ...ALL_PERMISSIONS.standard.community,
        },
        projections: {
            subModuleName: 'projections',
            subModuleValue: 'Projections',
            ...ALL_PERMISSIONS.standard.projections,
        },
        office: {
            subModuleName: 'office',
            subModuleValue: 'Office',
            ...ALL_PERMISSIONS.standard.office,
        },
        sales: {
            subModuleName: 'sales',
            subModuleValue: 'Sales',
            ...ALL_PERMISSIONS.standard.standardSales,
        },
        pastPayStubs: {
            subModuleName: 'pastPayStubs',
            subModuleValue: 'Past Pay Stubs',
            ...ALL_PERMISSIONS.standard.pastPayStubs,
        },
        reconciliation: {
            subModuleName: 'reconciliation',
            subModuleValue: 'Reconciliation',
            ...ALL_PERMISSIONS.standard.reconciliation,
        },
        training: {
            subModuleName: 'training',
            subModuleValue: 'Training',
            ...ALL_PERMISSIONS.standard.training,
        },

        approvals: {
            subModuleName: 'approvals',
            subModuleValue: 'Approvals',
            ...ALL_PERMISSIONS.standard.approvals,
        },
        myRequests: {
            subModuleName: 'myRequests',
            subModuleValue: 'Request',
            ...ALL_PERMISSIONS.standard.request,
        },
    },
}

export const PERMISSION_TYPE = {
    view: 'view',
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    hireNow: 'hireNow',
}

export const PERMISSIONS_GROUP = {
    administrator: {
        dashboard: {
            dashboard: {
                ...ROLES.administrator,
                ...MODULES.administrator.dashboard,
                ...SUB_MODULES.administrator.dashboard,
            },
        },
        setting: {
            setup: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.setup,
            },
            locations: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.locations,
            },
            costTracking: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.costTracking,
            },
            departments: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.departments,
            },
            positions: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.positions,
            },
            alerts: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.alerts,
            },
            bankAccounts: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.bankAccounts,
            },
            paperWork: {
                ...ROLES.administrator,
                ...MODULES.administrator.setting,
                ...SUB_MODULES.administrator.paperWork,
            },
        },
        integrations: {
            integrations: {
                ...ROLES.administrator,
                ...MODULES.administrator.integrations,
                ...SUB_MODULES.administrator.integrations,
            },
        },
        sequiDocs: {
            templates: {
                ...ROLES.administrator,
                ...MODULES.administrator.sequiDocs,
                ...SUB_MODULES.administrator.templates,
            },
            documents: {
                ...ROLES.administrator,
                ...MODULES.administrator.sequiDocs,
                ...SUB_MODULES.administrator.documents,
            },
        },
        payroll: {
            runPayrollAndApprovals: {
                ...ROLES.administrator,
                ...MODULES.administrator.payroll,
                ...SUB_MODULES.administrator.runPayrollAndApprovals,
            },
            oneTimePayment: {
                ...ROLES.administrator,
                ...MODULES.administrator.payroll,
                ...SUB_MODULES.administrator.oneTimePayment,
            },
            paymentRequest: {
                ...ROLES.administrator,
                ...MODULES.administrator.payroll,
                ...SUB_MODULES.administrator.paymentRequest,
            },
            payrollReconciliation: {
                ...ROLES.administrator,
                ...MODULES.administrator.payroll,
                ...SUB_MODULES.administrator.payrollReconciliation,
            },
        },
        reports: {
            company: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.company,
            },
            payroll: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.payroll,
            },
            sales: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.sales,
            },
            cost: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.cost,
            },

            clawback: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.clawback,
            },
            pendingInstall: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.pendingInstall,
            },
            reconciliation: {
                ...ROLES.administrator,
                ...MODULES.administrator.reports,
                ...SUB_MODULES.administrator.reconciliation,
            },
        },
        permissions: {
            group: {
                ...ROLES.administrator,
                ...MODULES.administrator.permissions,
                ...SUB_MODULES.administrator.group,
            },
            policies: {
                ...ROLES.administrator,
                ...MODULES.administrator.permissions,
                ...SUB_MODULES.administrator.policies,
            },
        },
        marketingDeal: {
            marketingDeal: {
                role: ROLES.administrator,
                module: MODULES.setting,
                sub_module: SUB_MODULES.marketingDeal,
                ...ALL_PERMISSIONS.marketingDeal,
            },
        },
        importExport: {},
        alertCenter: {
            alerts: {
                ...ROLES.administrator,
                ...MODULES.administrator.alertCenter,
                ...SUB_MODULES.administrator.alertCenterAlerts,
            },
        },
        // support: {
        //   support: {
        //     role: ROLES.administrator,
        //     module: MODULES.setting,
        //     sub_module: SUB_MODULES.support,
        //     ...ALL_PERMISSIONS.support,
        //   },
        // },
    },
    standard: {
        dashboard: {
            dashboard: {
                ...ROLES.standard,
                ...MODULES.standard.dashboard,
                ...SUB_MODULES.standard.dashboard,
            },
        },
        mySales: {
            mySales: {
                ...ROLES.standard,
                ...MODULES.standard.mySales,
                ...SUB_MODULES.standard.mySales,
            },
            myOverrides: {
                ...ROLES.standard,
                ...MODULES.standard.mySales,
                ...SUB_MODULES.standard.myOverrides,
            },
            payStubs: {
                ...ROLES.standard,
                ...MODULES.standard.mySales,
                ...SUB_MODULES.standard.payStubs,
            },
        },
        hiring: {
            hiringProgress: {
                ...ROLES.standard,
                ...MODULES.standard.hiring,
                ...SUB_MODULES.standard.hiringProgress,
            },
            leads: {...ROLES.standard, ...MODULES.standard.hiring, ...SUB_MODULES.standard.leads},
            onboardingEmployees: {
                ...ROLES.standard,
                ...MODULES.standard.hiring,
                ...SUB_MODULES.standard.onboardingEmployees,
            },
        },
        calendar: {
            calendar: {
                ...ROLES.standard,
                ...MODULES.standard.calendar,
                ...SUB_MODULES.standard.calendar,
            },
        },
        sequiDocs: {
            templates: {
                ...ROLES.standard,
                ...MODULES.standard.sequiDocs,
                ...SUB_MODULES.standard.templates,
            },
            documents: {
                ...ROLES.standard,
                ...MODULES.standard.sequiDocs,
                ...SUB_MODULES.standard.documents,
            },
        },

        management: {
            employee: {
                ...ROLES.standard,
                ...MODULES.standard.management,
                ...SUB_MODULES.standard.employee,
            },
            teams: {
                ...ROLES.standard,
                ...MODULES.standard.management,
                ...SUB_MODULES.standard.teams,
            },
            sequiDocs: {
                ...ROLES.standard,
                ...MODULES.standard.management,
                ...SUB_MODULES.standard.sequiDocs,
            },
        },

        referrals: {
            referrals: {
                ...ROLES.standard,
                ...MODULES.standard.referrals,
                ...SUB_MODULES.standard.referrals,
            },
        },

        reports: {
            office: {
                ...ROLES.standard,
                ...MODULES.standard.reports,
                ...SUB_MODULES.standard.office,
            },
            sales: {...ROLES.standard, ...MODULES.standard.reports, ...SUB_MODULES.standard.sales},
            pastPayStubs: {
                ...ROLES.standard,
                ...MODULES.standard.reports,
                ...SUB_MODULES.standard.pastPayStubs,
            },
            reconciliation: {
                ...ROLES.standard,
                ...MODULES.standard.reports,
                ...SUB_MODULES.standard.reconciliation,
            },
        },
        requestsAndApprovals: {
            myRequests: {
                ...ROLES.standard,
                ...MODULES.standard.requestsAndApprovals,
                ...SUB_MODULES.standard.myRequests,
            },
            approvals: {
                ...ROLES.standard,
                ...MODULES.standard.requestsAndApprovals,
                ...SUB_MODULES.standard.approvals,
            },
        },
    },
}
