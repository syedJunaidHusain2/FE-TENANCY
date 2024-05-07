import {MAIN_POSITTIONS_ID, VALIDATION_PATTERN, SHOW_BASED_ON_HOST} from '../constants/constants'
import {isInputValueExist} from '../helpers/CommonHelpers'

export const EMAIL_VALIDATION = (email) => {
    return /\S+@\S+\.\S+/.test(email)
}

export const ADD_CALENDAR_EVENT_VALIDATION_FIELD = {
    eventName: '',
    eventDate: '',
    eventType: '',
    eventTime: '',
}
export const SCHEDULE_INTERVIEW_VALIDATION_FIELD = {
    interviewDate: '',
    interviewSlot: '',
}
export const REFERAL_VALIDATION_FIELD = {
    firstName: '',
    lastName: '',
    email: '',
}

export const NEW_POSITION_VALIDATION_FIELD = {
    positionName: '',
    parenrPosition: '',
    department: '',
    permissionGroup: '',
}
export const NEW_LOCATION_VALIDATION_FIELD = {
    locationState: '',
    locationCity: '',
    locationGeneralCode: '',
    standerdRedline: '',
    officeName: '',
    officeAddress: '',
    maxRedline: '',
    minRedline: '',
}
export const ADD_COST_HEAD_VALIDATION_FIELD = {
    codeHeadName: '',
    costHeadCode: '',
}

export const ADD_GOAL_TRACKER_VALIDATION_FIELD = {
    earnings: '',
    accounts: '',
    kwSold: '',
}

export const TRANSFER_MODAL_VALIDATION_FIELD = {
    officeId: '',
    manager: '',
    redline: '',
    redlineType: '',
}
export const ADD_TO_PAYROLL_VALIDATION_FIELD = {
    week: '',
    month: '',
}
export const ONETIME_PAYMENT_VALIDATION_FIELD = {
    payToEmployee: '',
    paymentType: '',
    paymentAmount: '',
}
export const ADD_ANNOUNCEMENT_VALIDATION_FIELD = {
    title: '',
    content: '',
    position: '',
    office: '',
    startDate: '',
    duration: '',
    link: '',
}

//OnBoarding Process
export const ADD_OnBoardingStep1_VALIDATION_FIELD = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    homeAddress: '',
    dob: '',
    emergencyName: '',
    emergencyNumber: '',
    emergencyRelation: '',
    emergencyAddress: '',
    socialSecurityNumber: '',
    taxInformation: '',
    bankName: '',
    routingNumber: '',
    accNumber: '',
    confirmAccNumber: '',
    accType: '',
    additionalPersonalInfoFieldError: '',
    additionalGetStartedFieldError: '',
    emergencyState: '',
    emergencyZip: '',
}
export const ADD_ADMIN_VALIDATION_FIELD = {
    firstName: '',
    lastName: '',
    permissions: '',
    mobile_no: '',
    email: '',
}
export const ADD_MANUAL_OVERRIDE = {
    manual_user_id: [],
    effective_date: '',
    overrides_amount: '',
    overrides_type: '',
}
export const ADD_EMAIL_SETTING_VALIDATION_FIELD = {
    email_from_address: null,
    service_provider: null,
    protocal: null,
    host_name: null,
    smtp_port: null,
    timeout: null,
    security_protocol: null,
    authentication_method: null,
    token_app_id: null,
    token_app_key: null,
    mail_user_name: null,
    mail_password: null,
}
export const EDIT_ADDRESS_VALIDATION_FIELD = {
    name: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
}
export const CHANGE_PASSWORD_VALIDATION_FIELD = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}
//Sequifi Docs
export const ADD_NEW_TEMPLATE_VALIDATION_FIELD = {
    templateName: '',
    templateDescription: '',
    emailContent: '',
    emailSubject: '',
    permission: '',
    selectedPosition: '',
}

