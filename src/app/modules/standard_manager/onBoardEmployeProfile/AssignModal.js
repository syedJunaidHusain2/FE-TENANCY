import {useState, useCallback} from 'react'
import CustomSearchInput from '../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import {getRecuiterFilterService, hiringAssignService} from '../../../../services/Services'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {useNavigate} from 'react-router-dom'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import {getErrorMessageFromResponse} from '../../../../helpers/CommonHelpers'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'

const AssignModal = ({show, handleClose, leadId, handleSchedule, setLoading}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [error, setError] = useState('')

    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleAssign = (e) => {
        e.preventDefault()
        const body = {
            lead_id: leadId,
            transfer_to_user_id: selectedEmployee?.id,
        }
        if (!body.transfer_to_user_id) return setError('Select Employee')
        setLoader(true)
        hiringAssignService(body)
            .then(() => {
                setError('')
                handleClose()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => CustomToast.success('Assigned'))
    }

    const onSeachLead = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                getRecuiterFilterService(searchText)
                    .then((res) => {
                        const data = res?.data?.map((item) => ({
                            ...item,
                            name: `${item?.first_name} ${item?.last_name}`,
                        }))

                        resolve(data)
                    })
                    .catch(() => {
                        resolve([])
                    })
            }),
        []
    )
    const onSelectTeamLead = useCallback((value) => {
        setSelectedEmployee(value)
    }, [])

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='600' title='Assign'>
            <CustomLoader full visible={loader} />

            <form onSubmit={handleSchedule}>
                <div
                    className='modal-body pt-lg-5 pb-lg-20  p-15  '
                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                >
                    {/* Time */}
                    <div className='mb-5'>
                        <label className='form-label' style={{fontWeight: '600'}}>
                            Employee
                            {/* <span className='text-danger'>*</span> */}
                        </label>
                        <CustomSearchInput
                            placeholder='Search an Employee'
                            onSearch={onSeachLead}
                            onSelectValue={onSelectTeamLead}
                            selectedValue={selectedEmployee?.name}
                            style={{
                                border: error ? '1px solid #FF0000' : '1px solid #D8D8D8',
                                // border: '1px solid #D8D8D8',
                                borderRadius: '10px',
                                fontWeight: 500,
                            }}
                        />
                        {error && (
                            <div className='h-20px'>
                                <small id='' className='text-cmError block'>
                                    {error}
                                </small>
                            </div>
                        )}
                    </div>

                    {/* end::Stepper */}
                    <div className='text-center'>
                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Assign'
                            onClick={(e) => handleAssign(e)}
                        />
                    </div>
                </div>

                {/* <button
                    className='d-flex mx-auto justify-content-center align-items-center mb-10 cursor-pointer border-0 px-10 py-2 bg-cmBlue-Crayola text-cmwhite'
                    style={{
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: '700',
                    }}
                    onClick={(e) => handleAssign(e)}
                >
                    Assign
                </button> */}
            </form>
        </CustomModal>
    )
}

export {AssignModal}
