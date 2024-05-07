import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {VALIDATION_PATTERN} from '../../../../../constants/constants'
import {
    getCompanyProfileAction,
    updateCompanyProfileAction,
} from '../../../../../redux/actions/SettingActions'
import {getCompanyProfileSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {
    getLatLongByLocationService,
    getPlaceAddressService,
    updateCompanyProfileService,
} from '../../../../../services/Services'
import images from '../../../../../assets/images'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import timeZones from '../../../../../constants/timezones.json'
import {INITIAL_ADDRESS_FIELD} from '../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
import {
    IMAGE_TYPE,
    getDataWithoutMask,
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
    getServerImage,
    jsonToFormData,
} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {InputMask} from 'primereact/inputmask'
import {ManualAddressPopup} from './ManualAddressPopup'
import CustomSearchInput from '../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import useDocumentTitle from '../../../../../hooks/useDocumentTitle'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import EditProfileModal from '../EditProfileModal'
import CustomAddressInput from '../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput'
import CustomAddressInput2 from '../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
import useValidation from '../../../../../hooks/useValidation'
import {editCompanyProfileValidation} from '../../../../../validations/validations'

const SettingsEditProfile = () => {
    const navigate = useNavigate()
    const companyProfileFilePickerRef = useRef()
    const dispatch = useDispatch()
    const globalCompanyProfile = useSelector(getCompanyProfileSelector)
    const [companyProfile, setCompanyProfile] = useState(globalCompanyProfile)
    const [loading, setLoading] = useState(false)
    const [showAddressPopup, setShowAddressPopup] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [manualAddressObj, setManualAddressObj] = useState(null)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(100)
    const [rotation, setRotation] = useState(0)
    const [validateEditCompanyProfile, companyProfileErrorMessages] = useValidation()

    useEffect(() => {
        setCompanyProfile(globalCompanyProfile)
    }, [globalCompanyProfile])

    useEffect(() => {
        if (companyProfileErrorMessages.beginValidating) {
            validateEditCompanyProfile(editCompanyProfileValidation(companyProfile))
        }
    }, [companyProfile])

    const handleZoomChange = (event) => {
        const newZoomLevel = parseInt(event.target.value)
        setZoomLevel(newZoomLevel)
    }

    const handleRotationChange = (event) => {
        const newRotation = event.target.value
        setRotation(newRotation)
    }

    const updateCompanyProfileData = useCallback((field, value) => {
        setCompanyProfile((val) => ({
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
    const onSavePress = useCallback(() => {
        validateEditCompanyProfile(editCompanyProfileValidation(companyProfile)).then((res) => {
            if (res?.isValidate) {
                let body = {
                    id: companyProfile?.id ?? 1,
                    name: companyProfile?.name ?? '',
                    phone_number: getMobileNumberWithoutMask(companyProfile?.phone_number) ?? '',
                    company_email: companyProfile?.company_email ?? '',
                    country: companyProfile?.country ?? 'USA',
                    time_zone: companyProfile?.time_zone ?? '',
                    business_phone:
                        getMobileNumberWithoutMask(companyProfile?.business_phone) ?? '',
                    company_type: companyProfile?.company_type ?? 'Solar',
                    business_name: companyProfile?.business_name ?? '',
                    business_address: companyProfile?.business_address ?? '',
                    business_city: companyProfile?.business_city ?? '',
                    business_state: companyProfile?.business_state ?? '',
                    business_zip: companyProfile?.business_zip ?? '',
                    business_address_1: companyProfile?.business_address_1 ?? '',
                    business_address_2: companyProfile?.business_address_2 ?? '',
                    business_lat: companyProfile?.business_lat ?? '',
                    business_long: companyProfile?.business_long ?? '',
                    business_address_time_zone: companyProfile?.business_address_time_zone ?? '',

                    mailing_address: companyProfile?.mailing_address ?? '',
                    mailing_address_1: companyProfile?.mailing_address_1 ?? '',
                    mailing_address_2: companyProfile?.mailing_address_2 ?? '',
                    mailing_lat: companyProfile?.mailing_lat ?? '',
                    mailing_long: companyProfile?.mailing_long ?? '',
                    mailing_state: companyProfile?.mailing_state ?? '',
                    mailing_city: companyProfile?.mailing_city ?? '',
                    mailing_zip: companyProfile?.mailing_zip ?? '',
                    mailing_address_time_zone: companyProfile?.mailing_address_time_zone ?? '',
                    business_ein: getDataWithoutMask(companyProfile?.business_ein) ?? '',
                    company_website: companyProfile?.company_website ?? '',
                }
                if (companyProfile?.logo) body.logo = companyProfile?.logo
                if (!companyProfile?.logo) body.remove_logo = 1

                setLoading(true)
                dispatch(updateCompanyProfileAction(body))
                    .then(() => {
                        dispatch(getCompanyProfileAction())
                        navigate(-1)
                    })
                    .catch((error) => {
                        CustomToast.error(getErrorMessageFromResponse(error))
                    })
                    .finally((res) => {
                        setLoading(false)
                    })
            }
        })
    }, [companyProfile, dispatch, navigate, validateEditCompanyProfile])

    const closeAddressPopup = () => {
        setShowAddressPopup(false)
    }

    const onPressEditCompanyProfile = () => {
        setShowEditProfileModal(true)
    }

    return (
        <div>
            <div
                className='bg-cmwhite shadow-sm text-cmGrey800 '
                style={{
                    fontFamily: 'Manrope',
                    fontSize: '14px',
                    fontWeight: '800',
                    borderRadius: '10px',
                    position: 'relative',
                }}
            >
                <CustomLoader style={{zIndex: 10}} full visible={loading} />
                <div className='d-flex flex-wrap gap-5 align-items-center justify-content-between py-5 px-10'>
                    <div className='d-flex align-items-center gap-5 text-cmGrey900'>
                        {/* <div
                            className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                            onClick={() => navigate(-1)}
                        ></div> */}
                        <div className='' style={{fontFamily: 'Manrope', fontSize: '20px'}}>
                            Edit Company Profile
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-5 text-cmGrey900'>
                        <CustomButton
                            buttonType={BUTTON_TYPE.greyText}
                            buttonLabel='Cancel'
                            buttonSize={BUTTON_SIZE.small}
                            onClick={() => navigate(-1)}
                        />

                        <CustomButton
                            buttonLabel='Save'
                            buttonSize={BUTTON_SIZE.small}
                            onClick={onSavePress}
                        />
                    </div>
                </div>
                <hr className='p-0 m-0 text-cmGrey400' />
                {/* Begins body */}
                <div
                    className='p-sm-10 p-5 text-cmGrey800'
                    style={{fontWeight: 700, fontSize: '15px'}}
                >
                    {/* Line 1 */}
                    <div className='d-sm-flex mb-10'>
                        <div className='w-sm-25'>Company Logo</div>
                        <div className='position-relative w-sm-auto w-75'>
                            <div
                                className=' d-flex align-items-center justify-content-center border  border-cmGrey500 rounded'
                                style={{width: '140px', height: '140px', overflow: 'hidden'}}
                            >
                                <CustomImage
                                    style={{width: '140px', height: '140px'}}
                                    objectFit='cover'
                                    type={IMAGE_TYPE.companyLogo}
                                    showImageError={false}
                                    customSrc={
                                        companyProfile?.logo?.name
                                            ? URL.createObjectURL(companyProfile?.logo)
                                            : getServerImage(
                                                  companyProfile?.logo,
                                                  IMAGE_TYPE.companyLogo
                                              )
                                    }
                                />
                            </div>
                            <div className='d-flex align-items-center justify-content-center gap-3 w-sm-100 ms-sm-2 position-absolute top-50 start-100 translate-middle '>
                                <div
                                    onClick={onPressEditCompanyProfile}
                                    className='bi bi-pencil-fill fs-6 py-1 px-2 text-cmGrey700 bg-white shadow-sm rounded cursor-pointer'
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Line 2 */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25 required'>Company Name</div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                errorMessage={companyProfileErrorMessages?.name}
                                placeholder='Enter company name'
                                name='name'
                                value={companyProfile?.name}
                                onChange={onChangeInputData}
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                    </div>

                    {/* Line 3*/}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25'>
                            Contact Phone<span className='required'></span>
                        </div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                value={companyProfile?.phone_number}
                                type={INPUT_TYPE.mobile}
                                onChange={onChangeInputData}
                                name='phone_number'
                                errorMessage={companyProfileErrorMessages?.phone_number}
                            />
                        </div>
                    </div>

                    {/* Line 4 */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25 required'>Business Name</div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                placeholder='Enter Business name'
                                name='business_name'
                                errorMessage={companyProfileErrorMessages?.business_name}
                                value={companyProfile?.business_name}
                                onChange={onChangeInputData}
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                    </div>

                    {/* Line 4*/}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25 required'>Company Email</div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                name='company_email'
                                value={companyProfile?.company_email}
                                errorMessage={companyProfileErrorMessages?.company_email}
                                onChange={onChangeInputData}
                                placeholder='abc@gmail.com'
                            />
                        </div>
                    </div>
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25'>Company Website</div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                name='company_website'
                                value={companyProfile?.company_website}
                                onChange={onChangeInputData}
                                placeholder='www.URL.com'
                            />
                        </div>
                    </div>
                    {/* line */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25'>Company Address</div>
                        <div className='w-sm-50 w-100'>
                            <CustomAddressInput2
                                needTimeZone
                                showAddressLine2
                                data={{
                                    ...INITIAL_ADDRESS_FIELD,
                                    full_address: companyProfile?.business_address,
                                    address_line1: companyProfile?.business_address_1,
                                    address_line2: companyProfile?.business_address_2,
                                    city: companyProfile?.business_city,
                                    state: companyProfile?.business_state,
                                    zip: companyProfile?.business_zip,
                                    lat: companyProfile?.business_lat,
                                    long: companyProfile?.business_long,
                                    time_zone: companyProfile?.business_address_time_zone,
                                }}
                                setData={(data) => {
                                    setCompanyProfile((val) => ({
                                        ...val,
                                        business_address: data?.full_address,
                                        business_address_1: data?.address_line1,
                                        business_address_2: data?.address_line2,
                                        business_city: data?.city,
                                        business_state: data?.state,
                                        business_zip: data?.zip,
                                        business_lat: data?.lat,
                                        business_long: data?.long,
                                        business_address_time_zone: data?.time_zone,
                                    }))
                                }}
                                errorMessage={companyProfileErrorMessages?.business_address}
                            />
                        </div>
                    </div>

                    {/* Line */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25 required'>Business Phone</div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                errorMessage={companyProfileErrorMessages?.business_phone}
                                value={companyProfile?.business_phone}
                                type={INPUT_TYPE.mobile}
                                onChange={onChangeInputData}
                                name='business_phone'
                                placeholder='XXXXXXXXXX'
                            />
                        </div>
                    </div>

                    {/* Mailing Address */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25'>Mailing Address</div>
                        <div className='w-sm-50 w-100'>
                            <CustomAddressInput2
                                needTimeZone
                                showAddressLine2
                                data={{
                                    ...INITIAL_ADDRESS_FIELD,
                                    full_address: companyProfile?.mailing_address,
                                    address_line1: companyProfile?.mailing_address_1,
                                    address_line2: companyProfile?.mailing_address_2,
                                    city: companyProfile?.mailing_city,
                                    state: companyProfile?.mailing_state,
                                    zip: companyProfile?.mailing_zip,
                                    lat: companyProfile?.mailing_lat,
                                    long: companyProfile?.mailing_long,
                                    time_zone: companyProfile?.mailing_address_time_zone,
                                }}
                                setData={(data) => {
                                    setCompanyProfile((val) => ({
                                        ...val,
                                        mailing_address: data?.full_address,
                                        mailing_address_1: data?.address_line1,
                                        mailing_address_2: data?.address_line2,
                                        mailing_city: data?.city,
                                        mailing_state: data?.state,
                                        mailing_zip: data?.zip,
                                        mailing_lat: data?.lat,
                                        mailing_long: data?.long,
                                        mailing_address_time_zone: data?.time_zone,
                                    }))
                                }}
                                errorMessage={companyProfileErrorMessages?.mailing_address}
                            />
                        </div>
                    </div>

                    {/* Business EIN */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25 required'>Business EIN</div>
                        <div className='w-sm-50 w-100'>
                            <CustomInput
                                value={companyProfile?.business_ein}
                                errorMessage={companyProfileErrorMessages?.business_ein}
                                onChange={onChangeInputData}
                                name='business_ein'
                                type={INPUT_TYPE.mobile}
                                mask='99-9999999'
                                placeholder='Enter business EIN'
                            />
                        </div>
                    </div>

                    {/* Line */}
                    {/* <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25'>Company Type</div>
                        <div className='w-sm-50 w-100'>
                            <CustomDropdown
                                placeholder='Select Company type'
                                value={companyProfile?.company_type}
                                name='company_type'
                                onChange={onChangeInputData}
                                options={[
                                    {name: 'Solar', value: 'Solar'},
                                    {name: 'Pest', value: 'Pest'},
                                ]}
                                searching={false}
                            />
                        </div>
                    </div> */}

                    {/* Line */}
                    <div className='d-flex align-items-baseline flex-wrap mb-10'>
                        <div className='w-sm-25'>Time Zone</div>
                        <div className='w-sm-50 w-100'>
                            <CustomDropdown
                                placeholder='Select Timezone'
                                name='time_zone'
                                value={companyProfile?.time_zone}
                                onChange={onChangeInputData}
                                options={timeZones}
                                valueKey={'text'}
                                displayKey={'text'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ManualAddressPopup
                show={showAddressPopup}
                handleClose={closeAddressPopup}
                manualData={manualAddressObj}
                onChangeInputData={onChangeInputData}
                companyProfile={companyProfile}
                setCompanyProfile={setCompanyProfile}
            />
            {showEditProfileModal ? (
                <EditProfileModal
                    show={showEditProfileModal}
                    handleClose={() => setShowEditProfileModal(false)}
                    companyProfile={companyProfile}
                    // getServerImage={getServerImage}
                    updateCompanyProfileData={updateCompanyProfileData}
                    companyProfileFilePickerRef={companyProfileFilePickerRef}
                    handleRotationChange={handleRotationChange}
                    handleZoomChange={handleZoomChange}
                    rotation={rotation}
                    zoomLevel={zoomLevel}
                />
            ) : null}
        </div>
    )
}

export default SettingsEditProfile
