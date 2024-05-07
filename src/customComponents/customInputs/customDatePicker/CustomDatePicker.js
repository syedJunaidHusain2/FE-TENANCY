import {Calendar} from 'primereact/calendar'
// import 'primereact/resources/primereact.min.css'
// import 'primereact/resources/themes/saga-blue/theme.css'
// import 'primereact/resources/primereact.min.css'
import {memo, useMemo, useState} from 'react'
import {CommonLabel} from '../customInput/CustomInput'
import {DEFAULT_DATE_FORMAT} from '../../../constants/constants'
import {fontsFamily} from '../../../assets/fonts/fonts'

const CustomDatePicker = ({
    dateFormat = 'mm/dd/yy',
    name = 'customDate',
    value = null,
    disabled = false,
    disabledDates = [],
    onChange = null,
    onViewDateChange = null,
    className = null,
    mode = 'single',
    isModal = false,
    timeOnly = false,
    minDate = null,
    maxDate = null,
    placeholder = DEFAULT_DATE_FORMAT,
    inputClassName = 'py-4',
    errorMessage = '',
    padding = 'py-1',
    viewMode = 'date',
    BackgroundColor = 'cmwhite',
    onBlur = null,
    readOnlyInput = null,
    label,
    subLabel,
    required = false,
    disabledDays = [],
    hideLabel = false,
    showTodayAndClearButton = true,
}) => {
    return (
        <div className={`${className} d-flex flex-column gap-1`} aria-expanded='false'>
            <CommonLabel
                label={label}
                hideLabel={hideLabel}
                subLabel={subLabel}
                required={required}
            />

            <Calendar
                // panelClassName='w-100'
                inputClassName='w-100'
                style={{borderRadius: '10px'}}
                inputStyle={{fontFamily: 'Manrope', fontWeight: 800, fontSize: '14px'}}
                className={`${errorMessage ? 'p-invalid' : null} w-100`}
                name={name}
                view={viewMode}
                value={value ? new Date(value) : null}
                {...(onBlur ? {onBlur: onBlur} : null)}
                {...(onChange ? {onChange: onChange} : null)}
                readOnlyInput={readOnlyInput}
                placeholder={placeholder}
                selectionMode={mode}
                showOnFocus={false}
                onViewDateChange={onViewDateChange}
                disabled={disabled}
                disabledDates={disabledDates}
                dateFormat={dateFormat}
                showIcon
                disabledDays={disabledDays}
                minDate={minDate ? new Date(minDate) : null}
                maxDate={maxDate}
                showButtonBar={showTodayAndClearButton}
                {...(isModal && {touchUI: true})}
                {...(timeOnly && {timeOnly: true})}
                hourFormat='12'
            />

            {errorMessage ? (
                <div>
                    <div
                        className='p-error ms-2 text-cmError'
                        style={{fontSize: '12px', fontFamily: fontsFamily.manrope, fontWeight: 600}}
                    >
                        {errorMessage}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default memo(CustomDatePicker)