//onBoarding Process
export const onBoardingStep1Validation = (data, step) => {
    let errorMessage = {...ADD_OnBoardingStep1_VALIDATION_FIELD}
    if (step == 1) {
        if (!data?.first_name) errorMessage.firstName = 'Enter first name'
        if (!data?.last_name) errorMessage.lastName = 'Enter last name'
        if (!data?.email) errorMessage.email = 'Enter email'

        if (!data?.home_address) errorMessage.homeAddress = 'Enter home address'
        if (data?.home_address_line_1) {
            let error = []
            if (!data?.home_address_line_1) error.push('address line 1')
            if (!data?.home_address_city) error.push('city')
            if (!data?.home_address_state) error.push('state')
            if (!data?.home_address_zip) error.push('zip')
            if (error?.length > 0) errorMessage.homeAddress = `Enter ${error.join(', ')}`
        }

        if (data?.emergency_address_line_1) {
            let error = []
            if (!data?.emergency_address_line_1) error.push('address line 1')
            if (!data?.emergrncy_contact_city) error.push('city')
            if (!data?.emergrncy_contact_state) error.push('state')
            if (!data?.emergrncy_contact_zip_code) error.push('zip')
            if (error?.length > 0) errorMessage.emergencyAddress = `Enter ${error.join(', ')}`
        }
        if (!data?.birth_date) errorMessage.dob = 'Select Date of Birth'

        let errData = data?.employee_personal_detail
            ? JSON.parse(data?.employee_personal_detail)
                  ?.filter((item) => item?.field_required == 'required' && !item?.is_deleted)
                  .map((docItem) => !docItem?.value)
            : null
        let isError = errData?.length > 0 ? errData.includes(true) : false

        if (isError)
            errorMessage.additionalPersonalInfoFieldError = 'Enter required additional information'
    }
    if (step == 2) {
        if (!data?.entity_type) errorMessage.entity_type = 'Select entity type'
        if (data?.entity_type == 'individual') {
            if (data?.social_sequrity_no?.replace(/[^0-9]/g, '')?.length < 9) {
                errorMessage.socialSecurityNumber = 'Social security number must be of 9 digit'
            } else if (!data?.social_sequrity_no) {
                errorMessage.socialSecurityNumber = 'Enter social security number'
            }
        } else if (data?.entity_type == 'business') {
            if (!data?.business_name) errorMessage.business_name = 'Enter Business Name'
            if (!data?.business_type) errorMessage.business_type = 'Enter Business Type'
            if (!data?.business_ein) errorMessage.business_ein = 'Enter EIN'
        }
    }
    if (step == 3) {
        if (!data?.name_of_bank) errorMessage.bankName = 'Enter bank name'

        if (!data?.type_of_account) errorMessage.accType = 'Select account type'
        if (!data?.account_name) errorMessage.account_name = 'Enter account name'
        if (!data?.account_no) errorMessage.accNumber = 'Enter account number'
        if (!data?.confirm_account_no) {
            errorMessage.confirmAccNumber = 'Enter account number'
        } else if (data?.confirm_account_no !== data?.account_no) {
            errorMessage.confirmAccNumber = 'Account number mismatch'
        }
        if (!data?.routing_no) {
            errorMessage.routingNumber = 'Enter routing no'
        } else if (data?.routing_no?.replace(/-|_/g, '')?.length != 9) {
            errorMessage.routingNumber = 'Routing no should be of 9 digits'
        }
    }
    if (step == 5) {
        let errData = data?.additional_info_for_employee_to_get_started
            ? JSON.parse(data?.additional_info_for_employee_to_get_started)
                  ?.filter((item) => item?.field_required == 'required' && !item?.is_deleted)
                  .map((docItem) => !docItem?.value)
            : null
        let isError = errData?.length > 0 ? errData.includes(true) : false

        if (isError)
            errorMessage.additionalGetStartedFieldError = 'Enter required additional information'
    }
    return errorMessage
}

