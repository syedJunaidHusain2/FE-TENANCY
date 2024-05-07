import React, {memo, useCallback, useMemo} from 'react'
import {Dropdown} from 'primereact/dropdown'
import {fontsFamily} from '../../../assets/fonts/fonts'
import CustomLink from '../../customButtton/CustomLink'

const CustomDropdown = ({
    name = null,
    value = '',
    searching = true,
    onChange = null,
    options = [],
    displayKey = 'name',
    valueKey = 'value',
    placeholder = 'Select',
    className = '',
    showClear = true,
    style,
    errorMessage = '',
    disabled = false,
    dropdownIcon = null,
    required = false,
    label = null,
    hideLabel = false,
    filterMessage = 'No available options',
    showLink = false,
    linkLabel = '',
    onLinkPress,
}) => {
    const dropdownOptions = useMemo(() => {
        return options?.length > 0
            ? options?.map((item) => {
                  return {
                      ...item,
                      name: item?.[displayKey],
                      value: item?.[valueKey]?.toString(),
                  }
              })
            : []
    }, [displayKey, valueKey, options])

    const countryOptionTemplate = (option) => {
        return (
            <div className='country-item'>
                <div>{option?.name}</div>
            </div>
        )
    }

    const handleChange = useCallback(
        (e) => {
            if (!e?.target?.value?.disabled) onChange(e)
        },
        [onChange]
    )

    return (
        <>
            <div className='d-flex flex-column gap-1 w-100 fw-bold' style={{fontWeight: 800}}>
                {label ? (
                    <div className='d-flex'>
                        <label
                            className={`text-cmGrey700 w-100 ${required ? 'required' : null}`}
                            style={{
                                fontFamily: fontsFamily.manrope,
                                fontWeight: 600,
                                opacity: hideLabel ? 0 : 1,
                            }}
                        >
                            {label}
                        </label>
                        {showLink ? <CustomLink label={linkLabel} onClick={onLinkPress} /> : null}
                    </div>
                ) : null}

                <Dropdown
                    filter={searching}
                    value={value?.toString()}
                    options={dropdownOptions}
                    onChange={handleChange}
                    {...(dropdownIcon ? {dropdownIcon} : null)}
                    placeholder={placeholder}
                    itemTemplate={countryOptionTemplate}
                    optionLabel='name'
                    showClear={value && showClear}
                    className={`${className} ${errorMessage ? 'p-invalid' : ''} w-100`}
                    panelStyle={{
                        fontWeight: 900,
                        textDecoration: null,
                        fontFamily: fontsFamily.manrope,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    panelClassName='fw-bold'
                    disabled={disabled}
                    name={name}
                    style={{
                        fontWeight: 600,
                        fontFamily: fontsFamily.manrope,
                        fontSize: '14px',
                        ...style,
                    }}
                    emptyFilterMessage={filterMessage}
                />

                {errorMessage ? (
                    <div
                        className='p-error ms-2'
                        style={{fontSize: '12px', fontFamily: 'Manrope', fontWeight: 600}}
                    >
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default memo(CustomDropdown)
