import {
    IMAGE_URL,
    LEAD_DAYS_FOR_FINALIZE_PAYROLL,
    MAIN_POSITTIONS_ID,
    getValidDate,
} from '../constants/constants'
import images from '../assets/images'
import _ from 'lodash'
import moment from 'moment'

export const jsonToFormData = (jsonObj) =>
    Object.entries(jsonObj)?.reduce(
        (current, item) => (current.append(...item), current),
        new FormData()
    )

export const sendDataToReducer = (dispatch, type = null, payload = null) => {
    if (type) dispatch(type(payload))
}
export const IMAGE_TYPE = {
    noImage: 'noImage',
    userAvatar: 'userAvatar',
    companyLogo: 'companyLogo',
}
export const getServerImage = (image_path = null, type = IMAGE_TYPE.userAvatar) => {
    return image_path ? `${IMAGE_URL}/${image_path}` : getDefaultImage(type)
}

export const getDefaultImage = (type) => {
    switch (type) {
        case IMAGE_TYPE.userAvatar:
            return images.defaultUserImage
        case IMAGE_TYPE.companyLogo:
            return images.defaultCompanyImage
        case IMAGE_TYPE.noImage:
            return images.sequifiLogo
        default:
            return null
    }
}

export const countDecimals = (value) => {
    if (Math.floor(value) === value) return 0
    return value?.toString()?.split('.')[1]?.length || 0
}

export const formattedNumberFields = (
    amountOrPercentage = 0,
    type = '$',
    bindWithSpanTag = true
) => {
    let amount = Number(amountOrPercentage)
    // const totalDecimal = countDecimals(amount)
    const formattedAmount = amount
        // ?.toFixed(totalDecimal > 2 ? totalDecimal : 2)
        ?.toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (type === '$') {
        const finalAmount =
            Number(amount) < 0 ? `(${formattedAmount.replace('-', '')})` : formattedAmount
        return bindWithSpanTag ? (
            <span className={Number(amount) < 0 ? 'text-cmError text-nowrap' : 'text-nowrap'}>
                {`${type} ${finalAmount}`}
            </span>
        ) : (
            `${type} ${finalAmount}`
        )
    } else {
        return `${formattedAmount} ${type}`
    }
}
export const percentageLimitCheck = (max, value) => {
    if (Number(value) <= Number(max)) return true
    else return false
}

export const formattedNumberFieldsWithoutDecimal = (
    amountOrPercentage = 0,
    type = '',
    needOnlyValue = false
) => {
    let amount = Number(amountOrPercentage)
    const formattedAmount = amount
        ?.toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (type === '$') {
        const finalAmount =
            Number(amount) < 0 ? `(${formattedAmount.replace('-', '')})` : formattedAmount
        return `${type} ${finalAmount}`
    } else {
        return `${formattedAmount} ${type}`
    }
}

export const formattedPhoneNumber = (phoneNumber = null) => {
    if (!phoneNumber) return null
    let phone_number = phoneNumber
        ?.toString()
        ?.replace('+1', '')
        ?.replace('(', '')
        ?.replace(')', '')
        ?.replace('+', '')
        .replace('-', '')
    if (phone_number?.startsWith('001')) phone_number = phone_number?.substring(3)
    return phone_number?.toString()?.length > 0
        ? `(${phone_number?.toString().slice(0, 3)}) ${phone_number
              ?.toString()
              ?.slice(3, 6)}-${phone_number?.toString().slice(6)}`
        : null
}

//convert number to xxxxx1212 type format
export const convertToMaskedNumber = (num, minLength = 0) => {
    const strNum = num?.toString()
    const maskedNum =
        num?.length >= minLength
            ? 'x'?.repeat(strNum?.length - 4) + strNum?.substring(strNum?.length - 4)
            : num
    return maskedNum
}
export const getBooleanValue = (customValue) => {
    const value = Number(customValue)
    if (value == true || value == 1 || value == '1' || value) return 1
    else if (value == false || value == 0 || value == '0' || !value) return 0
    else return null
}

export const isEmptyObjectValue = (object) => _.values(object).every(_.isEmpty)

export const escapeRegExp = (str) => {
    if (!_.isString(str)) return ''
    return str.replace(/[-[\]\\/{}()*+?.^$|]/g, '\\$&')
}

