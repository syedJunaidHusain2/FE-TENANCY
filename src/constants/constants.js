import moment from 'moment'
export const PHONE_NUMBER_LENGTH = 10
export const DEVELOPMENT_MODE = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
export const ONE_SIGNAL_APP_ID = process.env.REACT_APP_ONE_SIGNAL_APP_ID
export const BASE_URL = process.env.REACT_APP_BASE_URL
export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
export const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY

// Amazon S3
export const AMAZON_S3_CONFIG = {
    s3_bucket_url: process.env.REACT_APP_AMAZON_S3_BUCKET_URL,
}

// Digisigner
export const DIGISIGNER_CONFIG = {
    attach_document: process.env.REACT_APP_ATTACH_DOCUMENT_WHILE_ONBOARDING == 1,
    documents: {
        w9: process.env.REACT_APP_DIGISIGNER_W9_DOC_ID,
        backgroundCheckAuth: process.env.REACT_APP_DIGISIGNER_BACKGROUND_CHECK_AUTH_DOC_ID,
    },
}

export const DOCUMENT_TO_ATTACH_WHILE_ONBOARD = [
    {
        document_id: DIGISIGNER_CONFIG.documents.w9,
        document_type_id: 6,
        name: 'W9 Tax Form', // !Do not change
        isSelected: 0,
    },
    {
        document_id: DIGISIGNER_CONFIG.documents.backgroundCheckAuth,
        document_type_id: 7,
        name: 'Background Security Check', // !Do not change
        isSelected: 0,
    },
]

export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY'
export const STRIPE_PAYMENT_LIVE = true
export const STRIPE_PUBLISH_KEY = STRIPE_PAYMENT_LIVE
    ? process.env.REACT_APP_STRIPE_PUBLISH_LIVE_KEY
    : process.env.REACT_APP_STRIPE_PUBLISH_TEST_KEY

export const MAIN_POSITIONS = {
    superAdmin: 'superAdmin',
    manager: 'manager',
    setter: 'setter',
    closer: 'closer',
}
export const MAIN_POSITTIONS_ID = {
    closer: '2',
    setter: '3',
}

export const MAIN_DEPARTMENT_ID = {
    management: '1',
    sales: '2',
}

export const DevConfig = {
    ENABLE_CONSOLE_LOGS: process.env.REACT_APP_ENABLE_CONSOLE_LOGS && DEVELOPMENT_MODE,
}

export const getValidDate = (date = null, format = DEFAULT_DATE_FORMAT, getDateObject = false) => {
    const validDate = date
    if (getDateObject) return new Date(getValidDate(validDate, 'YYYY/MM/DD'))
    if (moment(validDate).isValid()) {
        if (getDateObject) return validDate
        return moment(validDate).format(format ?? 'YYYY/MM/DD')
    }
    return null
}

// export const TEMPLATE_DYNAMIC_FIELD_FIND_REGEX = /\[\S+\S+\]\s+/gim
export const TEMPLATE_DYNAMIC_FIELD_FIND_REGEX = /\[\S+\S+\]/gim

export const VALIDATION_PATTERN = {
    number: /[0-9]*/gim,
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/gim,
}

export const GENDER_DATA = [
    {name: 'Male', value: 'male'},
    {name: 'Female', value: 'female'},
    {name: 'Not to be mention', value: 'not to be mention'},
]
export const MONTHLY_PAY_DAYS = {
    fifteenAndLastDayOfMonth: {
        name: 'fifteenAndLastDayOfMonth',
        value: '15th and last day of month',
    },
    other: {
        name: 'other',
        value: 'Other',
    },
}
export const UNIT_TYPE = [
    {name: 'Per KW', value: 'per kw'},
    {name: 'Per Watt', value: 'per watt'},
    {name: 'Per Sale', value: 'per sale'},
]

export const UNIT_TYPE1 = [
    {name: 'Per KW', value: 'per kw'},
    {name: 'Per Sale', value: 'per sale'},
]

export const UNIT_TYPE2 = [{name: 'Per Watt', value: 'per watt'}]

