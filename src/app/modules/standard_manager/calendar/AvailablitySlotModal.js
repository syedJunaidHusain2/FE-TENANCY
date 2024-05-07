import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {
    getGlobalSheduleTimeCalendarService,
    getUserSheduleTimeService,
    setSheduleTimeSlotService,
} from '../../../../services/Services'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import _ from 'lodash'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../helpers/CommonHelpers'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'

const modalsRoot = document.getElementById('root-modals') || document.body

const AvailablitySlotModal = ({show, handleClose}) => {
    const [currentWeekDay, setCurrentWeekDay] = useState('sun')
    const [seletedDay, setselectedDay] = useState(null)

    const [sheduleTimeSlot, setSheduleTimeSlot] = useState(null)
    const [userTimeSlot, setUserTimeSlot] = useState(null)

    const [loading, setLoading] = useState(false)
    const loggedUserData = useSelector(getUserDataSelector)

    useEffect(() => {
        setLoading(true)
        getGlobalSheduleTimeCalendarService().then((res) => {
            setSheduleTimeSlot(res.data)
            // let slotData = res?.data
            // setselectedDay(slotData && slotData['sun'])
            let companyTimeSlots = res?.data
            getUserSheduleTimeService(loggedUserData?.id)
                .then((res) => {
                    setUserTimeSlot(res.data)
                    const data = res?.data
                    Object.keys(data)?.map((key, i) => {
                        data[key]?.map((value, i) => {
                            let index = companyTimeSlots[key].findIndex((x) => x.time_slot == value)
                            companyTimeSlots[key][index].checked = true
                            setSheduleTimeSlot(companyTimeSlots)
                            setselectedDay(companyTimeSlots[currentWeekDay])
                        })
                    })
                })
                .finally(() => setLoading(false))
        })
    }, [show])

    // const getUserTimeSlot = () => {
    //   let companyTimeSlots = _.cloneDeep(sheduleTimeSlot)
    //   getUserSheduleTimeService(loggedUserData?.id).then((res) => {
    //     setUserTimeSlot(res.data)
    //     const data = res?.data
    //     Object.keys(data)?.map((key, i) => {
    //       data[key]?.map((value, i) => {
    //         companyTimeSlots[key][i].checked = true
    //         setSheduleTimeSlot(companyTimeSlots)
    //         setselectedDay(companyTimeSlots[currentWeekDay])
    //       })
    //     })
    //   })
    // }
    const onSelectDays = (dayId, day) => {
        setselectedDay(sheduleTimeSlot && sheduleTimeSlot[dayId])
        setCurrentWeekDay(dayId)
    }
    const onSelectSlot = (slot, index) => {
        let tempData = _.cloneDeep(sheduleTimeSlot)
        let value = tempData[currentWeekDay][index].checked ?? false
        tempData[currentWeekDay][index].checked = !value
        setSheduleTimeSlot(tempData)
    }

    const onSheduleTime = () => {
        setLoading(true)
        const body = {
            user_id: loggedUserData?.id,
            schedule: Object.keys(sheduleTimeSlot).map((key, i) => {
                let selectedTime = sheduleTimeSlot[key]
                    ?.filter((item) => item?.checked)
                    ?.map((item2) => {
                        return {
                            slot: item2.time_slot,
                        }
                    })
                return {
                    day: key,
                    time: selectedTime,
                }
            }),
        }
        setSheduleTimeSlotService(body)
            .then(() => {
                // getUserTimeSlot()
                handleClose()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
                CustomToast.success('Availability Updated')
            })
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='1000' title={'Set Availability'}>
            <CustomLoader full visible={loading} />

            {/* Body */}
            <div
                className='mx-auto text-center mb-20 w-100'
                style={{fontFamily: 'Manrope', fontWeight: '600'}}
            >
                <div className='text-cmGrey900 mb-10' style={{fontSize: '16px'}}>
                    Select timeslots you are available for hiring
                </div>
                {/* WeekDays */}
                <div
                    className='d-flex justify-content-between align-items-center text-cmGrey700 w-75 mx-auto mb-15 overflow-auto '
                    style={{fontWeight: '600', fontSize: '18px'}}
                >
                    <div
                        onClick={() => {
                            onSelectDays('sun', 1)
                        }}
                        className={`${
                            currentWeekDay === 'sun'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Sunday
                    </div>
                    <div
                        onClick={() => onSelectDays('mon', 2)}
                        className={`${
                            currentWeekDay === 'mon'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Monday
                    </div>
                    <div
                        onClick={() => onSelectDays('tue', 3)}
                        className={`${
                            currentWeekDay === 'tue'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Tuesday
                    </div>
                    <div
                        onClick={() => onSelectDays('wed', 4)}
                        className={`${
                            currentWeekDay === 'wed'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Wednesday
                    </div>
                    <div
                        onClick={() => onSelectDays('thu', 5)}
                        className={`${
                            currentWeekDay === 'thu'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Thursday
                    </div>
                    <div
                        onClick={() => onSelectDays('fri', 6)}
                        className={`${
                            currentWeekDay === 'fri'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Friday
                    </div>
                    <div
                        onClick={() => onSelectDays('sat', 7)}
                        className={`${
                            currentWeekDay === 'sat'
                                ? 'border-cmBlue-Crayola border-bottom border-3 text-cmBlue-Crayola'
                                : ''
                        } cursor-pointer pb-2 px-2`}
                    >
                        Saturday
                    </div>
                </div>

                {/* Time slots */}
                <div className='mx-auto mb-20' style={{width: '90%'}}>
                    <div className='row gap-10'>
                        {sheduleTimeSlot && sheduleTimeSlot[currentWeekDay]?.length > 0 ? (
                            sheduleTimeSlot[currentWeekDay]?.map((item, i) => {
                                return (
                                    //   <div className='col-md-2 border-cmGrey700 border py-2 rounded cursor-pointer'>   ------->> for normal black color
                                    <div
                                        key={i}
                                        // className='col-md-2 border-0 bg-cmBlue-Crayola bg-opacity-20 text-cmBlue-Crayola py-2 rounded cursor-pointer'
                                        className={
                                            item?.checked
                                                ? 'col-md-2 border-0 bg-cmBlue-Crayola bg-opacity-20 text-cmBlue-Crayola py-2 rounded cursor-pointer'
                                                : 'col-md-2 border-cmGrey700 border py-2 rounded cursor-pointer'
                                        }
                                        onClick={() => onSelectSlot(item, i)}
                                    >
                                        {item.time_slot}
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <span>No Time Slot Available</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* buton */}

                <CustomButton
                    buttonType={BUTTON_TYPE.primary}
                    buttonLabel=' Set availability'
                    onClick={onSheduleTime}
                />
            </div>
        </CustomModal>
    )
}

export {AvailablitySlotModal}