export const getGlobalSearchData = (data = [], field = [], searchString) => {
    const searchData = []
    const searchStr = escapeRegExp(searchString).replace(/ /g, '')
    if (searchStr !== '') {
        data.map((item) => {
            let isSearch = false
            field.map((key) => {
                if (
                    !isSearch &&
                    item?.[key]
                        ?.toLowerCase()
                        ?.toString()
                        ?.replace(/ /g, '')
                        ?.match(searchStr?.toLowerCase()?.toString())
                ) {
                    isSearch = true
                }
                return true
            })
            if (isSearch) searchData.push(item)
            return true
        })
    }
    return searchData
}

export const getMobileNumberWithoutMask = (phoneNumber) => {
    if (!phoneNumber) return null
    let phone_number = phoneNumber?.toString()?.replace('+1', '')
    if (phone_number?.startsWith('001')) phone_number = phone_number?.substring(3)
    return phone_number ? phone_number.toString()?.replace(/[- )(]/g, '') : null
}

export const getDataWithoutMask = (data) => {
    return data ? data.toString()?.replace(/[- )(]/g, '') : null
}

export const getErrorMessageFromResponse = (error) => {
    const field = error?.data?.error ? Object.keys(error?.data?.error)?.[0] ?? '' : null
    return error?.data?.error?.[field]?.[0] ?? error?.data?.message ?? error?.data?.Message ?? ''
}

export const isInputValueExist = (value) => {
    return ['null', 'undefined', '', null, undefined].includes(value?.toString()?.trim()) ? 0 : 1
}
export const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur()

    // Prevent the page/container scrolling
    e.stopPropagation()
}

export const getRepRedlineFromSale = (
    positionType,
    selectedState,
    sale_state_redline = 0,
    rep,
    approved_date = null
) => {
    const officeRedline = getLocationRedlineHelper(rep?.office, approved_date)?.current
    let redlines = {
        redline: null,
        redline_type: null,
        type:
            selectedState?.general_code == rep?.office?.general_code ||
            rep?.redline_amount_type == 'Fixed'
                ? 'Fixed'
                : 'Shifted',
    }

    let originalRedlineData = []
    if (rep?.self_gen_accounts && positionType != rep?.position_id) {
        if (rep?.self_gen_redline && rep?.self_gen_redline_type) {
            originalRedlineData.push({
                redline: rep?.self_gen_redline,
                start_date: rep?.self_gen_redline_type,
                redline_type: rep?.self_gen_redline_type,
            })
        }
        if (rep?.self_gen_additional_redline?.length > 0) {
            rep?.self_gen_additional_redline?.map((item) => {
                if (item?.redline && item?.start_date) originalRedlineData.push(item)
            })
        }

        const dates = originalRedlineData
            ?.filter((item) => item?.redline)
            ?.map((item) => ({
                ...item,
                start_date: moment(
                    new Date(moment(item?.start_date).format('YYYY-MM-DD 00:00:00'))
                ),
            }))

        const sortedRedlinesDates = dates
            ?.sort((a, b) => a?.start_date?.diff(b?.start_date))
            ?.reverse()

        const existRedline = sortedRedlinesDates?.find(
            (item) =>
                new Date(moment(approved_date).format('YYYY-MM-DD 00:00:00')) >= item?.start_date
        )

        if (existRedline) {
            redlines.redline = existRedline?.redline
            redlines.redline_type = existRedline?.redline_type
        }

        if (
            redlines?.type != 'Fixed' &&
            isInputValueExist(sale_state_redline) &&
            isInputValueExist(redlines.redline) &&
            isInputValueExist(officeRedline?.redline_standard)
        ) {
            redlines.redline = (
                Number(sale_state_redline) +
                (Number(redlines.redline) - Number(officeRedline?.redline_standard))
            )?.toFixed(2)
        }
    } else {
        if (rep?.redline && rep?.redline_effective_date) {
            originalRedlineData.push({
                redline: rep?.redline,
                start_date: rep?.redline_effective_date,
                redline_type: rep?.redline_type,
            })
        }
        if (rep?.additional_redline?.length > 0) {
            rep?.additional_redline?.map((item) => {
                if (item?.redline && item?.start_date) originalRedlineData.push(item)
            })
        }

        const dates =
            originalRedlineData?.length > 0
                ? originalRedlineData?.map((item) => ({
                      ...item,
                      start_date: moment(
                          new Date(moment(item?.start_date).format('YYYY-MM-DD 00:00:00'))
                      ),
                  }))
                : []

        const sortedRedlinesDates =
            dates?.length > 0
                ? dates?.sort((a, b) => a?.start_date?.diff(b?.start_date))?.reverse()
                : []

        const existRedline =
            sortedRedlinesDates?.length > 0
                ? sortedRedlinesDates?.find(
                      (item) =>
                          new Date(moment(approved_date).format('YYYY-MM-DD 00:00:00')) >=
                          item?.start_date
                  )
                : null

        if (existRedline) {
            redlines.redline = existRedline?.redline
            redlines.redline_type = existRedline?.redline_type
        }

        if (
            redlines?.type != 'Fixed' &&
            isInputValueExist(sale_state_redline) &&
            isInputValueExist(redlines?.redline) &&
            isInputValueExist(officeRedline?.redline_standard)
        ) {
            redlines.redline = (
                Number(sale_state_redline) +
                (Number(redlines.redline) - Number(officeRedline?.redline_standard))
            )?.toFixed(2)
        }
    }

    return redlines
}

