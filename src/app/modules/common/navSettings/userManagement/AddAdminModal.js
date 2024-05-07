import React, {useCallback, useEffect, useState} from 'react'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomButton from '../../../../../customComponents/customButtton/CustomButton'
import {getMobileNumberWithoutMask} from '../../../../../helpers/CommonHelpers'
import {useSelector} from 'react-redux'
import {getPermissionsGroupListSelector} from '../../../../../redux/selectors/PermissionsSelectors'
import {addNewAdminService} from '../../../../../services/Services'
import useValidation from '../../../../../hooks/useValidation'
import { addAdminValidation } from '../../../../../validations/validations'
import { getPermissionGroupListAction } from '../../../../../redux/actions/PermissionsActions'
import { useDispatch } from 'react-redux'

const AddAdminModal = ({show, handleClose}) => {
    const groupList = useSelector(getPermissionsGroupListSelector)
    const [validateAdminData, adminErrorData] = useValidation()
    const dispatch = useDispatch()

    const [addAdminBody, setAddAdminBody] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        permission: '',
    })
    useEffect(()=>{
        dispatch(getPermissionGroupListAction())

    },[])
    useEffect(() => {
        if (adminErrorData?.beginValidating) {
            validateAdminData(
                addAdminValidation(addAdminBody)
            )
        }
    }, [addAdminBody])
    const onChangeInputData = useCallback((e) => {
        setAddAdminBody((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }, [])

    const addAdmin = () => {
        const body = {...addAdminBody}
        body.phone_number = getMobileNumberWithoutMask(body?.phone_number)
        validateAdminData(
            addAdminValidation(body)
        ).then((res)=>{
            if (res.isValidate) {
                addNewAdminService(body).then(() => handleClose())

            }
        })
        return
    }

    return (
        <CustomModal show={show} onHide={handleClose} title={'Add Admin'} maxWidth='950'>
            <div className='w-sm-50 mx-auto py-10'>
                <div className='row gap-5 mb-5'>
                    <div className='col'>
                        <CustomInput
                            label={'First Name'}
                            placeholder='Enter your first name'
                            onChange={onChangeInputData}
                            name='first_name'
                            value={addAdminBody?.first_name}
                            errorMessage={adminErrorData?.firstName}

                        />
                    </div>
                    <div className='col'>
                        <CustomInput
                            label={'Last Name'}
                            placeholder='Enter your last name'
                            onChange={onChangeInputData}
                            name='last_name'
                            value={addAdminBody?.last_name}
                            errorMessage={adminErrorData?.lastName}

                        />
                    </div>
                </div>
                <div className='mb-5'>
                    <CustomInput
                        type={INPUT_TYPE.email}
                        label={'Email Id'}
                        placeholder='Enter Email Id'
                        subLabel={'(Verfication is required)'}
                        onChange={onChangeInputData}
                        name='email'
                        value={addAdminBody?.email}
                        errorMessage={adminErrorData?.email}

                    />
                </div>
                <div className='mb-5'>
                    <CustomInput
                        type={INPUT_TYPE.mobile}
                        label={'Phone Number'}
                        placeholder='Enter Phone Number'
                        onChange={onChangeInputData}
                        name='phone_number'
                        value={addAdminBody?.phone_number}
                        errorMessage={adminErrorData?.phoneNumber}

                    />
                </div>
                <div className='mb-5'>
                    <CustomDropdown
                        label={'Permission'}
                        options={groupList}
                        valueKey={'group_id'}
                        displayKey='group_name'
                        name={'permission'}
                        value={addAdminBody?.permission}
                        onChange={onChangeInputData}
                        errorMessage={adminErrorData?.permissions}

                    />
                </div>
                <div
                    className='text-cmGrey700 mb-10'
                    style={{fontSize: 14, fontFamily: fontsFamily.manrope, fontWeight: 600}}
                >
                    Only individuals with Company Admin privileges are authorized to add and remove
                    Superadmins and admins.
                </div>
                <div className='text-center'>
                    <CustomButton buttonLabel='Send Invite' padding={'px-20'} onClick={addAdmin} />
                </div>
            </div>
        </CustomModal>
    )
}

export default AddAdminModal