export const addCalendarValidation = (data) => {
    let errorMessage = {...ADD_CALENDAR_EVENT_VALIDATION_FIELD}
    if (!data?.event_name) errorMessage.eventName = 'Enter event name'
    if (!data?.event_date) errorMessage.eventDate = 'Select event date'
    if (!data?.event_time) errorMessage.eventTime = 'Select event time'
    if (!data?.type) errorMessage.eventType = 'Select type'
    return errorMessage
}
export const scheduleInterviewValidation = (data) => {
    let errorMessage = {...SCHEDULE_INTERVIEW_VALIDATION_FIELD}
    if (!data?.date) errorMessage.interviewDate = 'Select date'
    if (!data?.schedule) errorMessage.interviewSlot = 'Select time slot'

    return errorMessage
}
export const ReferalFormValidation = (data) => {
    let errorMessage = {...REFERAL_VALIDATION_FIELD}
    if (!data?.first_name) errorMessage.firstName = 'Enter first name'
    if (!data?.last_name) errorMessage.lastName = 'Enter last name'
    if (!data?.email) {
        errorMessage.email = 'Enter email'
    } else if (!EMAIL_VALIDATION(data?.email)) {
        errorMessage.email = 'Enter valid email address'
    }
    return errorMessage
}
export const newPositionValidation = (data) => {
    let errorMessage = {...NEW_POSITION_VALIDATION_FIELD}
    if (!data?.position_name) errorMessage.positionName = 'Enter position name'
    if (!data?.department_id) errorMessage.department = 'Select department'
    if (
        ![MAIN_POSITTIONS_ID.closer, MAIN_POSITTIONS_ID.setter].includes(data?.id?.toString()) &&
        !data?.parent_position
    )
        errorMessage.parenrPosition = 'Select main role'
    if (!data?.group_id) errorMessage.permissionGroup = 'Select permission group'

    return errorMessage
}
export const newLocationValidation = (data) => {
    let errorMessage = {...NEW_LOCATION_VALIDATION_FIELD}
    if (!data?.state_id) errorMessage.locationState = 'Select state'
    if (!data?.general_code) errorMessage.locationGeneralCode = 'Enter General Code'
    if (!data?.redline_standard) errorMessage.standerdRedline = 'Enter standard redline'
    if (!data?.effective_date && !data?.id) errorMessage.effective_date = 'Select effective date'
    if (data.type == 'Office') {
        if (!data?.office_name) errorMessage.officeName = 'Enter office name'
        if (data?.business_address) {
            let err = []
            if (!data?.business_address) err.push('address line 1')
            if (!data?.business_city) err.push('city')
            if (!data?.business_state) err.push('state')
            if (!data?.business_zip) err.push('zip')
            if (err?.length > 0) errorMessage.business_address = `Enter ${err.join(', ')}`
        } else if (!data?.business_address) {
            errorMessage.officeAddress = 'Enter office address'
        }
    }
    if (!data?.redline_standard) {
        errorMessage.standerdRedline = 'Enter standard redline'
    } else if (data?.redline_max && Number(data?.redline_max) < Number(data?.redline_standard)) {
        errorMessage.maxRedline = 'Max redline should be greater than standard redline'
    } else if (data?.redline_min && Number(data?.redline_min) > Number(data?.redline_standard)) {
        errorMessage.minRedline = 'Min redline should be less than standard redline'
    }
    return errorMessage
}
export const newCostHeadValidation = (data) => {
    let errorMessage = {...ADD_COST_HEAD_VALIDATION_FIELD}
    if (!data?.name) errorMessage.codeHeadName = 'Select Cost Head Name'
    if (!data?.code) errorMessage.costHeadCode = 'Select Code'
    return errorMessage
}

export const goalTackerValidation = (data) => {
    let errorMessage = {...ADD_GOAL_TRACKER_VALIDATION_FIELD}

    if (!Number(data?.earning ?? 0) > 0) errorMessage.earningError = `Value cannot be 0 or empty.`
    if (!Number(data?.account ?? 0) > 0) errorMessage.accountErorr = `Value cannot be 0 or empty.`
    if (!Number(data?.kw_sold ?? 0) > 0) errorMessage.kw_soldError = `Value cannot be 0 or empty.`
    return errorMessage
}

