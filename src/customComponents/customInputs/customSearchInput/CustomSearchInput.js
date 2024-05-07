import {useCallback, useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import CustomLoader from '../../customLoader/CustomLoader'
import _ from 'lodash'
import CustomInput, {INPUT_TYPE} from '../customInput/CustomInput'

const CustomSearchInput = ({
    zIndex = 10,
    onSearch,
    onSelectValue = () => {},
    selectedValue = '',
    display_field_name = 'name',
    placeholder = 'Who hired this Person',
    style,
    errorMessage = '',
    customEmptyMessage = 'No Data Found',
}) => {
    const searchTextInputRef = useRef(null)
    const mainInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState('')
    const [openSearchList, setOpenSearchList] = useState(false)

    useEffect(() => {
        if (!searchText) {
            setData([])
        }
    }, [searchText])

    const searchFunc = useCallback(
        _.debounce((e) => {
            setSearchText(e?.target?.value)
            setLoading(true)
            onSearch(e?.target?.value)
                .then(setData)
                .finally(() => setLoading(false))
        }, 500),
        []
    )

    useEffect(() => {
        if (openSearchList) searchTextInputRef?.current?.focus()
        else {
            setSearchText('')
            setData([])
        }
    }, [openSearchList])

    const onOptionPress = useCallback(
        (item) => {
            onSelectValue(item)
            setOpenSearchList(false)
        },
        [onSelectValue]
    )

    const onInputBlur = useCallback(() => {
        setTimeout(() => {
            setOpenSearchList(false)
        }, 300)
    }, [])

    const onInputClick = useCallback(() => {
        setOpenSearchList((val) => !val)
    }, [])

    return (
        <div style={{width: '100%', zIndex}}>
            <div style={{width: '100%'}}>
                <input
                    autoComplete='off'
                    ref={mainInputRef}
                    readOnly
                    type='search'
                    value={selectedValue ?? ''}
                    onClick={onInputClick}
                    style={{
                        background: '#FAFAFA',
                        fontWeight: 600,
                        color: '#424242',
                        fontSize: '14px',
                        width: '100%',
                        ...style,
                    }}
                    name='input'
                    placeholder={placeholder}
                    className={`form-select p-3 h-50px form-select-black form-select-sm ${
                        errorMessage ? 'border-cmError' : ''
                    }`}
                />
            </div>
            <div
                className='p-error ms-2 text-cmError'
                style={{fontSize: '12px', fontWeight: 600, fontFamily: 'Manrope'}}
            >
                {errorMessage}
            </div>
            {openSearchList && (
                <div
                    className='d-flex justify-content-center'
                    style={{width: '100%', position: 'relative'}}
                >
                    <div
                        className='shadow bg-white'
                        style={{
                            position: 'absolute',
                            width: '100%',
                            zIndex,
                            background: 'green',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            fontWeight: 600,
                        }}
                    >
                        <div>
                            <div className='' style={{width: '100%'}}>
                                <div className='mb-1 mx-auto py-3'>
                                    {/* <CustomInput
                                        type={INPUT_TYPE.search}
                                        name='search'
                                        onChange={searchFunc}
                                        ref={searchTextInputRef}
                                        onBlur={onInputBlur}
                                        value={searchText}
                                    /> */}
                                    <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute mt-6 ms-3 translate-middle-y'
                                    />

                                    <input
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
                                    />
                                </div>
                                <div
                                    style={{
                                        border: '0.5px solid #E0E0E0',
                                        width: '100%',
                                        marginTop: '-5px',
                                    }}
                                ></div>
                            </div>
                            <div
                                className='my-4 '
                                style={{
                                    width: '100%',
                                    overflowY: 'scroll',
                                }}
                            >
                                <CustomLoader visible={loading} opacity={0} />
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {!loading && searchText && data?.length <= 0 && (
                                        <span
                                            className='text-cmGrey300'
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            {customEmptyMessage}
                                        </span>
                                    )}
                                    {!loading && !searchText && (
                                        <span className='text-cmGrey500'>Please search</span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        maxHeight: 200,
                                    }}
                                >
                                    {!loading &&
                                        searchText &&
                                        data.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='d-flex flex-row'
                                                    style={{
                                                        paddingLeft: 15,
                                                        paddingRight: 15,
                                                        border: '2px solid lightgrey',
                                                        borderTopWidth: 0,
                                                        borderBottomWidth:
                                                            data?.length - 1 == index ? 0 : 2,
                                                        borderLeftWidth: 0,
                                                        borderRightWidth: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        onOptionPress(item)
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontFmaily: 'Manrope ms-10 mt-5',
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    >
                                                        <p className='mt-2'>
                                                            {item?.[display_field_name]}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomSearchInput
