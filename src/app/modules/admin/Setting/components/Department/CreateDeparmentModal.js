import {useState, useEffect} from 'react'
import {
    AddDepartmentService,
    getDepartmentDropdownService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomInput from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateDepartmentModal = ({show, handleClose, setLoader, getdepartment}) => {
    const [departmentlist, setDepartmentList] = useState([])
    const [loading, setLoading] = useState(false)
    const [department, setDepartment] = useState()
    const [name, setName] = useState()
    const adddepartment = (e) => {
        e.preventDefault()
        var body = {
            name: name,
            parent_id: department,
        }
        if (!name) return CustomToast.error('Enter name')
        setLoading(true)
        AddDepartmentService(body)
            .then((res) => {
                setLoader(true)
                handleClose()
                CustomToast.success('Deparment Added Successfully')
                getdepartment()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoading(false))
    }
    useEffect(function () {
        getDepartmentDropdownService().then((res) => {
            setDepartmentList(res.data?.filter((item) => !item?.parent_id))
        })
    }, [])

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='550' title={'New Department'}>
            <CustomLoader visible={loading} full />

            {/* <div className='modal-header '></div> */}
            <form onSubmit={adddepartment} className='w-75 mx-auto'>
                <div className='mb-10'>
                    <div className='  '>
                        <div className='mb-5 mb-sm-0 d-flex justify-content-center'>
                            <div className='mb-sm-10 mb-5 row d-flex w-500px justify-content-center'>
                                <div className='col text-cmGrey700'>
                                    <CustomDropdown
                                        label={'Parent Department'}
                                        options={departmentlist}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        name='status'
                                        value={department}
                                        valueKey='id'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='  d-flex justify-content-center'>
                            <div className='row d-flex w-500px justify-content-center'>
                                <div className='col '>
                                    <CustomInput
                                        label={'Department Name'}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Enter Department Name'
                                        rejex={/^[\w\-\s]+$/}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-5 '>
                    <CustomButton
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Create'
                        padding={'px-20'}
                        onClick={adddepartment}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export {CreateDepartmentModal}