export const convertHTMLToPlainText = (html) => {
    // Create a new div element
    var tempDivElement = document.createElement('div')
    // Set the HTML content with the given value
    tempDivElement.innerHTML = html
    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || ''
}

export const getDeadlinetoFinalizePayrollDate = (date) => {
    let finalDate = null
    const day = moment(date, 'MM/DD/YYYY').day()
    let final_lead_day = LEAD_DAYS_FOR_FINALIZE_PAYROLL
    if ([1, 2].includes(day)) final_lead_day = final_lead_day + 2
    finalDate = moment(date).subtract(final_lead_day, 'days')
    finalDate = moment(date).subtract(final_lead_day, 'days')
    return getValidDate(finalDate, 'YYYY-MM-DD')
}
export const getDeadlinetoFinalizePayroll = (date, payPeriod = null) => {
    let startDate = null,
        endDate = null,
        dateIsInPayPeriod = false

    if (date) {
        const finalDate = date ? moment(getDeadlinetoFinalizePayrollDate(date)) : null
        if (payPeriod) {
            const splitDates = payPeriod?.split(' - ')
            if (splitDates?.[0]) startDate = moment(splitDates?.[0], 'MM/DD/YYYY')
            if (splitDates?.[1]) endDate = moment(splitDates?.[1], 'MM/DD/YYYY')
            if (finalDate >= startDate && finalDate <= endDate) dateIsInPayPeriod = true
        }
        return (
            <span>
                {finalDate ? getValidDate(finalDate?.format('YYYY/MM/DD')) : '-'}
                {dateIsInPayPeriod ? (
                    <span className='text-danger ms-5'>
                        <i className='bi bi-exclamation-circle text-danger' /> Overlapping pay
                        period
                    </span>
                ) : null}
            </span>
        )
    } else return null
}

export const getUserPositionMetaData = (userData) => {
    const position_id = userData?.position_id
    const isUserSuperAdmin = userData?.is_super_admin
    const isUserManager = userData?.is_manager && !userData?.is_super_admin
    const isUserCloser =
        !isUserManager &&
        !isUserSuperAdmin &&
        [MAIN_POSITTIONS_ID.closer].includes(position_id?.toString())
    const isUserSetter =
        !isUserManager &&
        !isUserSuperAdmin &&
        [MAIN_POSITTIONS_ID.setter].includes(position_id?.toString())

    if (isUserSetter) {
        return {
            position_name: 'Setter',
            position_color: 'cminfo',
            subposition_name: '',
        }
    } else if (isUserCloser) {
        return {
            position_name: 'Closer',
            position_color: 'info',
        }
    } else if (isUserManager) {
        return {
            position_name: 'Manager',
            position_color: 'cmgreen',
        }
    } else if (isUserSuperAdmin) {
        return {
            position_name: 'Super Admin',
            position_color: 'cmOrange',
        }
    }
}

