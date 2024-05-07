import FullCalendar from '@fullcalendar/react'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import timeGridPlugin from '@fullcalendar/timegrid'
import {getEventDataSelector} from '../../../../../redux/selectors/DashboardSelectors'
import {useDispatch, useSelector} from 'react-redux'
import {smOfficeEventListAction} from '../../../../../redux/actions/DashboardActions'
import {AddEventCard} from './addEvent'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'

const DashBoardCalendarCard = () => {
    const calendarRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [showAddEvent, setShowAddEvent] = useState(false)

    const [fullLoading, setFullLoading] = useState(false)
    const dispatch = useDispatch()
    const eventsData = useSelector(getEventDataSelector)
    const [tooltipEvent, setTooltipEvent] = useState(null)

    let EventColors = {
        Meeting: ' rgba(255, 168, 0, 0.1)',
        Interview: 'rgba(0, 194, 71, 0.1)',
        StartDate: 'rgba(254, 103, 157, 0.1)',
        Trainings: 'rgba(151, 71, 255, 0.1)',
    }
    useEffect(() => {
        getEventListData()
    }, [])
    const getEventListData = useCallback(() => {
        if (eventsData) setLoading(true)
        else setFullLoading(true)

        dispatch(smOfficeEventListAction()).finally(() => {
            if (eventsData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch])

    const events = useMemo(() => {
        let data = eventsData?.map((item) => {
            const date = item?.event_date
            const time = item?.event_time
            if (item?.type == 'Interview') {
                var startTime = time.split(' - ')?.[0]?.replace('AM', ' AM').replace('PM', ' PM')
                var endTime = time.split(' - ')?.[1]?.replace('AM', ' AM').replace('PM', ' PM')
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
                display: 'auto',
                start: finalStartDate,
                end: finalEndDate,
                time: item?.event_time,
                borderColor: 'none',
                fontFamily: fontsFamily.manrope,
                textColor:
                    item?.type == 'Meeting'
                        ? '#FFA800'
                        : item?.type == 'StartDate' || item?.type == 'Hired'
                        ? '#FE679D'
                        : item?.type == 'Interview'
                        ? '#00C247'
                        : item?.type == 'Trainings'
                        ? ' #9747FF'
                        : '#6078EC',
                backgroundColor:
                    item?.type == 'Meeting'
                        ? EventColors?.Meeting
                        : item?.type == 'StartDate' || item?.type == 'Hired'
                        ? EventColors?.StartDate
                        : item?.type == 'Interview'
                        ? EventColors?.Interview
                        : item?.type == 'Trainings'
                        ? EventColors?.Trainings
                        : 'rgba(96, 120, 236, 0.1)',
            }
        })

        return data
    }, [
        EventColors?.Interview,
        EventColors?.Meeting,
        EventColors?.StartDate,
        EventColors?.Trainings,
        eventsData,
    ])

    const handleNextClick = () => {
        const calendarAPI = calendarRef?.current?.getApi()
        calendarAPI?.next()
    }
    const handlePreviousClick = () => {
        const calendarAPI = calendarRef?.current?.getApi()
        calendarAPI?.prev()
    }

    // const handleEventMouseEnter = (info) => {
    //     // Show the tooltip when hovering over an event
    //     setTooltipEvent(info.event._def)
    // }

    // const handleEventMouseLeave = () => {
    //     // Hide the tooltip when leaving the event
    //     setTooltipEvent(false)
    // }

    return (
        <div
            className='bg-cmwhite shadow-sm gap-5 px-5 py-5 position-relative'
            style={{borderRadius: '10px'}}
        >
            <FullCalendar
                ref={calendarRef}
                customButtons={{
                    addButton: {
                        text: 'Add an Event',
                        click: function () {
                            setShowAddEvent(true)
                        },
                    },

                    ForwardButton: {
                        icon: 'bi bi-arrow-right-circle-fill',
                        // text: '>',
                        click: function () {
                            handleNextClick()
                        },
                    },
                    BackwardButton: {
                        icon: 'bi bi-arrow-left-circle-fill',
                        // text: '>',
                        click: function () {
                            handlePreviousClick()
                        },
                    },
                }}
                plugins={[timeGridPlugin]}
                headerToolbar={{
                    left: 'title',
                    center: 'BackwardButton ForwardButton',
                    right: 'addButton',
                }}
                initialView='timeGridDay'
                events={events}
                eventClassNames={'cursor-pointer'}
                allDaySlot={false}
                contentHeight='400px'
                // eventMouseEnter={handleEventMouseEnter}
                // eventMouseLeave={handleEventMouseLeave}
            />
            {tooltipEvent ? (
                <div className='text-cmGrey500 position-absolute bg-cmwhite top-50 start-50 translate-middle px-10 py-1 border border-cmSuccess rounded shadow'>
                    {tooltipEvent.title}
                </div>
            ) : null}
            {showAddEvent ? (
                <AddEventCard
                    show={showAddEvent}
                    handleClose={() => setShowAddEvent(false)}
                    getList={getEventListData}
                />
            ) : null}
        </div>
    )
}

export default DashBoardCalendarCard
