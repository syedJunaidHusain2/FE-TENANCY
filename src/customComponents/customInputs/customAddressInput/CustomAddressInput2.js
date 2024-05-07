import {useCallback, useEffect, useState} from 'react'
import CustomLoader from '../../customLoader/CustomLoader'
import _ from 'lodash'
import CustomInput, {
    CommonLabel,
    INPUT_TYPE,
    PrefixSuffixComponent,
} from '../customInput/CustomInput'
import {AutoComplete} from 'primereact/autocomplete'
import {
    getAddressFromReverseGeocodingService,
    getLatLongByLocationService,
    getPlaceAddressService,
    getTimeZoneFromLatLongService,
} from '../../../services/Services'
import {Button} from 'primereact/button'
import CustomModal from '../../customModal/CustomModal'
import CustomButton from '../../customButtton/CustomButton'
import useValidation from '../../../hooks/useValidation'
import {manualAddressValidation} from '../../../validations/validations'

export const INITIAL_ADDRESS_FIELD = {
    full_address: null,
    address_line1: null,
    address_line2: null,
    city: null,
    state: null,
    zip: null,
    lat: null,
    long: null,
    time_zone: null,
}
const CustomAddressInput2 = ({
    data = INITIAL_ADDRESS_FIELD,
    setData = () => {},
    modalTitle,
    label,
    hideLabel,
    subLabel,
    required,
    placeholder = 'Enter Address',
    style,
    errorMessage = '',
    className,
    disabled,
    needTimeZone = false,
    needLatLong = true,
    prefixText,
    showAddressLine2 = true,
    suffixText,
}) => {
    const [searchText, setSearchText] = useState(null)
    const [foundAddresses, setFoundAddresses] = useState([])
    const [showManualAddressModal, setShowManualAddressModal] = useState(false)
    const [addressData, setAddressData] = useState(INITIAL_ADDRESS_FIELD)

    useEffect(() => {
        setAddressData((val) => ({
            ...val,
            ...data,
        }))
        setFormattedText({
            ...addressData,
            ...data,
        })
    }, [data])

    const setFormattedText = useCallback((addData) => {
        let fullAddress = [
            addData?.address_line1 ?? '',
            addData?.address_line2 ?? '',
            addData?.city ?? '',
            addData?.state ?? '',
            addData?.zip ?? '',
        ]

        if (fullAddress.filter((val) => val)?.length <= 0) fullAddress.push(addData?.full_address)
        let finalAddress = fullAddress.filter((val) => val).join(', ')
        setSearchText(finalAddress)
    }, [])

    const setAddressFinalData = useCallback(
        (addData) => {
            let completeAddress = [
                addData?.address_line1 ?? '',
                addData?.address_line2 ?? '',
                addData?.city ?? '',
                addData?.state ?? '',
                addData?.zip ?? '',
            ]
                .filter((val) => val)
                .join(', ')

            setAddressData({...addData, full_address: completeAddress})
            setFormattedText({...addData, full_address: completeAddress})
            setData({...addData, full_address: completeAddress})
        },
        [setData, setFormattedText]
    )

    const searchFunc = useCallback(
        _.debounce((e) => {
            getPlaceAddressService(encodeURI(`${e?.query}`))
                .then((res) => {
                    const data = res?.predictions?.map((item) => ({
                        ...item,
                        address: item?.description,
                        city: item?.terms[item?.terms?.length - 2],
                    }))
                    setFoundAddresses(data)
                })
                .catch(() => {
                    setFoundAddresses([])
                })
        }, 500),
        []
    )

    const onEnterManuallyPress = useCallback(() => {
        setShowManualAddressModal(true)
    }, [])

    const onHideEnterManualModal = useCallback(() => {
        setShowManualAddressModal(false)
    }, [])

    const onSelectAddress = useCallback(
        (e) => {
            const data = e?.value
            getAddressFromReverseGeocodingService(data?.place_id).then((res) => {
                const latLng = res?.results?.[0]?.geometry?.location
                let result = {
                    ...addressData,
                    address_line1: [
                        data?.structured_formatting?.main_text,
                        res?.results[0]?.address_components?.filter((item) =>
                            item?.types?.includes('neighborhood')
                        )?.[0]?.long_name,
                        res?.results[0]?.address_components?.filter((item) =>
                            item?.types?.includes('sublocality_level_3')
                        )?.[0]?.long_name,
                        res?.results[0]?.address_components?.filter((item) =>
                            item?.types?.includes('sublocality_level_2')
                        )?.[0]?.long_name,
                        res?.results[0]?.address_components?.filter((item) =>
                            item?.types?.includes('sublocality_level_1')
                        )?.[0]?.long_name,
                    ]
                        .filter((val) => val)
                        ?.join(', '),
                    address_line2: '',
                    city: res?.results[0]?.address_components?.filter((item) =>
                        item?.types?.includes('locality')
                    )?.[0]?.long_name,
                    state: res?.results[0]?.address_components?.filter((item) =>
                        item?.types?.includes('administrative_area_level_1')
                    )?.[0]?.long_name,
                    zip: res?.results[0]?.address_components?.filter((item) =>
                        item?.types?.includes('postal_code')
                    )?.[0]?.long_name,
                    lat: res?.results?.[0]?.geometry?.location?.lat,
                    long: res?.results?.[0]?.geometry?.location?.lng,
                }
                if (needTimeZone) {
                    getTimeZoneFromLatLongService(latLng?.lat, latLng?.lng)
                        .then((timeZoneRes) => {
                            result.time_zone = timeZoneRes?.timeZoneId
                            setAddressFinalData(result)
                        })
                        .catch(() => {
                            setAddressFinalData(result)
                        })
                } else {
                    setAddressFinalData(result)
                }
            })
        },
        [addressData, needTimeZone, setAddressFinalData]
    )

    const onRemoveAddressPress = useCallback(() => {
        setAddressFinalData(INITIAL_ADDRESS_FIELD)
    }, [setAddressFinalData])

    return (
        <div className={`w-100`}>
            <div className='d-flex flex-column gap-1 w-100'>
                {showManualAddressModal ? (
                    <ManualAddressPopup
                        addressData={addressData}
                        modalTitle={modalTitle}
                        show={showManualAddressModal}
                        handleClose={onHideEnterManualModal}
                        needTimeZone={needTimeZone}
                        showAddressLine2={showAddressLine2}
                        needLatLong={needLatLong}
                        setAddress={(updatedAddress) => {
                            setAddressFinalData({
                                ...addressData,
                                ...updatedAddress,
                            })
                        }}
                    />
                ) : null}
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <PrefixSuffixComponent prefixText={prefixText} suffixText={suffixText}>
                    <div className='p-inputgroup'>
                        <AutoComplete
                            className={`${className}  ${errorMessage ? 'p-invalid' : null} w-100`}
                            forceSelection
                            onBlur={() => {
                                setAddressFinalData({
                                    ...addressData,
                                })
                            }}
                            value={searchText ?? ''}
                            onChange={(e) => {
                                setSearchText(e?.value)
                            }}
                            placeholder={placeholder}
                            disabled={disabled}
                            style={{
                                fontWeight: 600,
                                fontFamily: 'Manrope',
                                fontSize: '14px',
                                ...style,
                            }}
                            field={'address'}
                            suggestions={foundAddresses}
                            completeMethod={searchFunc}
                            onSelect={onSelectAddress}
                        />
                        <Button
                            type='button'
                            icon='bi bi-keyboard'
                            severity='secondary'
                            onClick={onEnterManuallyPress}
                        />

                        <Button
                            icon='pi pi-times'
                            className='p-button-danger bg-danger opacity-75'
                            onClick={onRemoveAddressPress}
                        />
                    </div>
                </PrefixSuffixComponent>
            </div>
            <div
                className='p-error ms-2'
                style={{fontSize: '12px', fontWeight: 'bold', fontFamily: 'Manrope'}}
            >
                {errorMessage}
            </div>
        </div>
    )
}