export const getEmployeeRedlineHelper = (
    employeeData = null,
    trigger_date = null,
    self_gen = false
) => {
    const triggerDate = trigger_date
        ? new Date(moment(trigger_date).format('YYYY-MM-DD 00:00:00'))
        : new Date(moment().format('YYYY-MM-DD 00:00:00'))
    const redline_data = self_gen ? employeeData?.self_gen_redline_data : employeeData?.redline_data
    let currentRedline = {
        redline_amount: self_gen ? employeeData?.self_gen_redline : employeeData?.redline_amount,
        redline_type: self_gen ? employeeData?.self_gen_redline_type : employeeData?.redline_type,
        start_date: null,
    }

    const pastRedlineData = redline_data?.filter(
        (item) =>
            new Date(moment(item?.start_date, 'YYYYY-MM-DD').format('YYYY-MM-DD 00:00:00')) <
            triggerDate
    )

    const upcomingRedlineData = redline_data?.filter(
        (item) =>
            new Date(moment(item?.start_date, 'YYYYY-MM-DD').format('YYYY-MM-DD 00:00:00')) >
            triggerDate
    )

    const dates = redline_data?.map((item) => ({
        ...item,
        start_date: moment(new Date(moment(item?.start_date).format('YYYY-MM-DD 00:00:00'))),
    }))
    const sortedRedlinesDates = dates?.sort((a, b) => a?.start_date?.diff(b?.start_date))?.reverse()
    const existRedline = sortedRedlinesDates?.find((item) => triggerDate >= item?.start_date)

    if (existRedline) {
        currentRedline.redline_amount = existRedline?.redline
        currentRedline.redline_type = existRedline?.redline_type
        currentRedline.start_date = existRedline?.start_date
    }

    return {
        current: currentRedline,
        past: pastRedlineData,
        upcoming: upcomingRedlineData,
    }
}

export const getLocationRedlineHelper = (locationData = null, trigger_date = null) => {
    const triggerDate = trigger_date
        ? new Date(moment(trigger_date).format('YYYY-MM-DD 00:00:00'))
        : new Date(moment().format('YYYY-MM-DD 00:00:00'))

    let pastRedlineData = [],
        upcomingRedlineData = []
    let currentRedline = {
        redline_min: locationData?.redline_min,
        redline_standard: locationData?.redline_standard,
        redline_max: locationData?.redline_max,
        effective_date: locationData?.effective_date,
    }

    if (triggerDate && isInputValueExist(locationData?.redline_standard)) {
        let redline_data = locationData?.redline_data ? [...locationData?.redline_data] : []
        redline_data.push({
            redline_min: locationData?.redline_min,
            redline_standard: locationData?.redline_standard,
            redline_max: locationData?.redline_max,
            effective_date: locationData?.effective_date,
        })

        pastRedlineData = redline_data?.filter(
            (item) =>
                new Date(
                    moment(item?.effective_date, 'YYYYY-MM-DD').format('YYYY-MM-DD 00:00:00')
                ) < triggerDate
        )
        upcomingRedlineData = redline_data?.filter(
            (item) =>
                new Date(
                    moment(item?.effective_date, 'YYYYY-MM-DD').format('YYYY-MM-DD 00:00:00')
                ) > triggerDate
        )

        const dates = redline_data?.map((item) => ({
            ...item,
            effective_date: moment(
                new Date(moment(item?.effective_date).format('YYYY-MM-DD 00:00:00'))
            ),
        }))
        const sortedRedlinesDates = dates
            ?.sort((a, b) => a?.effective_date?.diff(b?.effective_date))
            ?.reverse()

        const existRedline = sortedRedlinesDates?.find(
            (item) => triggerDate >= item?.effective_date
        )

        if (existRedline) {
            currentRedline = {
                ...existRedline,
                effective_date: getValidDate(existRedline?.effective_date, 'YYYY/MM/DD', true),
            }
        }
    }

    return {
        current: currentRedline,
        past: pastRedlineData,
        upcoming: upcomingRedlineData,
    }
}
export const bindHtmlWithCss = (html = '', css = '') => {
    return `<head><style>${css}</style>${html}`
}
export const isObjectHasEmptyValue = (data) => {
    return Object.keys(data).every((key) => [undefined, null, ''].includes(data[key]))
}

export const downloadAnyFileHelper = (data, fileName) => {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
}

export const getTextForSecurity = (data = null, lastDigit = 4) => {
    let lastStartIndex = data ? data?.toString()?.replace(/-/gim)?.length - lastDigit : null
    let value = data
        ? data
              ?.toString()
              ?.replace(/-/gim)
              ?.slice(lastStartIndex, lastStartIndex + lastDigit)
        : ''
    return value
}

//Function to show filter Counts
export const displayfilterCounts = (filterData) => {
    const count = Object.values(filterData)?.filter((value) => value)?.length
    return count
}

// table vertical line style Bootstrap
export const TABLE_BORDER = 'border border-dark border-top-0 border-bottom-0 border-cmGrey200'
