import {memo, useMemo, useState} from 'react'
import {InputText} from 'primereact/inputtext'
import {InputMask} from 'primereact/inputmask'
import {InputTextarea} from 'primereact/inputtextarea'
import {numberInputOnWheelPreventChange} from '../../../helpers/CommonHelpers'
import {Password} from 'primereact/password'
import {PolarArea} from 'react-chartjs-2'
import {fontsFamily} from '../../../assets/fonts/fonts'
import {Chips} from 'primereact/chips'

export const INPUT_TYPE = {
    text: 'text',
    number: 'number',
    mobile: 'mobile',
    currency: 'currency',
    textarea: 'textarea',
    email: 'email',
    password: 'password',
    search: 'search',
    ChipText: 'ChipText',
}

const CustomInput = ({
    // Number Input
    min = null,
    max = null,
    label = null,
    hideLabel = false,
    // Common
    required = false,
    value = null,
    onClick = null,
    onChange = null,
    type = INPUT_TYPE.text,
    placeholder = type === INPUT_TYPE.search ? 'Search' : '',
    disabled = false,
    className = '',
    style,
    errorMessage = '',
    name = '',
    rejex = null,
    feedback = true,
    mask = '(999) 999-9999',
    iconClass = null,
    subLabel = null,
    prefixText = '',
    suffixText = '',
    suffixContent = null,
    onSubmit = null,
    ref = null,
    subLabelClass = '',
    inputBackground = 'cmwhite',
    textColor = '',
}) => {
    const commonProps = useMemo(
        () => ({
            className: `${className}  ${errorMessage ? 'p-invalid' : null} w-100`,
            onChange,
            onClick,
            value: value ?? '',
            placeholder,
            name,
            disabled,
            style: {
                fontWeight: 600,
                fontFamily: 'Manrope',
                fontSize: '14px',
                ...style,
            },
        }),
        [className, disabled, errorMessage, name, onChange, onClick, placeholder, style, value]
    )

    const NumberInput = useMemo(
        () => (
            <div
                className='d-flex flex-column gap-1'
                style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
            >
                <CommonLabel
                    label={label}
                    subLabelClass={subLabelClass}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <div className='d-flex align-items-center gap-1'>
                    <PrefixSuffixComponent
                        suffixContent={suffixContent}
                        suffixText={suffixText}
                        prefixText={prefixText}
                    >
                        <InputText
                            type={'number'}
                            {...commonProps}
                            min={min}
                            max={max}
                            keyfilter={/[0-9]*/}
                            onWheel={numberInputOnWheelPreventChange}
                            onSubmit={onSubmit}
                        />
                    </PrefixSuffixComponent>
                </div>
            </div>
        ),
        [
            commonProps,
            hideLabel,
            label,
            max,
            min,
            onSubmit,
            prefixText,
            required,
            subLabel,
            subLabelClass,
            suffixContent,
            suffixText,
        ]
    )

    const MobileInput = useMemo(
        () => (
            <div className='d-flex flex-column gap-1'>
                <CommonLabel label={label} subLabel={subLabel} required={required} />
                <PrefixSuffixComponent suffixText={suffixText} prefixText={prefixText}>
                    <InputMask {...commonProps} mask={mask} autoClear={false} keyfilter={'num'} />
                </PrefixSuffixComponent>
            </div>
        ),
        [commonProps, label, mask, prefixText, required, subLabel, suffixText]
    )

    const TextInput = useMemo(
        () => (
            <div className='d-flex flex-column gap-1 w-100'>
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <PrefixSuffixComponent prefixText={prefixText} suffixText={suffixText}>
                    <InputText {...commonProps} type={type} keyfilter={rejex} />{' '}
                </PrefixSuffixComponent>
            </div>
        ),
        [commonProps, hideLabel, label, prefixText, rejex, required, subLabel, suffixText, type]
    )

    const ChipText = useMemo(
        () => (
            <div className='d-flex flex-column gap-1 w-100'>
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <PrefixSuffixComponent prefixText={prefixText} suffixText={suffixText}>
                    <Chips {...commonProps} type={type} />
                </PrefixSuffixComponent>
            </div>
        ),
        [commonProps, hideLabel, label, prefixText, required, subLabel, suffixText, type]
    )

    const SearchInput = useMemo(
        () => (
            <div className='d-flex flex-column gap-1 w-100'>
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                    iconClass={iconClass}
                />

                <div className='p-input-icon-left w-100'>
                    <i className='pi pi-search fs-5 text-cmGrey400' />
                    <InputText
                        ref={ref}
                        placeholder={placeholder}
                        name={name}
                        type={type}
                        style={{
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontFamily: 'Manrope',
                            fontSize: '14px',
                            width: '100%',
                            ...style,
                        }}
                        onChange={onChange}
                        value={value}
                    />
                </div>
            </div>
        ),
        [
            label,
            hideLabel,
            subLabel,
            required,
            iconClass,
            ref,
            placeholder,
            name,
            type,
            style,
            onChange,
            value,
        ]
    )

    const TextArea = useMemo(
        () => (
            <div className='d-flex flex-column gap-1'>
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <PrefixSuffixComponent prefixText={prefixText} suffixText={suffixText}>
                    <InputTextarea
                        {...commonProps}
                        style={{
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontFamily: 'Manrope',
                            fontSize: '14px',
                            width: '100%',
                            ...style,
                        }}
                        autoResize
                    />{' '}
                </PrefixSuffixComponent>
            </div>
        ),
        [commonProps, hideLabel, label, prefixText, required, style, subLabel, suffixText]
    )

    const TextPassword = useMemo(
        () => (
            <div className='d-flex flex-column gap-1'>
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <PrefixSuffixComponent prefixText={prefixText} suffixText={suffixText}>
                    <Password
                        {...commonProps}
                        style={{width: '100%'}}
                        inputStyle={{...commonProps.style}}
                        toggleMask={true}
                        inputClassName={`bg-${inputBackground} text-${textColor}`}
                        onChange={onChange}
                        feedback={false}
                    />
                </PrefixSuffixComponent>
            </div>
        ),
        [
            label,
            hideLabel,
            subLabel,
            required,
            prefixText,
            suffixText,
            commonProps,
            inputBackground,
            textColor,
            onChange,
        ]
    )

    const CustomisedInputs = useMemo(() => {
        switch (type) {
            case INPUT_TYPE.text:
                return TextInput
            case INPUT_TYPE.number:
                return NumberInput
            case INPUT_TYPE.currency:
                return NumberInput
            case INPUT_TYPE.mobile:
                return MobileInput
            case INPUT_TYPE.textarea:
                return TextArea
            case INPUT_TYPE.email:
                return TextInput
            case INPUT_TYPE.password:
                return TextPassword
            case INPUT_TYPE.search:
                return SearchInput
            case INPUT_TYPE.ChipText:
                return ChipText
            default:
                return TextInput
        }
    }, [ChipText, MobileInput, NumberInput, SearchInput, TextArea, TextInput, TextPassword, type])

    return (
        <div className={`w-100`}>
            {CustomisedInputs}
            <div
                className='p-error ms-2 text-cmError'
                style={{fontSize: '11px', fontFamily: 'Manrope', fontWeight: 500}}
            >
                {errorMessage}
            </div>
        </div>
    )
}

export const CommonLabel = ({
    hideLabel = false,
    label = '',
    subLabel = '',
    iconClass = '',
    required = false,
    subLabelClass = '',
}) => (
    <>
        {label ? (
            <label
                className={`text-cmGrey700 text-nowrap ${required ? 'required' : null}`}
                style={{
                    fontFamily: fontsFamily.manrope,
                    fontWeight: 600,
                    opacity: hideLabel ? 0 : 1,
                    fontSize: '14px',
                }}
            >
                <span className={iconClass} /> {label}
                {subLabel ? (
                    <span
                        className={`ms-2 text-cmGrey500 ${subLabelClass}`}
                        style={{fontSize: '12px'}}
                    >
                        {subLabel}
                    </span>
                ) : null}
            </label>
        ) : null}
    </>
)

export const PrefixSuffixComponent = ({prefixText, suffixText, suffixContent, children}) => (
    <div className='p-inputgroup'>
        {prefixText ? <span className='p-inputgroup-addon'>{prefixText}</span> : null}
        {children}
        {suffixText ? <span className='p-inputgroup-addon'>{suffixText}</span> : null}
    </div>
)

export default memo(CustomInput)
