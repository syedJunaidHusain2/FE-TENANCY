import {useState, useEffect} from 'react'
import {deletDepartmentService, updateDepartmentService} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomInput from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const EditDepartmentModal = ({
    show,
    handleClose,
    data,
    departmentlist,
    setLoader,
    getdepartment,
}) => {
    const [department, setDepartment] = useState(parseInt(data.parent_id))
    const [name, setName] = useState()
    const [parent, setParent] = useState()
    const updatedepartment = () => {
        var body = {
            id: data.id,
            name: name,
            parent_id: department,
        }
        if (!name) return CustomToast.error('Select Department Name')
        updateDepartmentService(body)
            .then((res) => {
                setLoader(true)
                handleClose()
                getdepartment()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }
    const deletedepartment = () => {
        var body = {
            id: data.id,
            parent_id: data.parent_id,
        }
        deletDepartmentService(body).then((res) => {
            setLoader(true)
            handleClose()
            CustomToast.success('Department Deleted Successfully')
            getdepartment()
        })
    }
    useEffect(
        function () {
            setName(data.name)
            setParent(data.parent_id)
        },
        [data]
    )

    return (
        <CustomModal show={show} onHide={handleClose} title={'Edit Department'} maxWidth='650'>
            <div className=''>
                <div className='px-lg-10'>
                    {data?.parent_id ? (
                        <div className=' px-lg-10 d-flex justify-content-center my-5'>
                            <div className='w-100'>
                                <div className=''>
                                    <CustomDropdown
                                        label={'Parent Department'}
                                        options={departmentlist}
                                        value={department}
                                        onChange={(e) => {
                                            setDepartment(e.target.value)
                                        }}
                                        name='status'
                                        valueKey='id'
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div className=' px-lg-10 d-flex justify-content-center my-5'>
                        <div className='w-100'>
                            <CustomInput
                                label={'Department Name'}
                                required
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter'
                                value={name}
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center my-5 gap-3'>
                {data?.people_count == 0 ? (
                    <CustomButton
                        buttonType={BUTTON_TYPE.error}
                        buttonLabel=' Delete'
                        onClick={() => {
                            CustomDialog.warn(
                                'Deleting this department will affect the entire software. Do you wish to continue?',
                                () => {
                                    deletedepartment()
                                }
                                // () => {}
                            )
                        }}
                    />
                ) : // <button
                //     type='button'
                //     className='btn py-2'
                //     style={{
                //         background: 'rgba(255, 51, 51, 0.1) ',
                //         color: '#FF3333',
                //         borderRadius: '6px',
                //         fontSize: '16px',
                //         borderWidth: 0,
                //     }}
                //     onClick={() => {
                //         CustomDialog.warn(
                //             'Deleting this department will affect the entire software. Do you wish to continue?',
                //             () => {
                //                 deletedepartment()
                //             }
                //             // () => {}
                //         )
                //     }}
                // >
                //     Delete
                // </button>
                null}

                <CustomButton
                    buttonType={BUTTON_TYPE.primary}
                    buttonLabel='Save'
                    onClick={updatedepartment}
                />
            </div>
        </CustomModal>
    )
}

export default EditDepartmentModal