export const transferValidation = (data, empData) => {
    let msg = {
        state_id: null,
        office_id: null,
        manager_id: null,
        team_id: null,
        redline_amount_type: null,
        redline: null,
        redline_type: null,
        self_gen_redline_amount_type: null,
        self_gen_redline: null,
        self_gen_redline_type: null,
        existing_employee_new_manager_id: null,
        effective_date: null,
    }

    msg.state_id = !data?.state_id ? 'Select Office State' : ''
    msg.office_id = !data?.office_id ? 'Select Office' : ''
    msg.manager_id = !empData?.is_manager && !data?.manager_id ? 'Select manager' : ''
    if (SHOW_BASED_ON_HOST?.teamRequiredForOnboarding && !data?.team_id) msg.team_id = 'Select team'
    if (data?.redline_amount_type || isInputValueExist(data?.redline) || data?.redline_type) {
        msg.redline_amount_type = !data?.redline_amount_type ? 'Select redline type' : ''
        msg.redline = !data?.redline ? 'Select redline' : ''
        msg.redline_type = !data?.redline_type ? 'Select redline amount type' : ''
    }
    if (empData?.self_gen_accounts) {
        if (
            data?.self_gen_redline_amount_type ||
            isInputValueExist(data?.self_gen_redline) ||
            data?.self_gen_redline_type
        ) {
            msg.self_gen_redline_amount_type = !data?.self_gen_redline_amount_type
                ? 'Select redline type'
                : ''
            msg.self_gen_redline = !data?.self_gen_redline ? 'Select redline' : ''
            msg.self_gen_redline_type = !data?.self_gen_redline_type
                ? 'Select redline amount type'
                : ''
        }
    }
    if (empData?.is_manager) {
        msg.existing_employee_new_manager_id = !data.existing_employee_new_manager_id
            ? 'Select existing employee new manager'
            : ''
    }
    msg.effective_date = !data?.effective_date ? 'Select effective date' : ''

    return msg
}

export const addToPayrollValidation = (data, toCheckWeekly, toCheckMonthly) => {
    let errorMessage = {...ADD_TO_PAYROLL_VALIDATION_FIELD}
    if (toCheckWeekly && !data?.data?.weekly) errorMessage.week = 'Select Weekly PayPeriod'
    if (toCheckMonthly && !data?.data?.monthly) errorMessage.month = 'Select Monthly PayPeriod'
    return errorMessage
}
export const oneTimePaymentValidation = (data) => {
    let errorMessage = {...ONETIME_PAYMENT_VALIDATION_FIELD}
    if (!data?.user_id) errorMessage.payToEmployee = 'Select employee'
    if (!data?.adjustment_type_id) errorMessage.adjustment_type_id = 'Select adjustment'
    if (!data?.amount) errorMessage.paymentAmount = 'Select amount'

    return errorMessage
}
export const addAnnouncementValidation = (data) => {
    let errorMessage = {...ADD_ANNOUNCEMENT_VALIDATION_FIELD}
    if (!data?.title) errorMessage.title = 'Enter title'
    // if (!data?.description) errorMessage.content = 'Enter description'
    if (!data?.positions?.length > 0) errorMessage.position = 'Select Position'
    if (!data?.office?.length > 0) errorMessage.office = 'Select Office'
    if (!data?.durations) errorMessage.duration = 'Select Duration'
    if (!data?.start_date) errorMessage.startDate = 'Select Date'
    if (!data?.description) errorMessage.content = 'Enter Content'
    // if (!data?.link) errorMessage.link = 'Enter Link'
    return errorMessage
}

export const manageSaleValidatiion = ({data = null, selectedCustomerState = null}) => {
    let msg = {
        pid: '',
        customer_name: '',
        customer_state:
            (!data?.data_source_type || ['manual'].includes(data?.data_source_type)) &&
            !selectedCustomerState &&
            data?.customer_state
                ? `${data?.customer_state} (State) is not there in system`
                : !selectedCustomerState
                ? 'Select state'
                : '',
        installer: '',
        kw: '',
        approved_date: '',
        rep_id: '',
        epc: '',
        net_epc: '',
        gross_account_value: '',
        dealer_fee_amount: '',
        dealer_fee_percentage: '',
    }

    if (!data?.data_source_type || ['manual'].includes(data?.data_source_type)) {
        msg.pid = !data?.pid ? 'Enter PID' : ''
        msg.customer_name = !data?.customer_name ? 'Enter customer name' : ''
        msg.installer = !data?.installer ? 'Enter installer' : ''
        msg.kw = !data?.kw ? 'Enter kw' : ''
        msg.approved_date = !data?.approved_date ? 'Select approved date' : ''
        msg.epc = !isInputValueExist(data?.epc) ? 'Enter epc' : ''
        msg.net_epc = !isInputValueExist(data?.net_epc) ? 'Enter net epc' : ''
        msg.gross_account_value =
            !isInputValueExist(data?.gross_account_value) || Number(data?.gross_account_value) <= 0
                ? 'Enter gross account value'
                : ''
        // msg.dealer_fee_amount = !isInputValueExist(data?.dealer_fee_amount)
        //     ? 'Enter dealer fee amount'
        //     : ''
        // msg.dealer_fee_percentage =
        //     !isInputValueExist(data?.dealer_fee_percentage) || Number(data?.dealer_fee_percentage) <= 0
        //         ? 'Enter dealer fee amount'
        //         : ''
        msg.dealer_fee_percentage = !isInputValueExist(data?.dealer_fee_percentage)
            ? 'Enter dealer fee'
            : ''
    }

    msg.rep_id = !data?.rep_id ? 'Select closer' : ''
    msg.setter_id = !data?.setter_id ? 'Select setter' : ''
    return msg
}

export const AddNewOverrideOfEmploye = (data) => {
    let msg = {
        ...ADD_MANUAL_OVERRIDE,
    }
    msg.manual_user_id =
        data.manual_user_id.length == 0 ? 'Please select atleast one override' : null
    msg.effective_date = !data.effective_date ? 'Please enter effective date' : null
    msg.overrides_amount = !data.overrides_amount ? 'Enter Override amount' : null
    msg.overrides_type = !data.overrides_type ? 'Please select unit' : null
    return msg
}

export const addAdminValidation = (data) => {
    let errorMessage = {...ADD_ADMIN_VALIDATION_FIELD}
    if (!data?.first_name) errorMessage.firstName = 'Enter First Name'
    if (!data?.last_name) errorMessage.lastName = 'Select Last Name'
    if (!data?.email) errorMessage.email = 'Select Email'
    if (!data?.phone_number) errorMessage.phoneNumber = 'Enter PhoneNumber'
    if (!data?.permission) errorMessage.permissions = 'Select Permission'
    return errorMessage
}

export const editAddressValidation = (data, fieldKeys) => {
    let errorMessage = {...EDIT_ADDRESS_VALIDATION_FIELD}
    if (!data?.name) errorMessage.name = 'Enter Company Name'
    if (!data?.[fieldKeys.address1]) errorMessage.address1 = 'Enter Address'
    if (!data?.[fieldKeys.zip]) errorMessage.zip = 'Enter Zip'
    if (!data?.[fieldKeys.country]) errorMessage.country = 'Select Country'
    if (!data?.[fieldKeys.state]) errorMessage.state = 'Select State'
    if (!data?.[fieldKeys.city]) errorMessage.city = 'Select City'

    return errorMessage
}
export const changePasswordValidation = (data) => {
    let errorMessage = {...CHANGE_PASSWORD_VALIDATION_FIELD}
    if (!data?.oldPassword) errorMessage.oldPassword = 'Enter Old Password'
    if (!data?.newPassword) errorMessage.newPassword = 'Enter New Password'
    if (!data?.newPassword) {
        errorMessage.newPassword = 'Enter New Password'
    } else if (data?.confirmPassword !== data?.newPassword) {
        errorMessage.confirmPassword = 'Password and Confirm Password Does Not Match'
    }

    return errorMessage
}

