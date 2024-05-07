import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import _ from 'lodash'
import {AutoComplete} from 'primereact/autocomplete'
import {useSelector} from 'react-redux'
import {getAllStatesAndCitiesSelector} from '../../../redux/selectors/SettingsSelectors'
import {CommonLabel} from '../customInput/CustomInput'
import {MultiSelect} from 'primereact/multiselect'

const CustomAutoCompleteDropdown = ({
    onChange = null,
    value = null,
    filteredValue = null,
    searchValue = null,
    label = null,
    options = [],
    selectedOptions = [],
    displayKey = 'name',
    placeholder = 'Select',
    className,
    required = false,
    valueKey = 'name',
    placeholderIcon = 'bi bi-plus-square',
    errorMessage = '',
    name = null,
}) => {
    // const countries = useSelector(getAllStatesAndCitiesSelector)

    const [filteredValues, setFilteredValues] = useState(null)

    const onSearch = useCallback(
        (event) => {
            setTimeout(() => {
                let _filteredOptions
                if (!event?.query?.trim().length) {
                    _filteredOptions = [...options]
                } else {
                    _filteredOptions = options?.filter((item) => {
                        return item?.[valueKey]?.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }

                setFilteredValues(_filteredOptions)
            }, 250)
        },
        [options]
    )

    return (
        <div style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}>
            <div>
                <CommonLabel label={label} required={required} />
            </div>
            <div className='w-100'>
                <MultiSelect
                    // panelClassName='w-100'
                    // inputClassName='w-100'
                    className={`${errorMessage ? 'p-invalid' : null} w-100`}
                    filter
                    display='chip'
                    value={selectedOptions}
                    // suggestions={filteredValues}
                    options={options}
                    // completeMethod={onSearch}
                    // field={displayKey}
                    // multiple
                    optionLabel='name'
                    onChange={onChange}
                    // aria-label='Countries'
                    placeholder={
                        <div className='filter-placeholder'>
                            <i className={placeholderIcon} style={{marginRight: '5px'}}></i>
                            {placeholder}
                        </div>
                    }
                    name={name}
                />
                <div
                    className='p-error ms-2'
                    style={{fontSize: '12px', fontFamily: 'Manrope', fontWeight: 600}}
                >
                    {errorMessage}
                </div>
            </div>
        </div>
    )
}

export default CustomAutoCompleteDropdown
