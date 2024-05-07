import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import _ from 'lodash'
import {getGlobalSearchData} from '../../../helpers/CommonHelpers'
import CustomImage from '../../customImage/CustomImage'
import arr084 from '../../../app/modules/standard_manager/management/component/team/assets/arr084.png'
import CustomLoader from '../../customLoader/CustomLoader'
import CustomInput, {INPUT_TYPE} from '../customInput/CustomInput'

const CustomAutoCompleteMultiselectDropdown = ({
    displayFields = [],
    valueField = '',
    searchFields = [],
    zIndex = 10,
    onChange = () => {},
    name = null,
    value = '',
    options = [],
    placeholder = 'Select',
    style,
    classes = '',
    membersList = [],
    selectedLead = [],
    loading = false,
    label = null,
    subLabel = null,
    showSuggestion,
    iconClass,
}) => {
    const searchTextInputRef = useRef(null)
    const mainInputRef = useRef(null)
    const [searchText, setSearchText] = useState('')
    const [openSearchList, setOpenSearchList] = useState(false)

    const searchFunc = useCallback(
        (e) => {
            setSearchText(e?.target?.value)
            return getGlobalSearchData(options, searchFields, e?.target?.value)
        },
        [options, searchFields]
    )

    useEffect(() => {
        if (openSearchList) searchTextInputRef?.current?.focus()
        else {
            setSearchText('')
        }
    }, [openSearchList])

    const searchedData = useMemo(() => {
        return searchText ? getGlobalSearchData(options, searchFields, searchText) : options
    }, [options, searchFields, searchText])

    const onOptionPress = useCallback(
        (item) => {
            onChange({
                target: {
                    name: name,
                    value: item,
                },
            })
            // setOpenSearchList(false)
        },
        [name, onChange, valueField]
    )

    const onInputBlur = useCallback(() => {
        // setTimeout(() => {
        //   setOpenSearchList(false)
        // }, 10000)
    }, [])

    const onInputClick = useCallback(() => {
        setOpenSearchList((val) => !val)
    }, [])

    const selectedDisplayValue = useMemo(() => {
        return options?.length > 0 ? options?.find((item) => item?.[valueField] == value) : null
    }, [options, value, valueField])

    const getValuesFromDisplayFields = useCallback(
        (item) => {
            const finalData =
                item && displayFields?.length > 0
                    ? displayFields?.map((keyItem) => item?.[keyItem])?.join(' ')
                    : ''
            return finalData ?? ''
        },
        [displayFields]
    )

    return (
        <div style={{width: '100%', zIndex}}>
            {/* <div style={{width: '100%'}}>
                <input
                    autoComplete='off'
                    ref={mainInputRef}
                    readOnly
                    type='search'
                    value={getValuesFromDisplayFields(selectedDisplayValue)}
                    onClick={onInputClick}
                    style={{
                        background: '#FAFAFA',
                        fontWeight: '800px',
                        color: '#424242',
                        fontSize: '14px',
                        width: '100%',
                        ...style,
                    }}
                    name='input'
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                    placeholder={placeholder}
                    className={`form-select p-3 h-50px form-select-black form-select-sm ${classes}`}
                />
            </div> */}

            {/* {openSearchList && ( */}
            <div
                className='d-flex justify-content-center'
                style={{width: '100%', position: 'relative'}}
            >
                <div
                    className='w-100'
                    // style={{
                    //     // position: 'absolute',
                    //     width: '100%',
                    //     zIndex,
                    //     background: 'green',
                    //     borderTopLeftRadius: 0,
                    //     borderTopRightRadius: 0,
                    //     borderBottomRightRadius: 10,
                    //     borderBottomLeftRadius: 10,
                    // }}
                >
                    <div>
                        <div style={{width: '100%'}}>
                            <div
                            // style={{height: '43px', border: 'none', width: '100%'}}
                            // className='mb-1 d-flex jutify-content-center'
                            // id='kt_chat_contacts_header'
                            >
                                {/* <div
                                        style={{height: '43px', border: 'none', width: '100%'}}
                                        className='position-relative'
                                    >
                                        <KTSVG
                                            path='/media/icons/duotune/general/gen021.svg'
                                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                        /> */}

                                {/* <input
                                            autoComplete='off'
                                            ref={searchTextInputRef}
                                            onBlur={onInputBlur}
                                            type='search'
                                            style={{
                                                background: 'white',
                                                border: 'none',
                                                width: '100%',
                                            }}
                                            onChange={searchFunc}
                                            className='form-control form-control-solid px-12 '
                                            name='search'
                                            placeholder='Search...'
                                        /> */}
                                <CustomInput
                                    label={label}
                                    subLabel={subLabel}
                                    iconClass={'bi bi-eye-slash'}
                                    type={INPUT_TYPE.search}
                                    onChange={searchFunc}
                                    ref={searchTextInputRef}
                                />
                                {/* </div> */}
                            </div>
                            {/* <div
                                    style={{
                                        border: '0.5px solid #E0E0E0',
                                        width: '100%',
                                        marginTop: '-5px',
                                    }}
                                ></div> */}
                        </div>
                        {searchText || showSuggestion ? (
                            <div
                                className='my-4 '
                                style={{
                                    width: '100%',
                                    overflowY: 'scroll',
                                    position: 'relative',
                                }}
                            >
                                <CustomLoader visible={loading} />

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {searchText && searchedData?.length <= 0 && (
                                        <span
                                            className='text-cmGrey300'
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            No Data Found
                                        </span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        maxHeight: 200,
                                    }}
                                >
                                    {searchedData.map((item, index) => {
                                        const isThereInTeamList =
                                            membersList?.length > 0
                                                ? membersList?.some(
                                                      (tItem) => tItem?.id == item?.id
                                                  )
                                                : false
                                        const isLead = item?.id == selectedLead
                                        return (
                                            !isLead && (
                                                <div
                                                    key={index}
                                                    className='d-flex my-5 bg-cmwhite cursor-pointer shadow-sm justify-content-between py-2 px-5'
                                                    style={{
                                                        backgroundColor: '#F5F5F5',
                                                        borderRadius: '10px',
                                                    }}
                                                    onClick={() => {
                                                        !isThereInTeamList && onOptionPress(item)
                                                    }}
                                                >
                                                    <div className=''>
                                                        <span
                                                            style={{
                                                                color: '#424242',
                                                                fontWeight: '500',
                                                                fontSize: '14px',
                                                                fontFamily: 'Manrope',
                                                            }}
                                                        >
                                                            <CustomImage
                                                                src={item?.image}
                                                                className='avatar me-3'
                                                            />
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize: '14px',
                                                                fontWeight: '500',
                                                                color: '#5E6278',
                                                            }}
                                                        >
                                                            {item?.first_name} {item?.last_name}
                                                        </span>
                                                    </div>
                                                    {isThereInTeamList && (
                                                        <div className=''>
                                                            <img
                                                                src={arr084}
                                                                alt=''
                                                                className='avatar me-3'
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {/* )} */}
        </div>
    )
}

export default CustomAutoCompleteMultiselectDropdown
