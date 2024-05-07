import React, {useEffect, useState} from 'react'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import Edit from '../../admin/sequidocs/Icon/edit.png'
import {
    getEmployeeProfileService,
    updateEmployeeProfileService,
    updateOnBoardingEmployeeDetailService,
} from '../../../../services/Services'
import {BANKING_TYPE_OF_ACCOUNT, getValidDate} from '../../../../constants/constants'
import AccessRights from '../../../../accessRights/AccessRights'
import useCustomAccessRights from '../../../../accessRights/useCustomAccessRights'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import {
    convertToMaskedNumber,
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
    getTextForSecurity,
} from '../../../../helpers/CommonHelpers'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import {getUserProfileAction} from '../../../../redux/actions/AuthActions'
import {useDispatch} from 'react-redux'
import CustomEditIcon from '../../../../customComponents/customIcons/CustomEditIcon'
import {HIRE_FIELD_KEYS} from '../../employee/components/EmployeePageBody'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const ProfilePersonalBanking = ({employeeData, getBankData}) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [bankingData, setBankingData] = useState(employeeData)

    const {employeeProfileAccess} = useCustomAccessRights({employeeData})
    useEffect(() => {
        setBankingData(employeeData)
    }, [employeeData, edit])

    const updateAdditionalBankingData = (e) => {
        setBankingData((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }

    const onSavePress = (e) => {
        if (!bankingData?.name_of_bank) return CustomToast.error('Enter bank name')
        if (!bankingData?.routing_no) return CustomToast.error('Enter routing number')
        if (!bankingData?.account_no) {
            return CustomToast.error('Enter bank account number')
        } else if (!bankingData?.confirm_account_no)
            return CustomToast.error('Please confirm your account number')
        else if (bankingData?.confirm_account_no != bankingData?.account_no) {
            return CustomToast.error('Account number mismatched')
        }
        if (!bankingData?.account_name) return CustomToast.error('Enter account name')
        if (!bankingData?.type_of_account) return CustomToast.error('Enter type of account')
        const body = {
            ...bankingData,
            user_id: bankingData?.id ?? '',
            name_of_bank: bankingData?.name_of_bank ?? '',
            routing_no: bankingData?.routing_no ?? '',
            account_no: bankingData?.account_no ?? '',
            confirm_account_no: bankingData?.confirm_account_no ?? '',
            account_name: bankingData?.account_name ?? '',
            type_of_account: bankingData?.type_of_account ?? '',
        }
        setLoading(true)
        updateEmployeeProfileService(body)
            .then(() => {
                getBankData()
                dispatch(getUserProfileAction())
                setEdit(false)
                CustomToast.success('Bank info updated')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className='card shadow h-auto' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                <div className='py-5 card w-100'>
                    <CustomLoader full visible={loading} />
                    {/* <div className='ms-11 form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid my-3'></div> */}
                    <div className='d-flex mx-10 align-items-center justify-content-between '>
                        <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '16px'}}>
                            Banking Info
                        </div>
                        <AccessRights customCondition={employeeProfileAccess.editBankingInfoAccess}>
                            {!edit ? (
                                <CustomEditIcon onClick={() => setEdit(true)} />
                            ) : (
                                <div className='d-flex gap-4'>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.greyText}
                                        buttonLabel='Cancel'
                                        buttonSize={BUTTON_SIZE.small}
                                        onClick={() => setEdit(false)}
                                    />
                                    <CustomButton
                                        buttonLabel='Save'
                                        buttonSize={BUTTON_SIZE.small}
                                        onClick={onSavePress}
                                    />
                                </div>
                            )}
                        </AccessRights>
                    </div>
                    <div className='border-bottom border-cmGrey300 mt-5' />
                    <>
                        <div className=''>
                            {/* first line */}
                            <div
                                className='justify-content-evenly py-4 px-sm-20 px-10 stripRow'
                                style={{fontWeight: 600}}
                            >
                                <div className='row w-75 ms-sm-10 align-items-center'>
                                    <div className='text-cmGrey600  col-xl-4 col-sm-6 '>
                                        Name of Bank:
                                    </div>
                                    <div className='text-cmgrey900 col-sm'>
                                        {edit ? (
                                            <CustomInput
                                                name={'name_of_bank'}
                                                value={bankingData?.name_of_bank}
                                                onChange={updateAdditionalBankingData}
                                                placeholder='Enter Name of Bank'
                                            />
                                        ) : (
                                            employeeData?.name_of_bank ?? '-'
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Third line */}
                            <div
                                className='justify-content-evenly py-4 stripRow px-sm-20 px-10 stripRow '
                                style={{fontWeight: 600}}
                            >
                                <div className='row w-75 ms-sm-10 align-items-center'>
                                    <div className='text-cmGrey600 col-xl-4 col-sm-6'>
                                        Account Number:
                                    </div>
                                    <div className='text-cmgrey900 col-sm'>
                                        {edit ? (
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                name={'account_no'}
                                                value={bankingData?.account_no}
                                                onChange={updateAdditionalBankingData}
                                                placeholder='Enter Account Number'
                                            />
                                        ) : (
                                            <>
                                                {employeeData?.account_no ? (
                                                    <>{employeeData?.account_no}</>
                                                ) : (
                                                    '-'
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* 4 line */}
                            {edit ? (
                                <div
                                    className='justify-content-evenly py-4 stripRow px-sm-20 px-10 stripRow '
                                    style={{fontWeight: 600}}
                                >
                                    <div className='row w-75 ms-sm-10 align-items-center'>
                                        <div className='text-cmGrey600 col-xl-4 col-sm-6'>
                                            Confirm Account Number:
                                        </div>
                                        <div className='text-cmGrey900 col-sm'>
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                name={'confirm_account_no'}
                                                value={bankingData?.confirm_account_no}
                                                onChange={updateAdditionalBankingData}
                                                placeholder='Enter Account Number'
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* 5 line */}
                            {/* <div
                                className='justify-content-evenly py-4 stripRow px-sm-20 px-10 stripRow '
                                style={{fontWeight: 600}}
                            >
                                <div className='row w-75 ms-sm-10 align-items-center'>
                                    <div className='text-cmGrey600 col-xl-4 col-sm-6'>
                                      Confirm  Account Number:
                                    </div>
                                    <div className='text-cmgrey900 col-sm'>
                                        {edit ? (
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                name={'account_no'}
                                                value={bankingData?.account_no}
                                                onChange={updateAdditionalBankingData}
                                                placeholder='Enter Account Number'
                                            />
                                        ) : (
                                            <>
                                                {employeeData?.account_no ? (
                                                    <>{employeeData?.account_no}</>
                                                ) : (
                                                    '-'
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div> */}

                            {/* 6 line */}
                            <div
                                className='justify-content-evenly py-4 px-sm-20 px-10 stripRow'
                                style={{fontWeight: 600}}
                            >
                                <div className='row w-75 ms-sm-10 align-items-center'>
                                    <div className='text-cmGrey600 col-xl-4 col-sm-6'>
                                        Routing Number:
                                    </div>
                                    <div className='text-cmgrey900 col-sm'>
                                        {edit ? (
                                            <CustomInput
                                                name={'routing_no'}
                                                value={bankingData?.routing_no}
                                                onChange={updateAdditionalBankingData}
                                                placeholder='Enter Routing Number'
                                                type={INPUT_TYPE.mobile}
                                                mask='999999999'
                                            />
                                        ) : (
                                            <>
                                                {employeeData?.routing_no ? (
                                                    <>
                                                        {convertToMaskedNumber(
                                                            employeeData?.routing_no,
                                                            9
                                                        )}
                                                        {/* xxxxxx
                                                        {getTextForSecurity(
                                                            employeeData?.routing_no
                                                        )} */}
                                                    </>
                                                ) : (
                                                    '-'
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className='justify-content-evenly py-4 stripRow px-sm-20 px-10 stripRow '
                                style={{fontWeight: 600}}
                            >
                                <div className='row w-75 ms-sm-10 align-items-center'>
                                    <div className='text-cmGrey600 col-xl-4 col-sm-6'>
                                        Account Name:
                                    </div>
                                    <div className='text-cmgrey900 col-sm'>
                                        {edit ? (
                                            <CustomInput
                                                name={'account_name'}
                                                value={bankingData?.account_name}
                                                onChange={updateAdditionalBankingData}
                                                placeholder='Enter Account Name'
                                            />
                                        ) : (
                                            <>
                                                {employeeData?.account_name
                                                    ? employeeData?.account_name
                                                    : '-'}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* 7 line */}
                            <div
                                className='justify-content-evenly py-4 px-sm-20 px-10 stripRow'
                                style={{fontWeight: 600}}
                            >
                                <div className='row w-75 ms-sm-10 align-items-center'>
                                    <div className='text-cmGrey600 col-xl-4 col-sm-6'>
                                        Type of Account:
                                    </div>
                                    <div className='text-cmgrey900 col-sm'>
                                        {edit ? (
                                            <CustomDropdown
                                                name={HIRE_FIELD_KEYS.type_of_account}
                                                value={bankingData?.type_of_account}
                                                onChange={updateAdditionalBankingData}
                                                searching={false}
                                                options={BANKING_TYPE_OF_ACCOUNT}
                                            />
                                        ) : (
                                            employeeData?.type_of_account ?? '-'
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default ProfilePersonalBanking
