import React, {useState, useEffect} from 'react'

import {Calendar} from 'primereact/calendar'
import {getHiringCalendarEventsService} from '../../../../../services/Services'
import {getValidDate} from '../../../../../constants/constants'
import moment from 'moment'

const HiringCalendar2 = ({location}) => {
    const [dates, setDates] = useState(null)
    const [eventData, setEventData] = useState(null)
    const [eventDates, setEventDates] = useState(null)
    const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'))

    useEffect(() => {
        if (location) {
            const body = {
                office_id: location,
                start_date: startDate,
                end_date: endDate,
            }
            getHiringCalendarEventsService(body).then((res) => {
                let data = res?.data?.map((item) => {
                    // return {
                    //     fullDate: item.event_date,
                    //     day: moment(item?.event_date).date(),
                    //     month: moment(item?.event_date).month(),
                    //     year: moment(item?.event_date).year(),
                    //     type: item?.type,
                    // }
                    return {
                        fullDate: item.event_date,
                        day: moment(item?.event_date, 'YYYY/MM/DD').date(),
                        month: moment(item?.event_date, 'YYYY/MM/DD').month(),
                        year: moment(item?.event_date, 'YYYY/MM/DD').year(),
                        type: item?.type,
                    }
                })

                setEventDates(data)
                setEventData(res)
            })
        }
    }, [startDate, endDate, location])

    const dateTemplate = (date) => {
        const checkEvent = (item) => {
            return item?.day == date.day && item?.month == date.month && item?.year == date.year
        }
        let currentEvent = eventDates?.length > 0 ? eventDates?.find(checkEvent) : null

        // Printing result of includes()
        date = {
            ...date,
            hasEvent: currentEvent ? true : false,
            color:
                currentEvent?.type == 'Interview'
                    ? '#00c247'
                    : currentEvent?.type == 'Hired'
                    ? '#fe679d'
                    : '#ffb03a',
        }

        if (date?.hasEvent) {
            return (
                <div
                    className='badge bg-cmwhite text-cmGrey900 rounded-pill w-30px h-30px d-flex flex-center'
                    style={{
                        border: `3px solid ${date.color}`,
                    }}
                >
                    {date?.day}
                </div>
            )
        } else {
            return date?.day
        }
    }
    const onChangeValues = (e) => {
        setDates(e.value)
        setStartDate(moment(e.value).startOf('month').format('YYYY-MM-DD'))
        setEndDate(moment(e.value).endOf('month').format('YYYY-MM-DD'))
    }

    return (
        <div className='card shadow-sm  ' style={{borderRadius: '10px'}}>
            <Calendar
                dateTemplate={dateTemplate}
                value={dates}
                onViewDateChange={onChangeValues}
                inline
                showWeek
                selectionMode=''
                panelClassName=' border-0 overflow-hidden'
                panelStyle={{borderRadius: '10px'}}
            />
            <div className='d-flex flex-wrap px-5 py-6 justify-content-between '>
                <div className='d-flex px-1' style={{fontWeight: 600, alignSelf: 'center'}}>
                    <div className='bi bi-circle-fill text-cmSuccess px-1 fs-7 '></div>
                    <span className='text-cmSuccess'>Interviews</span>
                </div>
                <div className='d-flex px-2' style={{fontWeight: 600, alignSelf: 'center'}}>
                    <div className='bi bi-circle-fill text-cmpink px-1 fs-7 '></div>
                    <span className='text-cmpink'>Start Dates</span>
                </div>
                <div className='d-flex px-2' style={{fontWeight: 600, alignSelf: 'center'}}>
                    <div className='bi bi-circle-fill text-cmOrange px-1 fs-7 '></div>
                    <span className='text-cmOrange'>Others</span>
                </div>
            </div>
        </div>
    )
}

export default HiringCalendar2
