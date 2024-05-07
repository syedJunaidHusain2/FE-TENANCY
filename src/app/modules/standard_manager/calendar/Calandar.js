import React, {useEffect, useState, useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
    addCalanderEventService,
    deleteCalanderEventService,
    getCalanderEventListService,
    updateCalanderEventService,
} from '../../../../services/Services'
import {Dialog} from 'primereact/dialog'

import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import {EVENTS_TYPES} from '../../../../constants/constants'

import {getValidDate} from '../../../../constants/constants'
import {
    isPermittedForAccess,
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import CustomDatePicker from '../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse, isEmptyObjectValue} from '../../../../helpers/CommonHelpers'
import {
    addCalendarValidation,
    ADD_CALENDAR_EVENT_VALIDATION_FIELD,
} from '../../../../validations/validations'
import Edit from '../../admin/sequidocs/Icon/edit.png'
import {AvailablitySlotModal} from './AvailablitySlotModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import CustomDialog from '../../../../customComponents/customDialog/CustomDialog'
import CustomDelete from '../../../../customComponents/customIcons/CustomDelete'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import {KTSVG} from '../../../../_metronic/helpers'

export default function Calandar({
    selecetedLocation,
    show,
    setShow,
    timeSlotModal,
    setTimeSlotModal,
}) {
    // const [show, setShow] = useState(false)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [type, setType] = useState(null)
    const [eventView, setEventView] = useState(null)
    const [eventName, setEventName] = useState(null)
    const [description, setDescription] = useState()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [show2, setShow2] = useState(false)
    const [addEventError, setAddEventError] = useState(ADD_CALENDAR_EVENT_VALIDATION_FIELD)
    const [updateEvent, setUpdateEvent] = useState(false)
    // const [timeSlotModal, setTimeSlotModal] = useState(false)
    const initialRender = useRef(true)
    let EventColors = {
        Meeting: ' rgba(255, 168, 0, 0.1)',
        Interview: 'rgba(0, 194, 71, 0.1)',
        StartDate: 'rgba(254, 103, 157, 0.1)',
        Trainings: 'rgba(151, 71, 255, 0.1)',
    }
    useEffect(() => {
        getCalanderEvent()
    }, [selecetedLocation])

    const getCalanderEvent = () => {
        setLoading(true)
        const body = {
            office_id: selecetedLocation,
        }
        getCalanderEventListService(body)
            .then((res) => {
                // setEvents([...events, { title: eventName, date: date }])
                // setEvents(res?.data)
                let data = res?.data?.map((item) => {
                    const date = item?.event_date
                    const time = item?.event_time
                    if (item?.type == 'Interview') {
                        var startTime = time
                            .split(' - ')?.[0]
                            ?.replace('AM', ' AM')
                            .replace('PM', ' PM')
                        var endTime = time
                            .split(' - ')?.[1]
                            ?.replace('AM', ' AM')
                            .replace('PM', ' PM')
                    } else {
                        var startTime = time
                        var endTime = time
                    }

                    var finalStartDate = new Date(startTime ? `${date} ${startTime}` : date)
                    var finalEndDate = new Date(endTime ? `${date} ${endTime}` : date)
                    return {
                        title: item?.event_name,
                        date: item?.event_date,
                        description: item?.description,
                        type: item?.type,
                        id: item?.id,
                        display: 'block',
                        // allDay: 'true',
                        // start: item?.event_time
                        //     ? `${getValidDate(item?.event_date, 'YYYY-MM-DD')} ${item?.event_time}`
                        //     : `${getValidDate(item?.event_date, 'YYYY-MM-DD')}`,
                        // end: item?.event_time
                        //     ? `${getValidDate(item?.event_date, 'YYYY-MM-DD')} ${item?.event_time}`
                        //     : `${getValidDate(item?.event_date, 'YYYY-MM-DD')}`,
                        start: finalStartDate,
                        end: finalEndDate,
                        time: item?.event_time,
                        textColor:
                            item?.type == 'Meeting'
                                ? '#FFA800'
                                : item?.type == 'StartDate'
                                ? '#FE679D'
                                : item?.type == 'Interview'
                                ? '#00C247'
                                : item?.type == 'Training'
                                ? ' #9747FF'
                                : '#6078EC',
                        backgroundColor:
                            item?.type == 'Meeting'
                                ? EventColors?.Meeting
                                : item?.type == 'StartDate'
                                ? EventColors?.StartDate
                                : item?.type == 'Interview'
                                ? EventColors?.Interview
                                : item?.type == 'Training'
                                ? EventColors?.Trainings
                                : 'rgba(96, 120, 236, 0.1)',
                    }
                })

                setEvents(data)
            })
            .finally(() => {
                setLoading(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const body = {
        event_date: getValidDate(date, 'yyyy-MM-DD'),
        type: type?.toLowerCase(),
        event_name: eventName,
        description: description,
        state_code: selecetedLocation,
        event_time: time,
    }
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            // validate()
        }
    }, [eventName, date, type])
    const addEvent = (e) => {
        e.preventDefault()
        if (validate()) {
            setLoading(true)
            addCalanderEventService(body).finally(() => {
                CustomToast.success('Event Created Successfully')
                getCalanderEvent()
            })
            handleClose()
        }
    }
    const validate = () => {
        const validationErrors = addCalendarValidation(body)
        setAddEventError(validationErrors)
        return isEmptyObjectValue(validationErrors)
    }
    const onUpdateEvent = (e) => {
        e.preventDefault()
        if (validate()) {
            setLoading(true)
            updateCalanderEventService(eventView?.id, body)
                .then(() => {
                    getCalanderEvent()
                    CustomToast.success('Event Updated Successfully')
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {})

            handleClose()
        }
    }
    const onDeleteEvent = () => {
        let tempData = [...events]
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            tempData = tempData.filter((item) => item.id != eventView?.id)
            setEvents(tempData)
            setShow2(false)
            CustomToast.success('Event Deleted Successfully')

            deleteCalanderEventService(eventView?.id)
        })
    }
    const onChangeDate = (e) => {
        setDate(e?.target?.value)
    }

    const onChangeTime = (e) => {
        setTime(e?.target?.value)
    }

    const handleClose = () => {
        setShow(false)
        setUpdateEvent(false)
        setAddEventError({
            eventName: '',
            eventDate: '',
            eventType: '',
        })
        setDate(null)
        setEventName(null)
        setType(null)
        setDescription(null)
        setTime(null)
    }

    const handleTimeSlotModalClose = () => {
        setTimeSlotModal(false)
    }

    const handleEventClick = (event) => {
        setEventView({
            name: event?.event?._def?.title,
            description: event?.event?._def?.extendedProps?.description,
            date: event?.event?._instance?.range?.start.toISOString(),
            type: event?.event?._def?.extendedProps?.type,
            id: event?.event?._def?.publicId,
            time: event?.event?._def?.extendedProps?.time,
        })
        setShow2(true)
    }
    const capitalizeFirstLowercaseRest = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase()
    }
    const bodyForupdate = () => {
        setEventName(eventView?.name)
        setType(eventView?.type)
        setDate(new Date(eventView?.date))
        setTime(eventView?.time)
        setDescription(eventView?.description)
    }
    const header = (
        <div className='d-flex justify-content-between '>
            <div>
                {' '}
                <span>{eventView?.name}</span>
            </div>
            {eventView?.type != 'Interview' && eventView?.type != 'Hired' ? (
                <div>
                    <span className='me-3'>
                        <button
                            onClick={() => {
                                setShow2(false)
                                bodyForupdate()
                                setUpdateEvent(true)
                                setShow(true)
                            }}
                            className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                        >
                            {<img src={Edit} alt='' width={32} />}
                        </button>
                    </span>
                    <span className='btn btn-sm btn-icon bg-cmError bg-opacity-10 me-3'>
                        <CustomDelete onClick={() => onDeleteEvent()} />
                    </span>
                </div>
            ) : null}
        </div>
    )
    return (
        <div className='' style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <CustomModal show={show2} onHide={() => setShow2(false)} maxWidth='300' title={header}>
                <div className='text-cmGrey800 ps-5' style={{fontSize: 16, fontWeight: 600}}>
                    <div className='mb-5'>{eventView?.description ?? '--'}</div>
                    <div className='mb-3 d-flex gap-5 align-items-center'>
                        <div>
                            <KTSVG
                                path='/media/icons/duotune/art/Calendar.svg'
                                svgClassName='w-25px h-25px'
                            />
                        </div>
                        <div>{getValidDate(eventView?.date) ?? '--'}</div>
                    </div>
                    <div className='mb-3 d-flex gap-5 align-items-center'>
                        <div>
                            <KTSVG
                                path='/media/icons/duotune/art/clock.svg'
                                svgClassName='w-25px h-25px'
                            />
                        </div>
                        <div>{eventView?.time ?? '--'}</div>
                    </div>
                    <div className='mb-3 d-flex gap-5 align-items-center'>
                        <div>
                            <KTSVG
                                path='/media/icons/duotune/art/GreyNotification.svg'
                                svgClassName='w-25px h-25px'
                            />
                        </div>
                        <div>{eventView?.type ?? '--'}</div>
                    </div>
                </div>
            </CustomModal>
            <div className='bg-cmwhite p-10 shadow-sm' style={{borderRadius: '10px'}}>
                <FullCalendar
                    customButtons={
                        isPermittedForAccess({
                            permission: PERMISSIONS_GROUP.standard.calendar.calendar,
                            type: PERMISSION_TYPE.add,
                            forManager: true,
                        })
                            ? {
                                  addEventButton: {
                                      text: 'Add an Event',
                                      click: function () {
                                          setShow(true)
                                          setEventView(null)
                                      },
                                  },

                                  setupAvailability: {
                                      text: 'Setup Availability',
                                      click: function () {
                                          setTimeSlotModal(true)
                                      },
                                  },
                                  Inteviews: {
                                      text: 'Interviews',
                                  },
                                  StartDates: {
                                      text: 'StartDate',
                                  },
                                  Meetings: {
                                      text: 'Meetings',
                                  },
                                  Trainings: {
                                      text: 'Trainings',
                                  },
                              }
                            : null
                    }
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today dayGridMonth,timeGridWeek,timeGridDay',
                        center: 'title',
                        // right: 'setupAvailability addEventButton Inteviews',
                        right: 'Inteviews StartDates Meetings Trainings',
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={events}
                    eventClick={handleEventClick}
                    displayEventTime={false}
                    now={getValidDate(new Date(), 'YYYY-MM-DD')}
                    slotEventOverlap={false}
                />
            </div>
            {show ? (
                <Dialog
                    visible={show}
                    onHide={handleClose}
                    // breakpoints={{'960px': '75vw', '640px': '100vw'}}
                    style={{width: '30vw'}}
                    header={!updateEvent ? 'Add an Event' : 'Update Event'}
                >
                    <div className='m-0 p-0' style={{borderBottom: '1px solid #EFF2F5'}}></div>

                    <form onSubmit={!updateEvent ? addEvent : onUpdateEvent}>
                        <div className='card shadow-none p-0 m-0'>
                            <div className='d-flex justify-content-center mx-auto mt-4'>
                                <div className='w-100'>
                                    <div className='mt-6' style={{fontSize: '14px'}}>
                                        <div className='d-sm-flex justify-content-between gap-5 w-100 px-sm-0 px-1 mx-sm-0 mx-auto mb-5'>
                                            <div className=''>
                                                <CustomDatePicker
                                                    errorMessage={addEventError.eventDate}
                                                    label={'Date'}
                                                    required
                                                    // isModal
                                                    value={date}
                                                    onChange={onChangeDate}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <div className=''>
                                                <CustomInput
                                                    label={'Time'}
                                                    required
                                                    placeholder='hh:mm'
                                                    type='time'
                                                    onChange={(e) => {
                                                        setTime(e.target.value)
                                                    }}
                                                    errorMessage={addEventError.eventTime}
                                                    value={time}
                                                />
                                            </div>
                                        </div>
                                        <div className=''>
                                            <CustomDropdown
                                                label={'Type'}
                                                required
                                                options={EVENTS_TYPES}
                                                searching={false}
                                                value={type}
                                                onChange={(e) => {
                                                    setType(e.target.value)
                                                }}
                                                errorMessage={addEventError.eventType}
                                            />
                                        </div>
                                    </div>

                                    <div className='mt-8 mb-2'>
                                        <CustomInput
                                            label={'Event Name'}
                                            required
                                            placeholder='Enter Event Name'
                                            onChange={(e) => {
                                                setEventName(e.target.value)
                                            }}
                                            errorMessage={addEventError.eventName}
                                            value={eventName}
                                            rejex={/^[\w\-\s]+$/}
                                        />
                                    </div>

                                    <div className='mt-8'>
                                        <CustomInput
                                            label={'Description'}
                                            type={INPUT_TYPE.textarea}
                                            placeholder='Enter Description'
                                            onChange={(e) => {
                                                setDescription(e.target.value)
                                            }}
                                            value={description}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center mt-11 mb-9'>
                                <CustomButton
                                    type='submit'
                                    buttonType={BUTTON_TYPE.primary}
                                    buttonLabel={!updateEvent ? 'Add Event' : 'Update Event'}
                                    onClick={!updateEvent ? addEvent : onUpdateEvent}
                                />
                            </div>
                        </div>
                    </form>
                </Dialog>
            ) : null}
            {timeSlotModal && (
                <AvailablitySlotModal show={timeSlotModal} handleClose={handleTimeSlotModalClose} />
            )}
        </div>
    )
}
