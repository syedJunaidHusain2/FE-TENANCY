import {useState, useEffect} from 'react'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import _ from 'lodash'
import {updateEmployeeProfileService} from '../../../../services/Services'
import {BUSINESS_TYPE} from '../../../../constants/constants'
import AccessRights from '../../../../accessRights/AccessRights'
import useCustomAccessRights from '../../../../accessRights/useCustomAccessRights'
import {
    getDataWithoutMask,
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
    getTextForSecurity,
} from '../../../../helpers/CommonHelpers'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import {getUserProfileAction} from '../../../../redux/actions/AuthActions'
import {useDispatch} from 'react-redux'
import CustomEditIcon from '../../../../customComponents/customIcons/CustomEditIcon'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const ProfilePersonalTax = ({getEmployeeProfile, employeeData}) => {
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [taxData, setTaxData] = useState(employeeData)
    const dispatch = useDispatch()

    const {employeeProfileAccess} = useCustomAccessRights({employeeData})

    useEffect(() => {
        setTaxData(employeeData)
    }, [employeeData, edit])

    const updateAdditionalTaxData = (e) => {
        setTaxData((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }

    const onSavePress = (e) => {
        if (!taxData?.entity_type) return CustomToast.error('Select entity type')
        if (taxData?.entity_type == 'individual') {
            if (!taxData?.social_sequrity_no) return CustomToast.error('Enter SSN')
        } else if (taxData?.entity_type == 'business') {
            if (!taxData?.business_name) return CustomToast.error('Enter Business Name')
            if (!taxData?.business_type) return CustomToast.error('Select Business Type')
            if (!taxData?.business_ein) return CustomToast.error('Enter EIN')
        }
        let body = {
            ...taxData,
            user_id: taxData?.id ?? '',
            entity_type: taxData?.entity_type ?? '',
            social_sequrity_no:
                taxData?.entity_type == 'individual'
                    ? getDataWithoutMask(taxData?.social_sequrity_no)
                    : '',
            business_name: taxData?.entity_type == 'business' ? taxData?.business_name : '',
            business_type: taxData?.entity_type == 'business' ? taxData?.business_type : '',
            business_ein:
                taxData?.entity_type == 'business' ? getDataWithoutMask(taxData?.business_ein) : '',
        }
        setLoading(true)
        updateEmployeeProfileService(body)
            .then(() => {
                getEmployeeProfile()
                dispatch(getUserProfileAction())
                setEdit(false)
                CustomToast.success('Tax info updated')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className='card shadow h-auto' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                <div className='card w-100'>
                    <CustomLoader full visible={loading} />
                    {/* <div className='ms-11 form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid my-3'></div> */}
                    <div className='d-flex mx-10 py-4 px-5 align-items-center justify-content-between '>
                        <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '16px'}}>
                            Tax Info
                        </div>
                        <AccessRights customCondition={employeeProfileAccess.editTaxInfoAccess}>
                            {!edit ? (
                                <CustomEditIcon onClick={() => setEdit(true)} />
                            ) : (
                                <div className='d-flex gap-4'>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.greyText}
                                        buttonSize={BUTTON_SIZE.small}
                                        buttonLabel='Cancel'
                                        onClick={() => setEdit(false)}
                                    />
                                    <CustomButton
                                        buttonSize={BUTTON_SIZE.small}
                                        buttonLabel='Save'
                                        onClick={onSavePress}
                                    />
                                </div>
                            )}
                        </AccessRights>
                    </div>
                    <div className='border-bottom border-cmGrey300 ' />
                    <>
                        <div className=''>
                            {/* first line */}
                            <div className='stripRow py-4 px-sm-20 px-10' style={{fontWeight: 600}}>
                                <div className='row w-sm-100 '>
                                    <div
                                        className='col-xl-3 col-sm text-cmGrey600'
                                        style={{alignSelf: 'center'}}
                                    >
                                        Entity Type:
                                    </div>
                                    <div className='col-sm text-cmGrey900'>
                                        {edit ? (
                                            <CustomDropdown
                                                value={taxData?.entity_type}
                                                onChange={updateAdditionalTaxData}
                                                name={'entity_type'}
                                                options={[
                                                    {name: 'Individual', value: 'individual'},
                                                    {name: 'Business', value: 'business'},
                                                ]}
                                            />
                                        ) : (
                                            _.upperFirst(employeeData?.entity_type) ?? '-'
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* first line */}
                            {(edit ? taxData?.entity_type : employeeData?.entity_type) ==
                            'individual' ? (
                                <div
                                    className='stripRow  py-4 px-sm-20 px-10'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='row w-sm-100 '>
                                        <div
                                            className='col-xl-3 col-sm text-cmGrey600'
                                            style={{alignSelf: 'center'}}
                                        >
                                            {' '}
                                            Social Security Number:
                                        </div>
                                        <div className=' col-sm text-cmGrey900'>
                                            {edit ? (
                                                <CustomInput
                                                    type={INPUT_TYPE.mobile}
                                                    name={'social_sequrity_no'}
                                                    value={taxData?.social_sequrity_no}
                                                    onChange={updateAdditionalTaxData}
                                                    placeholder='Enter Social Sequrity No'
                                                    mask='999-99-9999'
                                                />
                                            ) : (
                                                <>
                                                    {employeeData?.social_sequrity_no ? (
                                                        <>
                                                            xxx-xx-
                                                            {getTextForSecurity(
                                                                employeeData?.social_sequrity_no
                                                            )}
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* Second line */}
                            {(edit ? taxData?.entity_type : employeeData?.entity_type) ==
                            'business' ? (
                                <>
                                    {/* Business Name */}
                                    <div
                                        className=' py-5 px-sm-20 px-10 stripRow'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='row w-sm-100 align-items-center '>
                                            <div className='text-cmGrey600 col-xl-3 col-sm'>
                                                {' '}
                                                Business Name:
                                            </div>{' '}
                                            <div className='text-cmGrey900 col-sm'>
                                                {edit ? (
                                                    <CustomInput
                                                        name={'business_name'}
                                                        value={taxData?.business_name}
                                                        onChange={updateAdditionalTaxData}
                                                        placeholder='Enter Business Name'
                                                    />
                                                ) : (
                                                    employeeData?.business_name ?? '-'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Business Type */}
                                    <div
                                        className='py-5 px-sm-20 px-10 stripRow'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='row align-items-center w-sm-100 '>
                                            <div className='text-cmGrey600 col-xl-3 col-sm'>
                                                {' '}
                                                Business Type:
                                            </div>{' '}
                                            <div className='text-cmGrey900 col-sm'>
                                                {edit ? (
                                                    <CustomDropdown
                                                        value={taxData?.business_type}
                                                        onChange={updateAdditionalTaxData}
                                                        name={'business_type'}
                                                        options={BUSINESS_TYPE}
                                                    />
                                                ) : (
                                                    employeeData?.business_type ?? '-'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Business EIN */}
                                    <div
                                        className='py-5 px-sm-20 px-10 stripRow'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='row align-items-center w-sm-100 '>
                                            <div className='text-cmGrey600 col-xl-3 col-sm'>
                                                EIN:
                                            </div>
                                            <div className='text-cmGrey900 col-sm'>
                                                {edit ? (
                                                    <CustomInput
                                                        type={INPUT_TYPE.mobile}
                                                        name={'business_ein'}
                                                        value={taxData?.business_ein}
                                                        onChange={updateAdditionalTaxData}
                                                        placeholder='Enter EIN'
                                                        mask='99-9999999'
                                                    />
                                                ) : (
                                                    <>
                                                        {employeeData?.business_ein ? (
                                                            <>
                                                                xx-xxx
                                                                {getTextForSecurity(
                                                                    employeeData?.business_ein
                                                                )}
                                                            </>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                            {/* Third line */}
                        </div>
                    </>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default ProfilePersonalTax