export const BUSINESS_TYPE = [
    {name: 'Sole Proprietoship', value: 'Sole Proprietoship'},
    {name: 'Partnership', value: 'Partnership'},
    {name: 'LLC', value: 'LLC'},
    {name: 'C corp', value: 'C corp'},
    {name: 'S corp', value: 'S corp'},
    {name: 'Nonprofit', value: 'Nonprofit'},
]

export const HOST_SERVERS = {
    localhost: 'localhost',
    dev: 'dev.sequifi.com',
    demo: 'demo.sequifi.com',
    testing: 'testing.sequifi.com',

    // Client Server
    flex: 'flex.sequifi.com',
    aveyo: 'aveyo.sequifi.com',
    aveyo2: 'aveyo2.sequifi.com',
    authentic: 'authentic.sequifi.com',
    adam: 'adam.sequifi.com',
    newera: 'newera.sequifi.com',
}

export const CURRENT_HOST = window.location.hostname

export const SHOW_BASED_ON_HOST = {
    additionalOfficeOverrides: [HOST_SERVERS.dev, HOST_SERVERS.localhost].includes(CURRENT_HOST),
    oneSignalNotification: [HOST_SERVERS.localhost, HOST_SERVERS.dev].includes(CURRENT_HOST),
    showSalesReportAlertCenterIcon: [HOST_SERVERS.localhost].includes(CURRENT_HOST),
    teamRequiredForOnboarding: [
        HOST_SERVERS.localhost,
        HOST_SERVERS.aveyo,
        HOST_SERVERS.aveyo2,
    ].includes(CURRENT_HOST),
    percentageOverride: ![HOST_SERVERS.aveyo].includes(CURRENT_HOST),
}

export const ENABLE_ONE_SIGNAL_PUSH_NOTIFICATION = SHOW_BASED_ON_HOST.oneSignalNotification

export const OVERRIDE_TYPE1 = [
    {name: 'Per KW', value: 'per kw'},
    {name: 'Per Sale', value: 'per sale'},
]

export const OVERRIDE_TYPE2 = [
    {name: 'Per KW', value: 'per kw'},
    {name: 'Per Sale', value: 'per sale'},
    {name: '%', value: 'percent'},
]

export const OVERRIDE_TYPE = SHOW_BASED_ON_HOST.percentageOverride ? OVERRIDE_TYPE2 : OVERRIDE_TYPE1

export const PAYROLL_FREQUENCY = {
    daily: 'Daily',
    weekly: 'Weekly',
    biWeekly: 'Biweekly',
    monthly: 'Monthly',
    semiMonthly: 'Semimonthly',
}

export const LEAD_DAYS_FOR_FINALIZE_PAYROLL = 2
export const WEEK_DAYS = [
    {name: 'Monday', value: 'Monday', dayNumber: 1},
    {name: 'Tuesday', value: 'Tuesday', dayNumber: 2},
    {name: 'Wednesday', value: 'Wednesday', dayNumber: 3},
    {name: 'Thursday', value: 'Thursday', dayNumber: 4},
    {name: 'Friday', value: 'Friday', dayNumber: 5},
]

export const MONTH_DAYS = [
    {name: 'January', value: '01'},
    {name: 'February', value: '02'},
    {name: 'March', value: '03'},
    {name: 'April', value: '04'},
    {name: 'May', value: '05'},
    {name: 'June', value: '06'},
    {name: 'July', value: '07'},
    {name: 'August', value: '08'},
    {name: 'September', value: '09'},
    {name: 'October', value: '10'},
    {name: 'November', value: '11'},
    {name: 'December', value: '12'},
]

