/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef, useCallback, useMemo} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {getAllStatesAndCitiesSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../customComponents/customCheckbox/CustomCheckbox'

const modalsRoot = document.getElementById('root-modals') || document.body

const ManualAddressPopup = ({
    show,
    handleClose,
    setCompanyProfile,
    onChangeInputData,
    companyProfile,
}) => {
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
    const allStatCity = useSelector(getAllStatesAndCitiesSelector)

    const cityList = useMemo(() => {
        return (
            allStatCity?.find((item) => item?.state_code == manualData?.business_state)?.cities ??
            []
        )
    }, [allStatCity, manualData?.business_state])

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
    const onSaveData = (e) => {
        let data = {...companyProfile}
        let completeAddress = [
            manualData?.business_address,
            manualData?.business_city,
            manualData?.business_state,
            manualData?.business_zip,
        ]
            .filter(function (val) {
                return val
            })
            .join(', ')
        let completeMailingAddress = [
            manualData?.mailing_address,
            manualData?.mailing_city,
            manualData?.mailing_state,
            manualData?.mailing_zip,
        ]
            .filter(function (val) {
                return val
            })
            .join(', ')
        data['business_address'] = completeAddress
        data['business_city'] = manualData?.business_city
        data['business_state'] = manualData?.business_state
        data['business_zip'] = manualData?.business_zip
        data['mailing_address'] = completeMailingAddress
        data['mailing_city'] = manualData?.mailing_city
        data['mailing_state'] = manualData?.mailing_state
        data['mailing_zip'] = manualData?.mailing_zip
        setCompanyProfile(data)
        handleClose()
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='1000' title='Enter Address'>
            {/* body */}
            <div
                className='w-sm-50 mx-5 mx-sm-auto'
                style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Manrope'}}
            >
                {/* line */}
                <div className='mb-5'>
                    <CustomInput
                        label={'Business Address'}
                        placeholder='Enter Address'
                        name='business_address'
                        value={manualData?.business_address}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                    />
                </div>
                {/* line */}
                <div className='row gap-sm-0 gap-5 align-items-center mb-5 '>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'State'}
                            name='business_state'
                            value={manualData?.business_state}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            placeholder='Select State'
                            options={allStatCity}
                            valueKey='state_code'
                        />
                    </div>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'City'}
                            name='business_city'
                            value={manualData?.business_city}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            placeholder='Select City'
                            options={cityList}
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
                        name='business_zip'
                        value={manualData?.business_zip}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                    />
                </div>
                {/* Mailing Address */}
                <div className='mb-5'>
                    <div className='d-flex align-items-center justify-content-end gap-3'>
                        <CustomCheckbox
                            onChange={onSameAsBusiness}
                            checked={manualData?.business_address == manualData?.mailing_address}
                        />
                        <label
                            className=' text-cmGrey600'
                            style={{fontWeight: '600', fontSize: '12px'}}
                        >
                            Same as business address
                        </label>
                    </div>

                    <CustomInput
                        label={'Mailing Address'}
                        placeholder='Enter Mailing Address'
                        name='mailing_address'
                        value={manualData?.mailing_address}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                    />
                </div>
                {/* City & State */}
                {/* line */}
                <div className='row align-items-center gap-sm-0 gap-5 mb-5 '>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'State'}
                            name='mailing_state'
                            value={manualData?.mailing_state}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            placeholder='Select State'
                            options={allStatCity}
                            valueKey='state_code'
                        />
                    </div>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'City'}
                            name='mailing_city'
                            value={manualData?.mailing_city}
                            onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                            placeholder='Select City'
                            options={mailingCityList}
                            valueKey='name'
                        />
                    </div>
                </div>
                <div className='mb-15'>
                    <CustomInput
                        label={'ZIP'}
                        type={INPUT_TYPE.number}
                        placeholder='Enter ZIP'
                        name='mailing_zip'
                        value={manualData?.mailing_zip}
                        onChange={(e) => onSetManualData(e.target.name, e.target.value)}
                    />
                </div>

                <div className='text-center'>
                    <div
                        className='btn bg-cmBlue-Crayola text-cmwhite px-10 py-2'
                        style={{fontWeight: 700, fontSize: '16px'}}
                        onClick={onSaveData}
                    >
                        Save
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}

export {ManualAddressPopup}
