/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useMemo, useState} from 'react'
import {getAllStatesAndCitiesSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'

const FIELD_KEYS = {
    business_city: 'business_city',
    business_address: 'business_address',
    business_state: 'business_state',
    business_zip: 'business_zip',
    mailing_address: 'mailing_address',
    mailing_city: 'mailing_city',
    mailing_state: 'mailing_state',
    mailing_zip: 'mailing_zip',
}
const LocatonAddManualAddress = ({
    show,
    handleClose,
    stateList,
    onChangeInputData,
    locationData,
    setLocationData,
}) => {
    const allStatCity = useSelector(getAllStatesAndCitiesSelector)
    const [manualData, setManualData] = useState({
        mailing_address: null,
        mailing_city: null,
        mailing_state: null,
        mailing_zip: null,
        business_city: null,
        business_address: null,
        business_state: null,
        business_zip: null,
    })

    const cityList = useMemo(() => {
        return (
            allStatCity?.find((item) => item?.state_code == manualData?.business_state)?.cities ??
            []
        )
    }, [allStatCity, manualData?.state_id, manualData?.business_state])
    const mailingCityList = useMemo(() => {
        return (
            allStatCity?.find((item) => item?.state_code == manualData?.mailing_state)?.cities ?? []
        )
    }, [allStatCity, manualData?.mailing_state])

    const onSetManualData = (field, value) => {
        setManualData((val) => ({
            ...val,
            [field]: value,
        }))
    }
    const onSameAsBusiness = (e) => {
        let data = {...manualData}
        if (e.target.checked) {
            data['mailing_address'] = manualData?.business_address
            data['mailing_city'] = manualData?.business_city
            data['mailing_state'] = manualData?.business_state
            data['mailing_zip'] = manualData?.business_zip
        } else {
            data['mailing_address'] = ''
            data['mailing_city'] = ''
            data['mailing_state'] = ''
            data['mailing_zip'] = ''
        }
        setManualData(data)
    }

    const handleSave = (e) => {
        let data = {...locationData}
        let completeBusinessAddress = [
            manualData?.business_address,
            manualData?.business_city,
            manualData?.business_state,
            manualData?.business_zip,
        ]
            .filter(function (val) {
                return val
            })
            .join(', ')

        data['business_address'] = completeBusinessAddress
        data['business_city'] = manualData?.business_city
        data['business_state'] = manualData?.business_state
        data['business_zip'] = manualData?.business_zip
        data['mailing_address'] = manualData?.mailing_address
        data['mailing_city'] = manualData?.mailing_city
        data['mailing_state'] = manualData?.mailing_state
        data['mailing_zip'] = manualData?.mailing_zip
        setLocationData(data)
        handleClose()
    }
    const onChnageState = (e) => {
        let data = {...locationData}
        data['business_city'] = null
        setManualData(data)
        onSetManualData(e)
    }
    return (
        <CustomModal show={show} onHide={handleClose} title={'Enter Address'} maxWidth='650'>
            <div
                className='w-sm-75 mx-5 mx-sm-auto'
                style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Manrope'}}
            >
                {/* line */}
                <div className='mb-5'>
                    <CustomInput
                        label={'Business Address'}
                        placeholder='Enter Address'
                        name={FIELD_KEYS?.business_address}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                        value={manualData?.business_address}
                    />
                </div>
                {/* line */}
                <div className='row gap-sm-0  gap-5 align-items-center mb-5'>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'State'}
                            options={stateList}
                            name={FIELD_KEYS.business_state}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            value={manualData?.business_state}
                            valueKey='state_code'
                        />
                    </div>

                    <div className='col-sm'>
                        <CustomDropdown
                            label={'City'}
                            options={cityList}
                            name={FIELD_KEYS.business_city}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            value={manualData?.business_city}
                            valueKey='name'
                        />
                    </div>
                </div>
                {/* line */}
                <div className='mb-15'>
                    <CustomInput
                        label={'ZIP'}
                        type={INPUT_TYPE.number}
                        placeholder='Enter ZIP'
                        name={FIELD_KEYS.business_zip}
                        value={manualData?.business_zip}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                    />
                </div>
                {/* Mailing Address */}
                <div className='mb-5'>
                    <div className='d-flex align-items-center gap-3 justify-content-end'>
                        <div>
                            <CustomCheckbox
                                onChange={onSameAsBusiness}
                                checked={
                                    manualData?.business_address
                                        ? manualData?.business_address ===
                                          manualData?.mailing_address
                                        : false
                                }
                            />
                        </div>
                        <div
                            className=' text-cmGrey600'
                            style={{fontWeight: '600', fontSize: '12px'}}
                        >
                            Same as business address
                        </div>
                    </div>
                    <div>
                        <CustomInput
                            label={'Mailing Address'}
                            placeholder='Enter Mailing Address'
                            value={manualData?.mailing_address}
                            name={FIELD_KEYS?.mailing_address}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                        />
                    </div>
                </div>
                {/* City & State */}
                {/* line */}
                <div className='row gap-5 align-items-center mb-5 '>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'State'}
                            options={stateList}
                            name={FIELD_KEYS.mailing_state}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            value={manualData?.mailing_state}
                            valueKey='state_code'
                        />
                    </div>
                    {/* line2 */}
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'City'}
                            options={mailingCityList}
                            name={FIELD_KEYS.mailing_city}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            value={manualData?.mailing_city}
                            valueKey='name'
                        />
                    </div>
                </div>
                <div className='mb-15'>
                    <CustomInput
                        label={'ZIP'}
                        type={INPUT_TYPE.number}
                        placeholder='Enter ZIP'
                        name={FIELD_KEYS?.mailing_zip}
                        value={manualData?.mailing_zip}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                    />
                </div>

                <div className='text-center'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Add Location'
                        onClick={handleSave}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export {LocatonAddManualAddress}
