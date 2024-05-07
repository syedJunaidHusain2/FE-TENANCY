import React, {useCallback, useEffect, useState} from 'react'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton from '../../../../../customComponents/customButtton/CustomButton'
import {changePasswordService} from '../../../../../services/Services'
import useValidation from '../../../../../hooks/useValidation'
import {changePasswordValidation} from '../../../../../validations/validations'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'

const ChangePasswordModal = ({handleClose, show}) => {
    const [validatePasswordData, changePasswordErrorData] = useValidation()
    const [loader, setLoader] = useState(false)
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    useEffect(() => {
        if (changePasswordErrorData?.beginValidating) {
            validatePasswordData(changePasswordValidation(passwordData))
        }
    }, [passwordData])

    const onChangeInputData = useCallback((e) => {
        if (!/\s/.test(e?.target?.value)) {
            // If no spaces are found, update the state
            setPasswordData((val) => ({
                ...val,
                [e?.target?.name]: e?.target?.value,
            }))
        }
    }, [])

    const onChangePassword = () => {
        const body = {
            old_password: passwordData.oldPassword,
            new_password: passwordData.newPassword,
        }
        validatePasswordData(changePasswordValidation(passwordData)).then((res) => {
            if (res.isValidate) {
                setLoader(true)
                changePasswordService(body)
                    .then(() => {
                        handleClose()
                        CustomToast.success('Password has been changed successfully')
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setLoader(false)
                    })
            }
        })
    }

    return (
        <CustomModal show={show} onHide={handleClose} title={'Change Password'} maxWidth='550'>
            <div className='w-sm-75 mx-auto py-10'>
                <div className='mb-5'>
                    <CustomInput
                        type={INPUT_TYPE.password}
                        label={'Old Password'}
                        placeholder='Enter Old Password'
                        onChange={onChangeInputData}
                        name='oldPassword'
                        value={passwordData?.oldPassword}
                        errorMessage={changePasswordErrorData?.oldPassword}
                    />
                </div>
                <div className='mb-5'>
                    <CustomInput
                        type={INPUT_TYPE.password}
                        label={'New Password'}
                        placeholder='Enter New Password'
                        onChange={onChangeInputData}
                        name='newPassword'
                        value={passwordData?.newPassword}
                        errorMessage={changePasswordErrorData?.newPassword}
                    />
                </div>
                <div className='mb-5'>
                    <CustomInput
                        type={INPUT_TYPE.password}
                        label={'Confirm Password'}
                        placeholder='Enter Password'
                        onChange={onChangeInputData}
                        name='confirmPassword'
                        value={passwordData?.confirmPassword}
                        errorMessage={changePasswordErrorData?.confirmPassword}
                    />
                </div>

                <div className='text-center mt-15'>
                    <CustomButton
                        buttonLabel='Change Password'
                        padding={'px-20'}
                        onClick={onChangePassword}
                        loading={loader}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default ChangePasswordModal
