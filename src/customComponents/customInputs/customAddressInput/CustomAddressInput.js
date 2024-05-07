import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import CustomLoader from '../../customLoader/CustomLoader'
import _ from 'lodash'
import CustomInput, {
    CommonLabel,
    INPUT_TYPE,
    PrefixSuffixComponent,
} from '../customInput/CustomInput'
import {AutoComplete} from 'primereact/autocomplete'
import {getPlaceAddressService} from '../../../services/Services'
import {Button} from 'primereact/button'
import {getAllStatesAndCitiesSelector} from '../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import CustomModal from '../../customModal/CustomModal'
import CustomDropdown from '../customDropdown/CustomDropdown'
import CustomButton from '../../customButtton/CustomButton'

const CustomAddressInput = ({
    modalTitle,
    value,
    label,
    hideLabel,
    subLabel,
    name,
    required,
    placeholder = 'Enter Address',
    style,
    errorMessage = '',
    onChange,
    className,
    disabled,
    prefixText,
    suffixText,
}) => {
    const [foundAddresses, setFoundAddresses] = useState([])
    const [showManualAddressModal, setShowManualAddressModal] = useState(false)

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

    const commonProps = useMemo(
        () => ({
            className: `${className}  ${errorMessage ? 'p-invalid' : null} w-100`,
            onChange,
            value: value ?? '',
            placeholder,
            name,
            disabled,
            style: {
                fontWeight: 600,
                fontFamily: 'Manrope',
                fontSize: '14px',
                ...style,
            },
        }),
        [className, disabled, errorMessage, name, onChange, placeholder, style, value]
    )

    const onEnterManuallyPress = useCallback(() => {
        setShowManualAddressModal(true)
    }, [])

    const onHideEnterManualModal = useCallback(() => {
        setShowManualAddressModal(false)
    }, [])

    return (
        <div className={`w-100`}>
            <div className='d-flex flex-column gap-1 w-100'>
                <ManualAddressPopup
                    modalTitle={modalTitle}
                    show={showManualAddressModal}
                    handleClose={onHideEnterManualModal}
                    setAddress={(updatedAddress) => {
                        onChange({
                            target: {
                                name: name,
                                value: updatedAddress,
                            },
                        })
                    }}
                />
                <CommonLabel
                    label={label}
                    hideLabel={hideLabel}
                    subLabel={subLabel}
                    required={required}
                />
                <PrefixSuffixComponent prefixText={prefixText} suffixText={suffixText}>
                    <div className='p-inputgroup'>
                        <AutoComplete
                            {...commonProps}
                            field={'address'}
                            suggestions={foundAddresses}
                            completeMethod={searchFunc}
                            onSelect={(e) => {
                                onChange({
                                    target: {
                                        name: name,
                                        value: e?.value?.address,
                                    },
                                })
                            }}
                        />
                        <Button
                            type='button'
                            icon='bi bi-keyboard'
                            severity='secondary'
                            onClick={onEnterManuallyPress}
                        />
                    </div>
                </PrefixSuffixComponent>
            </div>
            <div className='p-error ms-2' style={{fontSize: '12px', fontFamily: 'Manrope'}}>
                {errorMessage}
            </div>
        </div>
    )
}

export default CustomAddressInput

const ManualAddressPopup = ({show, handleClose, setAddress, modalTitle = 'Set Address'}) => {
    const [manualData, setManualData] = useState({
        address: null,
        city: null,
        state: null,
        zip: null,
    })

    const allStatCity = useSelector(getAllStatesAndCitiesSelector)

    const cityList = useMemo(() => {
        return allStatCity?.find((item) => item?.state_code == manualData?.state)?.cities ?? []
    }, [allStatCity, manualData?.state])

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

    const onSaveData = (e) => {
        let completeAddress = [
            manualData?.address,
            manualData?.city,
            manualData?.state,
            manualData?.zip,
        ]
            .filter(function (val) {
                return val
            })
            .join(', ')
        setAddress(completeAddress)
        handleClose()

        setManualData({
            address: null,
            city: null,
            state: null,
            zip: null,
        })
    }

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='500' title={modalTitle}>
            <div
                className='mx-5 mx-sm-auto'
                style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Manrope'}}
            >
                {/* line */}
                <div className='mb-5'>
                    <CustomInput
                        label={'Address'}
                        placeholder='Set Address'
                        name='address'
                        value={manualData?.address}
                        onChange={onChangeInputData}
                    />
                </div>
                {/* line */}
                <div className='row gap-sm-0 gap-5 align-items-center mb-5 '>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'State'}
                            name='state'
                            value={manualData?.state}
                            onChange={onChangeInputData}
                            placeholder='Select State'
                            options={allStatCity}
                            valueKey='state_code'
                        />
                    </div>
                    <div className='col-sm'>
                        <CustomDropdown
                            label={'City'}
                            name='city'
                            value={manualData?.city}
                            onChange={onChangeInputData}
                            placeholder='Select City'
                            options={cityList}
                            valueKey='name'
                        />
                    </div>
                </div>
                {/* line */}
                <div className='mb-15'>
                    <CustomInput
                        label={'zip'}
                        type={INPUT_TYPE.number}
                        placeholder='Enter ZIP'
                        name='zip'
                        value={manualData?.zip}
                        onChange={onChangeInputData}
                    />
                </div>

                <div className='text-center'>
                    <CustomButton buttonLabel={modalTitle} onClick={onSaveData} />
                </div>
            </div>
        </CustomModal>
    )
}
