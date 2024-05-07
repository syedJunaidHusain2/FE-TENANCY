import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomButton, {BUTTON_SIZE} from '../../../../../customComponents/customButtton/CustomButton'
import {updateBusinessAddressListService} from '../../../../../services/Services'
import {
    EDIT_ADDRESS_VALIDATION_FIELD,
    editAddressValidation,
} from '../../../../../validations/validations'
import {getErrorMessageFromResponse, isEmptyObjectValue} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {City, Country, State} from 'country-state-city'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'

const EditBillingModal = ({show, handleClose, type, getAddressesData, editableData, fieldKeys}) => {
    const [errorData, setErrorData] = useState(EDIT_ADDRESS_VALIDATION_FIELD)

    const [loading, setLoading] = useState(false)
    const [addressBodyData, setAddressBodyData] = useState({
        ...editableData,
    })

    const onChangeInputData = (e) => {
        setAddressBodyData((val) => ({
            ...val,
            [e.target.name]: e.target.value,
        }))
    }
    const updateAddress = useCallback(() => {
        const body = {
            ...addressBodyData,
        }
        const validationErrors = editAddressValidation(body, fieldKeys)
        setErrorData(validationErrors)
        isEmptyObjectValue(validationErrors)

        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            updateBusinessAddressListService(body)
                .then(() => {
                    getAddressesData()
                    CustomToast.success(`${type} Address Updated`)
                    handleClose()
                })
                .finally(() => {
                    setLoading(false)
                })
                .catch((error) => {
                    CustomToast.error(getErrorMessageFromResponse(error))
                })
        }
    }, [addressBodyData, fieldKeys, getAddressesData, handleClose, type])

    const countryList = useMemo(() => {
        return Country.getAllCountries().map((country) => ({
            value: country.isoCode,
            displayValue: `${country.name} - ${country.isoCode}`,
        }))
    }, [])
    const stateList = useMemo(() => {
        return State.getStatesOfCountry(addressBodyData?.country).map((state) => ({
            value: state.isoCode,
            displayValue: `${state.name} - ${state.isoCode}`,
        }))
    }, [addressBodyData?.country])

    const cityList = useMemo(() => {
        return City.getCitiesOfState(
            addressBodyData?.country,
            addressBodyData?.[fieldKeys?.state]
        ).map((city) => ({
            value: city.name,
            displayValue: city.name,
        }))
    }, [addressBodyData, fieldKeys?.state])

    return (
        <CustomModal maxWidth='850' show={show} onHide={handleClose} title={`Edit ${type} Address`}>
            <CustomLoader full visible={loading} />

            <div className='w-sm-50 mx-auto'>
                <form onSubmit={handleClose}>
                    <div className='mb-10'>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Company Name'}
                                required
                                name={fieldKeys?.name}
                                onChange={onChangeInputData}
                                value={addressBodyData?.name}
                                errorMessage={errorData?.name}
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomDropdown
                                label={'Country'}
                                required
                                options={countryList}
                                name={fieldKeys?.country}
                                onChange={onChangeInputData}
                                displayKey='displayValue'
                                value={addressBodyData?.country}
                                errorMessage={errorData?.country}
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomDropdown
                                label={'State'}
                                required
                                options={stateList}
                                name={fieldKeys?.state}
                                onChange={onChangeInputData}
                                value={addressBodyData?.[fieldKeys?.state]}
                                displayKey='displayValue'
                                errorMessage={errorData?.state}
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Address 1'}
                                required
                                name={fieldKeys?.address1}
                                onChange={onChangeInputData}
                                value={addressBodyData?.[fieldKeys?.address1]}
                                errorMessage={errorData?.address1}
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Address 2'}
                                name={fieldKeys?.address2}
                                onChange={onChangeInputData}
                                value={addressBodyData?.[fieldKeys?.address2]}
                            />
                        </div>
                        <div className='mb-5 row'>
                            <div className='col-sm'>
                                <CustomDropdown
                                    required
                                    label={'City'}
                                    options={cityList}
                                    name={fieldKeys?.city}
                                    onChange={onChangeInputData}
                                    value={addressBodyData?.[fieldKeys?.city]}
                                    errorMessage={errorData?.city}
                                    displayKey='displayValue'
                                />
                                {/* <CustomInput label={'State'} required name={fieldKeys?.state} onChange={onChangeInputData} value={addressBodyData?.[fieldKeys?.state]}/> */}
                            </div>
                            <div className='col-sm'>
                                <CustomInput
                                    label={'Postal code'}
                                    required
                                    name={fieldKeys?.zip}
                                    onChange={onChangeInputData}
                                    value={addressBodyData?.[fieldKeys?.zip]}
                                    errorMessage={errorData?.zip}
                                />
                            </div>
                        </div>
                        <div className='text-nowrap'>
                            <CustomInput
                                label={'EIN'}
                                subLabel={true}
                                subLabelClass='bi bi-info-circle'
                                type={INPUT_TYPE.number}
                                name={fieldKeys?.ein}
                                onChange={onChangeInputData}
                                value={addressBodyData?.[fieldKeys?.ein]}
                            />
                        </div>
                    </div>
                    <div className='text-center'>
                        <CustomButton
                            buttonLabel='Save Address'
                            buttonSize={BUTTON_SIZE.large}
                            onClick={updateAddress}
                        />
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default EditBillingModal
