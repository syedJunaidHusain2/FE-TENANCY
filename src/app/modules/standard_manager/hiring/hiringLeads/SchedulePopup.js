import {useMemo, useState} from 'react'
import {createPortal} from 'react-dom'

import {Dialog} from 'primereact/dialog'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getValidDate, HIRING_PROCESS_STATUS} from '../../../../../constants/constants'
import {
    getInterviewTimeSlotService,
    scheduleInterviewService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import {
    SCHEDULE_INTERVIEW_VALIDATION_FIELD,
    scheduleInterviewValidation,
} from '../../../../../validations/validations'
import {getErrorMessageFromResponse, isEmptyObjectValue} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'

const modalsRoot = document.getElementById('root-modals') || document.body

const SchedulePopup = ({show, handleClose, userData, getHiringList = () => {}, changeStatus}) => {
    const [timeValue, setTimeValue] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [interViewTimeSlot, setInterviewTimeSlot] = useState([])
    const [loading, setLoading] = useState(false)
    const [timeSlotLoading, setTimeSlotLoading] = useState(false)
    const [scheduleError, setScheduleError] = useState(SCHEDULE_INTERVIEW_VALIDATION_FIELD)
    const loggedUserData = useSelector(getUserDataSelector)
    const [whoWillTakeInterview, setWhoWillTakeInterview] = useState(loggedUserData?.id)

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSchedule()
    }
    const handleSchedule = (e) => {
        const body = {
            lead_id: userData?.id,
            user_id: loggedUserData?.id,
            date: getValidDate(date, 'YYYY-MM-DD'),
            schedule: time,
        }
        const validationErrors = scheduleInterviewValidation(body)
        setScheduleError(validationErrors)
        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            scheduleInterviewService(body)
                .then(() => {
                    CustomToast.success('Interview Scheduled')
                    handleClose()
                    getHiringList()
                    changeStatus(
                        userData?.interview_time
                            ? HIRING_PROCESS_STATUS.interviewRescheduled
                            : HIRING_PROCESS_STATUS.interviewScheduled
                    )
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const interviewerList = useMemo(() => {
        const list = [
            {
                name: `${loggedUserData?.first_name} ${loggedUserData?.last_name}(Me)`,
                id: loggedUserData?.id,
            },
        ]
        if (!loggedUserData?.is_manager) {
            list.push({
                name: `${userData?.reporting_manager?.first_name} ${userData?.reporting_manager?.last_name} (Reporting Manager)`,
                id: userData?.reporting_manager_id,
            })
        }
        return list
    }, [
        loggedUserData?.first_name,
        loggedUserData?.id,
        loggedUserData?.is_manager,
        loggedUserData?.last_name,
        userData?.reporting_manager?.first_name,
        userData?.reporting_manager?.last_name,
        userData?.reporting_manager_id,
    ])

    const selectedWhoWilLTakeInterview = useMemo(() => {
        return interviewerList.find((item) => item?.id == whoWillTakeInterview)
    }, [interviewerList, whoWillTakeInterview])

    const onChangeDate = (selectedDate) => {
        setTimeSlotLoading(true)
        const todayDate = getValidDate(new Date(), 'YYYY-MM-DD')
        const foundDate = getValidDate(selectedDate, 'YYYY-MM-DD')
        const body = {
            user_id: selectedWhoWilLTakeInterview?.id,
            date: foundDate,
        }
        getInterviewTimeSlotService(body)
            .then((res) => {
                let timeDropdown =
                    res?.data?.length > 0 ? res?.data?.map((item) => ({value: item})) : []
                if (todayDate == foundDate) {
                    timeDropdown = timeDropdown?.filter((item) => {
                        const endTime = item?.value
                            .split(' - ')?.[1]
                            ?.replace('PM', ' PM')
                            .replace('AM', ' AM')
                        const endDateTime = new Date(`${todayDate} ${endTime}`)
                        return endDateTime > new Date()
                    })
                    setInterviewTimeSlot(timeDropdown ?? [])
                } else {
                    setInterviewTimeSlot(timeDropdown ?? [])
                }
                setInterviewTimeSlot(timeDropdown ?? [])
            })
            .finally(() => setTimeSlotLoading(false))
        setDate(foundDate)
    }

    return (
        <CustomModal show={show} onHide={handleClose} title={'Schedule Interview'} maxWidth='600'>
            <div className='' style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <form onSubmit={handleSchedule}>
                    <div
                        className='modal-body py-sm-5  px-10'
                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                    >
                        <div className='mb-5'>
                            <CustomDropdown
                                valueKey='id'
                                label={'Who will take interview ?'}
                                required
                                showClear={false}
                                options={interviewerList}
                                value={whoWillTakeInterview}
                                onChange={(e) => {
                                    setWhoWillTakeInterview(e?.target?.value)
                                    setDate(null)
                                    setTimeValue(null)
                                    setTime(null)
                                }}
                                placeholder={'Who will take interview'}
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomDatePicker
                                label={'Date'}
                                required
                                placeholder={'Interview date'}
                                value={null}
                                onChange={(e) => {
                                    onChangeDate(e.target.value)
                                    setTimeValue(null)
                                }}
                                className='w-100'
                                errorMessage={scheduleError?.interviewDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomDropdown
                                label={'Time Slot'}
                                required
                                options={interViewTimeSlot}
                                value={timeValue}
                                displayKey='value'
                                onChange={(e) => {
                                    setTimeValue(e.target.value)
                                    setTime(e.target.value)
                                }}
                                placeholder={
                                    timeSlotLoading
                                        ? 'Loading...'
                                        : interViewTimeSlot?.length > 0
                                        ? 'Select Time Slot'
                                        : 'No Time Slot Available'
                                }
                                errorMessage={scheduleError?.interviewSlot}
                            />
                        </div>

                        <div className='text-center'>
                            <CustomButton
                                buttonType={BUTTON_TYPE.primary}
                                buttonLabel='Schedule'
                                onClick={(e) => handleSubmit(e)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export {SchedulePopup}
