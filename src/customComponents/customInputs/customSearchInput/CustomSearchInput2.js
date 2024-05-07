import {useCallback, useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import CustomLoader from '../../customLoader/CustomLoader'
import _ from 'lodash'
import CustomInput, {INPUT_TYPE} from '../customInput/CustomInput'
import {AutoComplete} from 'primereact/autocomplete'

const CustomSearchInput2 = ({
    zIndex = 10,
    onSearch,
    onSelectValue = () => {},
    selectedValue = '',
    display_field_name = 'name',
    placeholder = 'Who hired this Person',
    style,
    errorMessage = '',
}) => {
    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (searchText) searchFunc(searchText)
    }, [searchText])

    const searchFunc = useCallback(
        _.debounce((txt) => {
            // setSearchText(txt)
            // setLoading(true)
            onSearch(txt).then(setData)
            // .finally(() => setLoading(false))
        }, 500),
        []
    )

    return (
        <div style={{width: '100%', zIndex}}>
            <div style={{width: '100%'}}>
                <AutoComplete
                    field={display_field_name}
                    placeholder={placeholder}
                    value={searchText ?? selectedValue}
                    suggestions={data}
                    // completeMethod={searchFunc}
                    onSelect={(e) => {
                        onSelectValue(e?.target?.value)
                    }}
                    onChange={(e) => {
                        setSearchText(e?.target?.value)
                    }}
                    forceSelection
                />
            </div>
            <div className='p-error ms-2' style={{fontSize: '12px', fontFamily: 'Manrope'}}>
                {errorMessage}
            </div>
        </div>
    )
}

export default CustomSearchInput2