export default CustomAddressInput2

const ManualAddressPopup = ({
    addressData = null,
    show,
    handleClose,
    setAddress,
    modalTitle = 'Set Address',
    needTimeZone,
    needLatLong,
    showAddressLine2,
}) => {
    const [loading, setLoading] = useState(false)
    const [manualData, setManualData] = useState(addressData ?? INITIAL_ADDRESS_FIELD)
    const [validateManualAddress, manualAddressErrors] = useValidation()

    useEffect(() => {
        if (manualAddressErrors?.beginValidating) {
            validateManualAddress(manualAddressValidation(manualData))
        }
    }, [manualData])

    useEffect(() => {
        setManualData((val) => ({
            ...val,
            ...addressData,
        }))
    }, [addressData])

    const updateCompanyProfileData = useCallback((field, value) => {
        setManualData((val) => ({
            ...val,
            [field]: value,
        }))
    }, [])

    const onChangeInputData = useCallback(
        (e) => {
            updateCompanyProfileData(e?.target?.name, e?.target?.value)
        },
        [updateCompanyProfileData]
    )

    const onSaveData = useCallback(
        (e) => {
            validateManualAddress(manualAddressValidation(manualData)).then((res) => {
                let data = {...manualData}
                if (res?.isValidate) {
                    setLoading(true)
                    if (needLatLong) {
                        getLatLongByLocationService(encodeURI(`${data?.city}, ${data?.state}`))
                            .then((res) => {
                                data.lat = res?.results?.[0]?.geometry?.location?.lat ?? null
                                data.long = res?.results?.[0]?.geometry?.location?.lng ?? null
                                if (needTimeZone) {
                                    getTimeZoneFromLatLongService(data.lat, data.long)
                                        .then((timeZoneRes) => {
                                            data.time_zone = timeZoneRes?.timeZoneId
                                            setAddress(data)
                                            handleClose()
                                            setLoading(false)
                                        })
                                        .catch(() => {
                                            setAddress(data)
                                            handleClose()
                                            setLoading(false)
                                        })
                                } else {
                                    setAddress(data)
                                    handleClose()
                                    setLoading(false)
                                }
                            })
                            .catch(() => {
                                handleClose()
                                setLoading(false)
                            })
                    } else {
                        if (needTimeZone) {
                            getTimeZoneFromLatLongService(data.lat, data.long)
                                .then((timeZoneRes) => {
                                    data.time_zone = timeZoneRes?.timeZoneId
                                    setAddress(data)
                                    handleClose()
                                })
                                .catch(() => {
                                    setAddress(data)
                                    handleClose()
                                    setLoading(false)
                                })
                        } else {
                            setAddress(data)
                            handleClose()
                            setLoading(false)
                        }
                    }
                }
            })
        },
        [handleClose, manualData, needLatLong, needTimeZone, setAddress, validateManualAddress]
    )

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='500' title={modalTitle}>
            <CustomLoader visible={loading} full />
            <div
                className='mx-5 mx-sm-auto'
                style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Manrope'}}
            >
                {/* line */}
                <div className='mb-5'>
                    <CustomInput
                        required
                        label={'Address Line 1'}
                        placeholder='Set Address Line 1'
                        name='address_line1'
                        value={manualData?.address_line1}
                        onChange={onChangeInputData}
                        errorMessage={manualAddressErrors?.address_line1}
                    />
                </div>

                {showAddressLine2 ? (
                    <div className='mb-5'>
                        <CustomInput
                            label={'Address Line 2'}
                            placeholder='Set Address Line 2'
                            name='address_line2'
                            value={manualData?.address_line2 ?? ''}
                            onChange={onChangeInputData}
                        />
                    </div>
                ) : null}

                {/* line */}
                <div className='row gap-sm-0 gap-5 align-items-center mb-5 '>
                    <div className='col-sm'>
                        <CustomInput
                            required
                            label={'State'}
                            placeholder='Set State'
                            errorMessage={manualAddressErrors?.state}
                            name='state'
                            value={manualData?.state}
                            onChange={onChangeInputData}
                        />
                    </div>
                    <div className='col-sm'>
                        <CustomInput
                            required
                            label={'City'}
                            errorMessage={manualAddressErrors?.city}
                            placeholder='Set City'
                            name='city'
                            value={manualData?.city}
                            onChange={onChangeInputData}
                        />
                    </div>
                </div>
                {/* line */}
                <div className='mb-15'>
                    <CustomInput
                        required
                        label={'zip'}
                        type={INPUT_TYPE.number}
                        placeholder='Enter ZIP'
                        name='zip'
                        errorMessage={manualAddressErrors?.zip}
                        value={manualData?.zip}
                        onChange={onChangeInputData}
                    />
                </div>

                <div className='mb-15 row'>
                    {needTimeZone ? (
                        <span className='col'>
                            Timezone: <strong>{manualData?.time_zone ?? '-'}</strong>
                        </span>
                    ) : null}
                    {needLatLong ? (
                        <span className='col'>
                            LatLng:{' '}
                            <strong>
                                {manualData?.lat && manualData?.long
                                    ? `${manualData?.lat}, ${manualData?.long}`
                                    : '-'}
                            </strong>
                        </span>
                    ) : null}
                </div>

                <div className='text-center'>
                    <CustomButton buttonLabel={modalTitle} onClick={onSaveData} />
                </div>
            </div>
        </CustomModal>
    )
}