export const TEMPLATE_DYNAMIC_FIELDS = {
    current_date: {key: 'Current_Date'},

    // Company Fieds
    company_logo: {key: 'Company_Logo'},
    company_name: {key: 'Company_Name'},
    company_address: {key: 'Company_Address'},
    company_phone: {key: 'Company_Phone'},
    company_email: {key: 'Company_Email'},
    company_website: {key: 'Company_Website'},

    // Employee Fields
    employee_id: {key: 'Employee_ID'},
    employee_name: {key: 'Employee_Name'},
    // employee_designation: {key: 'Employee_Designation'},
    // employee_full_name: {key: 'Employee_Full_Name'},
    employee_position: {key: 'Employee_Position'},
    employee_office_location: {key: 'Office_Location'},
    employee_first_name: {key: 'Employee_first_name'},
    employee_address: {key: 'Employee_Address'},
    employee_ssn: {key: 'Employee_SSN'},
    employee_redline_amount: {key: 'redline'},
    // employee_redline_amount_with_type: {key: 'redline_per_watt'},
    employee_upfront_amount: {key: 'upfront_amount'},
    employee_agreement_start_date: {key: 'start_date'},
    employee_agreement_end_date: {key: 'end_date'},
    // employee_pay_frequency: {key: 'pay_frequency'},
    employee_comission: {key: 'commission'},
    employee_direct_override: {key: 'Direct_Override_Value'},
    employee_office_override: {key: 'Office_Override_Value'},
    employee_indirect_override: {key: 'InDirect_Override_Value'},
    employee_manager_full_name: {key: 'Employee_Manager_Name'},
    employee_manager_position: {key: 'Employee_Manager_Position'},
    employee_manager_department: {key: 'Employee_Manager_Department'},
    sender_name: {key: 'Sender_Name'},
}

export const TEMPLATE_DYNAMIC_SPECIAL_FIELDS = {
    page_break: {key: 'Page Break', val: '[Page Break]'},
    annexure: {key: 'Annexure', val: 'Annexure A'},
    compensation_plan: {key: 'Compensation Plan', val: '[Compensation Plan]'},
}
export const TEMPLATE_DYNAMIC_SIGN_FIELDS = {
    // employee_signature: {key: 'Employee Signature', val: '__________Employee Signature'},
    // employee_initials: {key: 'Employee Initials ', val: '__________Employee Initials    '},
    // employee_manager: {key: 'Employee Manager', val: '__________Employee Manager'},
    // employee_manager_initials: {
    //     key: 'Employee Manager Initials',
    //     val: '__________Employee Manager Initials',
    // },
    employee_signature: {key: 'Employee Signature', val: 's:employee'},
    // employee_initials: {key: 'Employee Initials ', val: 's:employee'},
    employee_manager: {
        key: 'Employee Manager Signature',
        val: 's:manager',
    },
    // employee_manager_initials: {
    //     key: 'Employee Manager Initials',
    //     val: 's:manager',
    // },
}
export const EMAIL_TEMPLATE_DYNAMIC_FIELDS = {
    recipient_name: {key: 'Employee_Name'},
    recipient_position: {key: 'Employee_Position'},
    office_location: {key: 'Office_Location'},
    company_website: {key: 'Company_Website'},
    company_address: {key: 'Company_Address'},
    company_name: {key: 'Company_Name'},
}

export const EDIT_EMAIL_TEMPLATE_FIELDS = {
    recipient_name: {key: 'Employee_Name'},
    company_name: {key: 'Company_Name'},
    employee_user_name: {key: 'Employee_User_Name'},
    employee_user_password: {key: 'Employee_User_Password'},
    system_login_link: {key: 'System_Login_Link'},
}

export const PAYROLL_DISPUTE_LIST = [
    {name: 'M1', value: 'M1'},
    {name: 'M2', value: 'M2'},
    {name: 'Commission', value: 'Commission'},
    {name: 'Upfront', value: 'Upfront'},
    {name: 'Overrides', value: 'Overrides'},
    {name: 'Incentive/Bonus', value: 'Incentive/Bonus'},
    {name: 'Deductions', value: 'Deductions'},
    {name: 'Other', value: 'Other'},
]
export const REPORTS_DURATION_DROPDOWN_LIST = [
    {name: 'This Week', value: 'this_week'},
    {name: 'This Year', value: 'this_year'},
    {name: 'This Month', value: 'this_month'},
    {name: 'Last Year', value: 'last_year'},
    {name: 'This Quarter', value: 'this_quarter'},
    {name: 'Last Quarter', value: 'last_quarter'},
    {name: 'Custom', value: 'custom'},
]
export const Dashboard_DURATION_DROPDOWN_LIST = [
    {name: 'This Week', value: 'this_week'},
    {name: 'This Year', value: 'this_year'},
    {name: 'This Month', value: 'this_month'},
    {name: 'This Quarter', value: 'this_quarter'},
]

export const BANKING_TYPE_OF_ACCOUNT = [
    {name: 'Savings', value: 'savings'},
    {name: 'Checking', value: 'checking'},
]
export const COMPANY_LETTER_PAD_TEMPLATE = ({
    width,
    company_logo,
    company_name,
    company_address,
}) => {
    return `
    <div style="
        width: ${width}px; 
        padding: 10;
        display: 'flex';
        align-items: 'center';
        justify-content: 'space-between';
    ">
    <img src='${company_logo}' style="height: 100px; width:100px;" />
        <div style="display: flex; flex-direction: column; align-items: flex-end">
            <strong style="text-transform: uppercase; font-size: 16">${company_name}</strong>
            <p>Address: ${company_address}</p>
        </div>
    </div>
    `
}

export const INTEGRATIONS_ID = {
    lgcy: 1,
    hubspot: 2,
    everee: 3,
    jobNimbuss: 4,
}

export const EVENTS_TYPES = [
    {name: 'Career Fair', value: 'Career Fair'},
    {name: 'Meeting', value: 'Meeting'},
    {name: 'Company Event', value: 'Company Event'},
    {name: 'Training', value: 'Training'},
    {name: 'Other', value: 'Other'},
]

export const getDaysArray = () => {
    const daysArray = []
    for (let index = 0; index < 28; index++) {
        daysArray.push({name: index + 1, value: index + 1})
    }
    return daysArray
}

export const HIRING_PROCESS_STATUS = {
    // Lead Status
    followUp: 'Follow Up',
    interviewScheduled: 'Interview Scheduled',
    interviewRescheduled: 'Interview Rescheduled',
    interviewDone: 'Interview Done',
    rejected: 'Rejected',
    Leadhired: 'Hired',

    // Onboarding Status
    accepted: 1,
    declined: 2,
    approved: 3, // Not In Use
    offerLetterSent: 4,
    offerExpired: 5,
    requestedChange: 6,
    onboarding: 7,
    draft: 8,
    onboardFollowUp: 9,
    notInterested: 10, // Not In Use
    offerLetterRejected: 11,
    offerLetterResent: 12,
    offerLetterAccepted: 13,
    active: 14,
    adminRejected: 15,
}
export const PAYROLL_PROCESS_STATUS = {
    pending: 1,
    finilize: 2,
    paid: 3,
    nextPayroll: 4,
    skipped: 5,
    moveToRecon: 6,
}
export const LEAD_PROCESS_STATUS = [{name: 'Interview Done', value: 'Interview Done'}]

export const DYNAMIC_FIELD_TYPE = [
    {name: 'Text', value: 'text'},
    {name: 'Number', value: 'number'},
    {name: 'Date', value: 'date'},
    {name: 'Phone Number', value: 'phone number'},
    {name: 'Dropdown', value: 'dropdown'},
]

