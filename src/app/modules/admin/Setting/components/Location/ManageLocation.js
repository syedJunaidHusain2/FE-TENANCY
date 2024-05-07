import {useState, useEffect, useCallback, useMemo} from 'react'
// import {createPortal} from 'react-dom'
import _ from 'lodash'
import {
    addLocationService,
    getLatLongByLocationService,
    getPlaceAddressService,
    updateLocationService,
} from '../../../../../../services/Services'
import {useSelector} from 'react-redux'
import {getAllStatesAndCitiesSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {INITIAL_ADDRESS_FIELD} from '../../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
import {
    newLocationValidation,
    NEW_LOCATION_VALIDATION_FIELD,
} from '../../../../../../validations/validations'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
    getLocationRedlineHelper,
    isEmptyObjectValue,
} from '../../../../../../helpers/CommonHelpers'
import {LocatonAddManualAddress} from './LocatonAddManualAddress'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {getValidDate} from '../../../../../../constants/constants'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import EditLocationRedlineModal from './EditLocationRedlineModal'
import ViewLocationRedlineChanges from './ViewLocationRedlineChanges'
import CustomAddressInput from '../../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput'
import CustomAddressInput2 from '../../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'

const FIELD_KEYS = {
    state_id: 'state_id',
    city_id: 'city_id',
    general_code: 'general_code',
    installation_partner: 'installation_partner',
    redline_min: 'redline_min',
    redline_standard: 'redline_standard',
    redline_max: 'redline_max',
    redline_data: 'redline_data',
    marketing_deal_person_id: 'marketing_deal_person_id',
    type: 'type',
    lat: 'lat',
    long: 'long',
    office_name: 'office_name',
    effective_date: 'effective_date',
}
const ManageLocation = ({show, handleClose, setLoader, selectedLocation, alert = false}) => {
    const allStatCity = useSelector(getAllStatesAndCitiesSelector)
    const [loading, setLoading] = useState(false)
    const [showExtraFeilds, setShowExtraFeilds] = useState(selectedLocation?.type == 'Office')
    const [openAddressPopup, setOpenAddressPopup] = useState(false)
    const [setSelectedBusinessAddress] = useState(null)
    const [editRedline, setEditRedline] = useState(false)
    const [toggleView, setToggleView] = useState(false)

    const [locationData, setLocationData] = useState({
        state_id: null,
        city_id: null,
        general_code: null,
        installation_partner: null,
        redline_min: null,
        redline_standard: null,
        redline_max: null,
        marketing_deal_person_id: null,
        type: 'Redline',
        lat: null,
        long: null,
        mailing_address: null,
        mailing_city: null,
        mailing_state: null,
        mailing_zip: null,
        business_city: null,
        business_address: null,
        business_state: null,
        business_zip: null,
        effective_date: null,
        redline_data: [],
        ...selectedLocation,
    })

    useEffect(() => {
        setShowExtraFeilds(selectedLocation?.type == 'Office')
    }, [selectedLocation])
    const [addLocationError, setAddLocationError] = useState(NEW_LOCATION_VALIDATION_FIELD)

    const updateFieldsData = useCallback(
        (key, value) => {
            Object.freeze(locationData)
            let temp = _.cloneDeep(locationData)
            temp[key] = value

            setLocationData(temp)
        },
        [locationData]
    )
    const onChangeInputData = useCallback(
        (e) => {
            updateFieldsData(e?.target?.name, e?.target?.value)
        },
        [updateFieldsData]
    )
    const addOrUpdateLocationPress = (e) => {
        e.preventDefault()
        callApiAddOrUpdateLocation()
    }

    const callApiAddOrUpdateLocation = useCallback(
        (redlineData = null) => {
            let body = {}
            const callApi = () => {
                if (locationData?.id) {
                    updateLocationService(body)
                        .then((res) => {
                            if (res.status) {
                                handleClose()
                                CustomToast.success('Location updated')
                                setLoader(true)
                            } else {
                                CustomToast.error(getErrorMessageFromResponse(res))
                            }
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                } else {
                    addLocationService(body)
                        .then((res) => {
                            if (res?.status) {
                                handleClose()
                                CustomToast.success('Location added')
                                setLoader(true)
                            } else {
                                CustomToast.error(getErrorMessageFromResponse(res))
                            }
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            }

            body = {
                state_id: locationData?.state_id,
                city_id: locationData?.city_id,
                general_code: locationData?.general_code,
                installation_partner: locationData?.installation_partner,
                redline_min: locationData?.redline_min,
                redline_standard: locationData?.redline_standard,
                redline_max: locationData?.redline_max,
                redline_data: redlineData ?? locationData?.redline_data,
                type: locationData?.type,
                lat: locationData?.lat,
                long: locationData?.long,
                time_zone: locationData?.time_zone,
                office_name: locationData?.office_name,
                business_address: locationData?.business_address,
                business_city: locationData?.business_city,
                business_state: locationData?.business_state,
                business_zip: locationData?.business_zip,
                mailing_address: locationData?.mailing_address,
                mailing_state: locationData?.mailing_state,
                mailing_city: locationData?.mailing_city,
                mailing_zip: locationData?.mailing_zip,
                effective_date: locationData?.effective_date
                    ? getValidDate(locationData?.effective_date, 'YYYY-MM-DD')
                    : null,
            }
            if (locationData?.id) body.id = locationData?.id
            const validationErrors = newLocationValidation(body)
            setAddLocationError(validationErrors)

            if (isEmptyObjectValue(validationErrors)) {
                setLoading(true)
                callApi()
            }
        },
        [
            handleClose,
            locationData?.business_address,
            locationData?.business_city,
            locationData?.business_state,
            locationData?.business_zip,
            locationData?.city_id,
            locationData?.effective_date,
            locationData?.general_code,
            locationData?.id,
            locationData?.installation_partner,
            locationData?.lat,
            locationData?.long,
            locationData?.mailing_address,
            locationData?.mailing_city,
            locationData?.mailing_state,
            locationData?.mailing_zip,
            locationData?.office_name,
            locationData?.redline_data,
            locationData?.redline_max,
            locationData?.redline_min,
            locationData?.redline_standard,
            locationData?.state_id,
            locationData?.time_zone,
            locationData?.type,
            setLoader,
        ]
    )

    const onSeachAddress = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                getPlaceAddressService(encodeURI(`${searchText}`))
                    .then((res) => {
                        const data = res?.predictions?.map((item) => ({
                            ...item,
                            address: item?.description,
                            city: item?.terms[item?.terms?.length - 2],
                        }))

                        resolve(data)
                    })
                    .catch(() => {
                        resolve([])
                    })
            }),
        []
    )
    const onSelectAddress = useCallback(
        (value) => {
            // updateFieldsData('business_address', value?.address)
            getLatLongByLocationService(encodeURI(`${value?.address}`)).then((res) => {
                const data = {
                    address: value?.address,
                    city: res?.results[0]?.address_components
                        ?.filter((item) => item?.types?.includes('administrative_area_level_3'))
                        .map((res) => res?.long_name),
                    state: res?.results[0]?.address_components
                        ?.filter((item) => item?.types?.includes('administrative_area_level_1'))
                        .map((res) => res?.short_name),
                    zip: res?.results[0]?.address_components
                        ?.filter((item) => item?.types?.includes('postal_code'))
                        .map((res) => res?.long_name),
                    // lat: res?.results[0]?.geometry?.location?.lat,
                    // lng: res?.results[0]?.geometry?.location?.lng,
                }
                let tempData = {...locationData}
                tempData['business_address'] = data?.address?.toString()
                tempData['business_city'] = data?.city?.toString()
                tempData['business_state'] = data?.state?.toString()
                tempData['business_zip'] = data?.zip?.toString()
                // tempData['lat'] = data?.lat
                // tempData['long'] = data?.lng
                // tempData['type'] = 'Office'

                setLocationData(tempData)
                setSelectedBusinessAddress(data)
            })
        },
        [locationData]
    )
    const closeAddressPopup = () => {
        setOpenAddressPopup(false)
    }
    const closeRedlinePopup = () => {
        setEditRedline(false)
    }

    const handleAddManually = () => {
        let tempData = {...locationData}
        tempData['business_address'] = null
        tempData['business_city'] = null
        tempData['business_state'] = null
        tempData['business_zip'] = null

        setLocationData(tempData)
        setOpenAddressPopup(true)
    }

    const onSaveOtherRedlinePress = useCallback(
        (redlineData) => {
            setEditRedline(false)
            callApiAddOrUpdateLocation(redlineData)
        },
        [callApiAddOrUpdateLocation]
    )

    const closeToggle = () => {
        setToggleView(false)
    }

    const currentRedline = useMemo(() => {
        const data = getLocationRedlineHelper(locationData)?.current
        return data
    }, [locationData])

    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth={650}
            title={selectedLocation?.id ? 'Edit Location' : 'Add Location'}
        >
            <CustomLoader visible={loading} full />
            <div className='px-lg-10'>
                <form onSubmit={addOrUpdateLocationPress}>
                    <div className='w-sm-100 w-100 mx-auto'>
                        <div className='modal-body  py-lg-7 '>
                            <div>
                                <div className='row justify-content-between align-items-start mb-5'>
                                    <div
                                        className='col-sm-6'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <CustomDropdown
                                            label={'State'}
                                            required
                                            options={allStatCity}
                                            name={FIELD_KEYS.state_id}
                                            value={locationData?.state_id}
                                            onChange={(e) => {
                                                const code = allStatCity?.find(
                                                    (item) => item?.id == e?.target?.value
                                                )?.state_code
                                                setLocationData((val) => ({
                                                    ...val,
                                                    [FIELD_KEYS.state_id]: e?.target?.value,
                                                    [FIELD_KEYS?.general_code]: code,
                                                }))
                                            }}
                                            errorMessage={addLocationError?.locationState}
                                            valueKey='id'
                                            disabled={alert}
                                        />
                                    </div>

                                    <div
                                        className='col-sm-6'
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <CustomInput
                                            errorMessage={addLocationError.locationGeneralCode}
                                            label='General Code'
                                            required={true}
                                            placeholder='Ex. CA , CA-PH&GWY'
                                            name={FIELD_KEYS.general_code}
                                            value={locationData?.general_code}
                                            onChange={onChangeInputData}
                                            disabled={alert}
                                        />
                                        <div
                                            className={`text-cmGrey600  mt-2`}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                lineHeight: '15px',
                                            }}
                                        >
                                            State Codes must match the state code in the CRM Data
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-5'>
                                    <div className='d-flex align-itmes-center gap-5'>
                                        <CustomCheckbox
                                            disable={locationData?.people > 0}
                                            checked={locationData?.type == 'Office'}
                                            onChange={(e) => {
                                                setShowExtraFeilds(e.target.checked)
                                                updateFieldsData(
                                                    FIELD_KEYS.type,
                                                    locationData?.type == 'Office'
                                                        ? 'Redline'
                                                        : 'Office'
                                                )
                                            }}
                                        />

                                        <label
                                            className='form-check-label text-cmGrey700'
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Manrope',
                                            }}
                                            htmlFor='flexCheckboxLg'
                                        >
                                            Office ( Work Location)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {showExtraFeilds && (
                                <div className=' mx-auto'>
                                    <div className='mb-5 '>
                                        <CustomInput
                                            label={'Office Name'}
                                            required
                                            placeholder='E.g. SF Office'
                                            name={FIELD_KEYS.office_name}
                                            value={locationData?.office_name}
                                            onChange={onChangeInputData}
                                            errorMessage={addLocationError?.officeName}
                                        />
                                    </div>
                                    <div className='mb-5 '>
                                        <CustomAddressInput2
                                            showAddressLine2={false}
                                            setData={(data) => {
                                                setLocationData((val) => ({
                                                    ...val,
                                                    business_address: data?.address_line1,
                                                    business_city: data?.city,
                                                    business_state: data?.state,
                                                    business_zip: data?.zip,
                                                    lat: data?.lat,
                                                    long: data?.long,
                                                    time_zone: data?.time_zone,
                                                }))
                                            }}
                                            data={{
                                                ...INITIAL_ADDRESS_FIELD,
                                                address_line1: locationData?.business_address,
                                                city: locationData?.business_city,
                                                state: locationData?.business_state,
                                                zip: locationData?.business_zip,
                                                lat: locationData?.lat,
                                                long: locationData?.long,
                                                time_zone: locationData?.time_zone,
                                            }}
                                            required
                                            needTimeZone
                                            label={'Office (Work Location) Address'}
                                            modalTitle={'Set Office Adress'}
                                            name={'business_address'}
                                            errorMessage={
                                                addLocationError?.officeAddress ||
                                                addLocationError?.business_address
                                            }
                                        />
                                        <div className='d-flex flex-wrap align-items-center justify-content-between mt-1 text-cmGrey600'>
                                            <span style={{fontWeight: '500', fontSize: '12px'}}>
                                                {' '}
                                                Enter complete address for the work location{' '}
                                            </span>{' '}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='py-lg-7 py-5  d-flex justify-content-center'>
                                <div className='col'>
                                    <CustomInput
                                        label='Installation Partner'
                                        name={FIELD_KEYS.installation_partner}
                                        value={locationData?.installation_partner}
                                        onChange={onChangeInputData}
                                        placeholder='Enter'
                                    />
                                </div>
                            </div>

                            {!selectedLocation?.id ? (
                                <div className='py-lg-0 py-5 mx-auto'>
                                    <div
                                        className='text-cmGrey900'
                                        style={{
                                            fontFamily: fontsFamily.manrope,
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Redline
                                    </div>

                                    <div
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        className='row mb-5  mt-1 justify-content-between w-100'
                                    >
                                        {/* Min */}
                                        <div className='col-sm'>
                                            <CustomInput
                                                label={'Min'}
                                                prefixText='$'
                                                onChange={onChangeInputData}
                                                className=''
                                                placeholder='0.00'
                                                type={INPUT_TYPE.number}
                                                name={FIELD_KEYS.redline_min}
                                                value={locationData?.redline_min}
                                                errorMessage={addLocationError.minRedline}
                                            />
                                        </div>

                                        {/* Standard */}
                                        <div className='col-sm'>
                                            <CustomInput
                                                label={'Standard'}
                                                prefixText='$'
                                                type={INPUT_TYPE.number}
                                                errorMessage={addLocationError.standerdRedline}
                                                name={FIELD_KEYS.redline_standard}
                                                value={locationData?.redline_standard}
                                                onChange={onChangeInputData}
                                                className=''
                                                placeholder='0.00'
                                                required
                                            />
                                        </div>

                                        {/* Max */}
                                        <div className='col-sm'>
                                            <CustomInput
                                                label={'Max'}
                                                prefixText='$'
                                                name={FIELD_KEYS.redline_max}
                                                value={locationData?.redline_max}
                                                onChange={onChangeInputData}
                                                className=''
                                                placeholder='0.00'
                                                type={INPUT_TYPE.currency}
                                                errorMessage={addLocationError.maxRedline}
                                            />
                                        </div>
                                    </div>
                                    {/* Effective Date */}
                                    <div className='d-flex align-items-center gap-5'>
                                        <div
                                            className='text-cmGrey900 required'
                                            style={{
                                                fontWeight: 600,
                                                fontFamily: fontsFamily.manrope,
                                                fontSize: '14px',
                                            }}
                                        >
                                            Effective From
                                        </div>
                                        <CustomDatePicker
                                            className={'w-auto'}
                                            placeholderText={'End Date'}
                                            errorMessage={addLocationError?.effective_date}
                                            name={FIELD_KEYS.effective_date}
                                            value={locationData?.effective_date}
                                            onChange={onChangeInputData}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {selectedLocation?.id ? (
                                <>
                                    {/* Current Redline block */}
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 14,
                                            fontFamily: fontsFamily.manrope,
                                        }}
                                    >
                                        <div className='d-flex justify-content-between align-items-center mb-5'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <div className='text-cmGrey900'>
                                                    Current Redline
                                                </div>
                                                <div className='text-cmGrey700'>
                                                    since{' '}
                                                    {currentRedline?.effective_date
                                                        ? getValidDate(
                                                              currentRedline?.effective_date
                                                          )
                                                        : '-'}
                                                </div>

                                                <CustomLink
                                                    label={'Audit log'}
                                                    onClick={() => setToggleView(true)}
                                                />
                                            </div>
                                            <div
                                                className='bi bi-pencil fs-5 cursor-pointer'
                                                onClick={() => setEditRedline(!editRedline)}
                                            />
                                        </div>
                                        {/* min max standard */}
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <div className='text-cmGrey600'>Min</div>
                                                <div
                                                    className='text-cmGrey800'
                                                    style={{fontSize: 16}}
                                                >
                                                    {currentRedline?.redline_min
                                                        ? formattedNumberFields(
                                                              currentRedline?.redline_min
                                                          )
                                                        : '-'}
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-3'>
                                                <div className='text-cmGrey600 required'>
                                                    Standard
                                                </div>
                                                <div
                                                    className='text-cmGrey800'
                                                    style={{fontSize: 16}}
                                                >
                                                    {currentRedline?.redline_standard
                                                        ? formattedNumberFields(
                                                              currentRedline?.redline_standard
                                                          )
                                                        : '-'}
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-3'>
                                                <div className='text-cmGrey600'>Max</div>
                                                <div
                                                    className='text-cmGrey800'
                                                    style={{fontSize: 16}}
                                                >
                                                    {currentRedline?.redline_max
                                                        ? formattedNumberFields(
                                                              currentRedline?.redline_max
                                                          )
                                                        : '-'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mt-4 mb-12'>
                        <CustomButton
                            type='submit'
                            buttonSize={BUTTON_SIZE.large}
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel={selectedLocation?.id ? 'Update Location' : 'Add Location'}
                            onClick={addOrUpdateLocationPress}
                        />
                    </div>
                </form>
                {openAddressPopup ? (
                    <LocatonAddManualAddress
                        show={openAddressPopup}
                        handleClose={closeAddressPopup}
                        locationData={locationData}
                        stateList={allStatCity}
                        onChangeInputData={onChangeInputData}
                        setLocationData={setLocationData}
                    />
                ) : null}

                {editRedline ? (
                    <EditLocationRedlineModal
                        locationData={locationData}
                        redline_data={locationData?.redline_data}
                        onSavePress={onSaveOtherRedlinePress}
                        show={editRedline}
                        handleClose={closeRedlinePopup}
                    />
                ) : null}
            </div>
            {toggleView ? (
                <ViewLocationRedlineChanges
                    toggleView={toggleView}
                    closeToggle={closeToggle}
                    locationData={locationData}
                />
            ) : null}
        </CustomModal>
    )
}

export default ManageLocation
