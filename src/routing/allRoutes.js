export const bindRoutes = (routePath = []) => {
    return routePath?.length > 0 ? routePath?.join('/') : routePath?.[0]
}
const routePath = {
    // Auth
    auth: 'auth',
    login: 'login',

    // Admin
    admin: 'admin',
    dashboard: 'dashboard',
    settings: 'settings',
    setup: 'setup',
    location: 'location',
    costCenter: 'cost-center',
    departments: 'departments',

    // Standard
    standard: 'standard',
}

const authRoutes = {
    self: bindRoutes([routePath.auth]),
    login: bindRoutes([routePath.auth, routePath.login]),
}
const adminRoutes = {
    // Dashboard
    dashboard: {
        self: bindRoutes([routePath.dashboard]),
    },

    // Setting
    settings: {
        self: bindRoutes([routePath.settings]),
        setup: bindRoutes([routePath.settings, routePath.setup]),
        locations: bindRoutes([routePath.settings, routePath.location]),
        cost_center: bindRoutes([routePath.settings, routePath.costCenter]),
        departments: bindRoutes([routePath.settings, routePath.departments]),
    },

    // Integrations
    // SequiDocs
    // Payroll
    // Reports
    // Permissions
    // Alert Center
}

const standardRoutes = {
    // Dashboard
    dashboard: {
        self: bindRoutes([routePath.dashboard]),
    },

    // Hiring
    // Referals
    // Calendar
    // Management
    // Reports
    // Requests And Approvals
}
const allRoutes = {
    // Error Pages

    // Auth
    auth: authRoutes,

    // Admin
    admin: adminRoutes,

    // Standard
    standard: standardRoutes,
}

export {allRoutes, routePath}