export const HIRE_FIELD_KEYS = {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    work_email: 'work_email',
    mobile_no: 'mobile_no',

    state_id: 'state_id',
    office_id: 'office_id',
    is_manager: 'is_manager',
    self_gen_accounts: 'self_gen_accounts',
    state_name: 'state_name',
    city_name: 'city_name',
    location: 'location',
    department_id: 'department_id',
    position_id: 'position_id',
    sub_position_id: 'sub_position_id',
    deduction: 'deduction',
    manager_id: 'manager_id',
    recruiter_id: 'recruiter_id',
    recruiter_name: 'recruiter_name',
    department_name: 'department_name',
    manager_name: 'manager_name',
    team_id: 'team_id',
    position_name: 'position_name',
    additional_locations: 'additional_locations',
    additional_recruter: 'additional_recruter',

    employee_compensation: 'employee_compensation',
    commission_effective_date: 'commission_effective_date',
    commission: 'commission',
    commission_selfgen: 'commission_selfgen',
    commission_selfgen_effective_date: 'commission_selfgen_effective_date',
    redline_amount_type: 'redline_amount_type',
    redline: 'redline',
    redline_type: 'redline_type',
    redline_effective_date: 'redline_effective_date',
    redline_data: 'redline_data',
    upfront_effective_date: 'upfront_effective_date',
    upfront_pay_amount: 'upfront_pay_amount',
    upfront_sale_type: 'upfront_sale_type',
    withheld_effective_date: 'withheld_effective_date',
    withheld_amount: 'withheld_amount',
    withheld_type: 'withheld_type',
    self_gen_commission_effective_date: 'self_gen_commission_effective_date',
    self_gen_commission: 'self_gen_commission',
    self_gen_redline_amount_type: 'self_gen_redline_amount_type',
    self_gen_redline: 'self_gen_redline',
    self_gen_redline_type: 'self_gen_redline_type',
    self_gen_redline_data: 'self_gen_redline_data',
    self_gen_upfront_effective_date: 'self_gen_upfront_effective_date',
    self_gen_upfront_amount: 'self_gen_upfront_amount',
    self_gen_upfront_type: 'self_gen_upfront_type',

    override_effective_date: 'override_effective_date',
    direct_overrides_amount: 'direct_overrides_amount',
    direct_overrides_type: 'direct_overrides_type',
    indirect_overrides_amount: 'indirect_overrides_amount',
    indirect_overrides_type: 'indirect_overrides_type',
    office_overrides_amount: 'office_overrides_amount',
    office_overrides_type: 'office_overrides_type',
    office_stack_overrides_amount: 'office_stack_overrides_amount',
    additional_office_override: 'additional_office_override',

    probation_period: 'probation_period',
    offer_include_bonus: 'offer_include_bonus',
    hiring_bonus_amount: 'hiring_bonus_amount',
    date_to_be_paid: 'date_to_be_paid',
    period_of_agreement: 'period_of_agreement',
    period_of_agreement_start_date: 'period_of_agreement_start_date',
    end_date: 'end_date',
    offer_expiry_date: 'offer_expiry_date',
}

export const DYNAMIC_ALERTS_QUICK_FILTER = [
    {name: 'Prospect ID', value: 'pid', type: 'sales'},
    {name: 'Install Partner', value: 'install_partner', type: 'sales'},
    {name: 'Customer Sign Off', value: 'customer_signoff', type: 'sales'},
    {name: 'Gross Amount Value', value: 'gross_account_value', type: 'sales'},
    {name: 'Epc', value: 'epc', type: 'sales'},
    {name: 'Net Epc', value: 'net_epc', type: 'sales'},
    {name: 'Dealer Fee %', value: 'dealer_fee_percentage', type: 'sales'},
    {name: 'Customer Name', value: 'customer_name', type: 'sales'},
    {name: 'Customer State ', value: 'customer_state', type: 'sales'},
    // {name: 'Rep Name', value: 'rep_name', type: 'sales'},
    {name: 'Setter', value: 'setter_id', type: 'missingRep'},
    {name: 'Closer', value: 'sales_rep_email', type: 'missingRep'},
    {name: 'M1 & M2 arrived', value: 'm1,m2', type: 'closedPayroll'},
    {name: 'M1 arrived', value: 'm1', type: 'closedPayroll'},
    {name: 'M2 arrived', value: 'm2', type: 'closedPayroll'},
]