export const addTemplateStepsValidation = (data, step) => {
    let errorMessage = {...ADD_NEW_TEMPLATE_VALIDATION_FIELD}
    if (step === 1) {
        if (!data?.template_name) errorMessage.templateName = 'Enter template name'
        if (!data?.template_description)
            errorMessage.templateDescription = 'Enter template description'
        // if (!data?.email_content) errorMessage.emailContent = 'Enter email content'
        if (!data?.email_subject) errorMessage.emailSubject = 'Enter email subject'
        // if (!data?.permissions?.length > 0) errorMessage.permission = 'Select permission'
        if (!data?.receipient?.length > 0) errorMessage.selectedPosition = 'Select position'
    }
    if (step == 2) {
        if (!data?.social_sequrity_no)
            errorMessage.socialSecurityNumber = 'Enter social security number'
    }
    if (step == 3) {
        if (!data?.name_of_bank) errorMessage.bankName = 'Enter bank name'

        if (!data?.type_of_account) errorMessage.accType = 'Select account type'
        if (!data?.account_no) errorMessage.accNumber = 'Enter account number'
        if (!data?.confirm_account_no) {
            errorMessage.confirmAccNumber = 'Enter account number'
        } else if (data?.confirm_account_no !== data?.account_no) {
            errorMessage.confirmAccNumber = 'Account number mismatch'
        }
        if (!data?.routing_no) {
            errorMessage.routingNumber = 'Enter routing no'
        } else if (data?.routing_no?.replace(/-|_/g, '')?.length != 9) {
            errorMessage.routingNumber = 'Routing no should be of 9 digits'
        }
    }
    if (step == 4) {
        let errData = data?.additional_info_for_employee_to_get_started
            ? JSON.parse(data?.additional_info_for_employee_to_get_started)
                  ?.filter((item) => item?.field_required == 'required')
                  .map((docItem) => !docItem?.value)
            : null
        let isError = errData?.length > 0 ? errData.includes(true) : false

        if (isError)
            errorMessage.additionalGetStartedFieldError = 'Enter required additional information'
    }
    return errorMessage
}

export const editOverrideValidatiion = ({data = null}) => {
    let msg = {
        overrides_amount: '',
        overrides_type: '',
        effective_date: '',
    }

    msg.effective_date = !data?.effective_date ? 'Enter / Select effective date' : ''
    msg.overrides_amount = !data?.overrides_amount ? 'Enter override amount' : ''
    msg.overrides_type = !data?.overrides_amount ? 'Select override type' : ''
    return msg
}

export const addEmailSettingValidation = (data) => {
    let errorMessage = {...ADD_EMAIL_SETTING_VALIDATION_FIELD}

    if (!data?.email_from_address) errorMessage.email_from_address = 'Enter Email Address'
    if (!data?.service_provider) errorMessage.service_provider = 'Select Service Provider'
    if (!data?.protocal) errorMessage.protocal = 'Select Protocol'
    if (!data?.host_name) errorMessage.host_name = 'Enter Host Name'
    if (!data?.smtp_port) errorMessage.smtp_port = 'Enter SMPT Port'
    if (!data?.timeout) errorMessage.timeout = 'Enter TimeOut'
    if (!data?.security_protocol) errorMessage.security_protocol = 'Select Security Protocol'
    if (!data?.authentication_method) {
        errorMessage.authentication_method = 'Select Authentication Method'
    }
    if (data?.authentication_method == 'user_name/password') {
        if (!data?.mail_user_name) errorMessage.mail_user_name = 'Enter Mail User'
        if (!data?.mail_password) errorMessage.mail_password = 'Enter Mail Password'
    }
    if (data?.authentication_method == 'token') {
        if (!data?.token_app_id) errorMessage.token_app_id = 'Enter Token ID'
        if (!data?.token_app_key) errorMessage.token_app_key = 'Enter Token Key'
    }
    return errorMessage
}