export const MISSING_KEYS = {
    pid: 'pid',
    install_partner: 'install_partner',
    customer_signoff: 'customer_signoff',
    gross_account_value: 'gross_account_value',
    sales_rep_email: 'sales_rep_email',
    epc: 'epc',
    net_epc: 'net_epc',
    dealer_fee_percentage: 'dealer_fee_percentage',
    customer_name: 'customer_name',
    customer_state: 'customer_state',
    rep_name: 'sales_rep_name',
    closer: 'closer',
    setter: 'setter',
    m1: 'm1',
    m2: 'm2',
    m1_m2: 'm1,m2',
    m2_m1: 'm2,m1',
    location: 'Location',
    locationRedline: 'Location_redline',
    setterId: 'setter_id',
    newRep: 'sales_rep_new',
    taxInfo: 'tax_information',
    kw: 'kw',

    workEmail: 'work_email',
    bankDetailArray: ['name_of_bank', 'routing_no', 'account_no', 'type_of_account'],
    taxDetailArray: ['tax_information'],
}

export const GLOBAL_SEARCH_TYPE = [
    {name: 'People', value: 'people'},
    {name: 'Payroll', value: 'payroll'},
]
export const REQUEST_APPROVAL_TYPE_DROPDOWN_VALUES = [
    {name: 'Payroll dispute', value: 'Payroll dispute'},
    {name: 'Reimbursement', value: 'Reimbursement'},
    {name: 'Bonus', value: 'Bonus'},
    {name: 'Fine/Fee', value: 'Fine/Fee'},
    {name: 'Incentive', value: 'Incentive'},
]
export const REQUEST_STATUS_INFO = [
    {
        name: 'Pending',
        value: "Pending Awaiting manager's review. Your request is in line to be approved or declined",
        headClass: 'text-cmDisButton',
    },
    {
        name: 'In Progress',
        value: "Green light from the manager! It's now with the admin for the next steps.",
        headClass: 'text-cmOrange',
    },
    {
        name: 'Declined',
        value: "Sorry, your request didn't get the go-ahead.",
        headClass: 'text-cmError',
    },
    {
        name: 'Scheduled',
        value: ' The admin has approved, and your request is slotted for the next payroll cycle.',
        headClass: 'text-cminfo',
    },
    {name: 'Paid', value: 'All done! Your request has been paid!', headClass: 'text-cmSuccess'},
]

export const AUTHENTICATION_OPTIONS = [
    {
        name: 'User Name and Password',
        value: 'user_name/password',
    },
    {
        name: 'Token',
        value: 'token',
    },
]
export const PROTOCAL_OPTIONS = [
    {
        name: 'SMTP',
        value: 'smtp',
    },
]
export const PROVIDER_OPTIONS = [
    {
        name: 'SendLayer',
        value: 'SendLayer',
    },
    {
        name: 'SMTP.com',
        value: 'custom',
    },
    {
        name: 'Brevo (Formerly Sendinblue)',
        value: 'Brevo (Formerly Sendinblue)',
    },
    {
        name: 'Mailgun',
        value: 'Mailgun',
    },
    {
        name: 'SendGrid',
        value: 'SendGrid',
    },
    {
        name: 'Amazon SES',
        value: 'Amazon SES',
    },
    {
        name: 'Mailersend',
        value: 'Mailersend',
    },
]
export const SECURITY_PROTOCOL_OPTIONS = [
    {
        name: 'SSL',
        value: 'SSL',
    },
    {
        name: 'TLS',
        value: 'TLS',
    },
]
export const PENDING_INSTALL_FILTER = {
    showOnlyAccounts: [
        {
            name: 'With No M1 Date',
            value: 'with_no_m1_date',
        },
        {
            name: 'With M1 Date',
            value: 'with_m1_date',
        },
    ],
    ageOfAccounts: [
        {
            name: '5 to 10',
            value: '5-10',
        },
        {
            name: '10 to 30',
            value: '10-30',
        },
        {
            name: '30 to 50',
            value: '30-50',
        },
        {
            name: '50 & above',
            value: '50-above',
        },
    ],
}

export const TYPE_OF_COMPANY_OPTIONS = [
    {
        name: 'Solar',
        value: 'Solar',
    },
    {
        name: 'Pest Control        ',
        value: 'Pest Control ',
    },
    {
        name: 'Roofing',
        value: 'Roofing',
    },
    {
        name: 'Real Estate',
        value: 'Real Estate',
    },
    {
        name: 'Other',
        value: 'Other',
    },
]