export const manualAddressValidation = (data) => {
    let errorMessage = {
        address_line1: null,
        address_line2: null,
        city: null,
        state: null,
        zip: null,
        lat: null,
        long: null,
        time_zone: null,
    }
    if (!data?.address_line1) errorMessage.address_line1 = 'Enter Address Line 1'
    if (!data?.state) errorMessage.state = 'Enter State'
    if (!data?.city) errorMessage.city = 'Enter City'
    if (!data?.zip) errorMessage.zip = 'Enter Zip'
    return errorMessage
}

export const editCompanyProfileValidation = (data) => {
    let errorMessage = {
        name: null,
        phone_number: null,
        business_ein: null,
        business_name: null,
        business_phone: null,
        company_email: null,
        business_address: '',
        mailing_address: '',
    }
    if (!data?.name) errorMessage.name = 'Enter company name'
    if (!data?.phone_number) errorMessage.phone_number = 'Enter Phone Number'
    if (!data?.business_ein) errorMessage.business_ein = 'Enter Business EIN'
    if (!data?.business_name) errorMessage.business_name = 'Enter Business Name'
    if (!data?.business_phone) errorMessage.business_phone = 'Enter Business Phone'
    if (!data?.company_email || !data?.company_email?.match(VALIDATION_PATTERN.email))
        if (!data?.company_email || !data?.company_email?.match(VALIDATION_PATTERN.email))
            errorMessage.company_email = 'Enter valid email'

    if (
        data?.business_address_1 ||
        data?.business_city ||
        data?.business_state ||
        data?.business_zip
    ) {
        let error = []
        if (!data?.business_address_1) error.push('address line 1')
        if (!data?.business_city) error.push('city')
        if (!data?.business_state) error.push('state')
        if (!data?.business_zip) error.push('zip')
        if (error?.length > 0) errorMessage.business_address = `Enter ${error.join(', ')}`
    }

    if (data?.mailing_address_1 || data?.mailing_city || data?.mailing_state || data?.mailing_zip) {
        let error = []
        if (!data?.mailing_address_1) error.push('address line 1')
        if (!data?.mailing_city) error.push('city')
        if (!data?.mailing_state) error.push('state')
        if (!data?.mailing_zip) error.push('zip')
        if (error?.length > 0) errorMessage.mailing_address = `Enter ${error.join(', ')}`
    }

    return errorMessage
}

export const updateUserPersonalInfoValidation = (data) => {
    let errorMessage = {
        first_name: null,
        last_name: null,
        mobile_no: null,
        email: null,
        home_address: null,
        emergrncy_contact_address: null,
    }

    if (!data?.first_name) errorMessage.first_name = 'Enter first name'
    if (!data?.last_name) errorMessage.last_name = 'Enter last name'
    if (!data?.mobile_no) errorMessage.mobile_no = 'Enter phone number'
    if (!data?.email) errorMessage.email = 'Enter email'
    if (data?.email && !EMAIL_VALIDATION(data?.email)) errorMessage.email = 'Enter valid email'
    if (data?.home_address_line_1) {
        let error = []
        if (!data?.home_address_line_1) error.push('address line 1')
        if (!data?.home_address_city) error.push('city')
        if (!data?.home_address_state) error.push('state')
        if (!data?.home_address_zip) error.push('zip')
        if (error?.length > 0) errorMessage.home_address = `Enter ${error.join(', ')}`
    }

    if (data?.emergency_address_line_1) {
        let error = []
        if (!data?.emergency_address_line_1) error.push('address line 1')
        if (!data?.emergrncy_contact_city) error.push('city')
        if (!data?.emergrncy_contact_state) error.push('state')
        if (!data?.emergrncy_contact_zip_code) error.push('zip')
        if (error?.length > 0) errorMessage.emergrncy_contact_address = `Enter ${error.join(', ')}`
    }
    return errorMessage
}
